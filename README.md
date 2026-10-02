# SpeakSprint

Site học tiếng Anh A2–B1 dùng **Next.js + React**, xuất HTML/CSS/JS tĩnh bằng [`output: "export"`](https://nextjs.org/docs/pages/guides/static-exports). Không cần Node.js trên hosting, backend hay tài khoản.

## Phát triển và build

Cần Node.js 20.9 trở lên và npm:

```sh
npm ci
npm run dev           # Next.js tại http://localhost:3000
npm run build         # Sinh bản tĩnh trong out/ và index.html dẫn ở gốc
./start-server.sh 8000 # Xem đúng bản deploy tại http://localhost:8000
```

**Vẫn deploy nguyên repo như trước**, giữ entry `index.html` ở gốc. File này dẫn đến `out/index.html`, giữ query string và hash. Bài học và chủ đề chỉ nằm trong `out/lessons/` và `out/topics/`; đã bỏ các trang chuyển hướng cũ trong `lessons/` và `topics/` ở gốc. Bookmark trỏ đến các URL cũ này cần cập nhật hoặc mở lại từ dashboard. Đường dẫn asset tương đối hỗ trợ cả domain gốc và thư mục con như `/english-work-sprint/`, không cần cấu hình lại hosting. `.nojekyll` cho phép GitHub Pages phục vụ `_next`.

`out/` và `index.html` gốc được đưa vào Git để hosting chỉ phục vụ file vẫn hoạt động. Sau mỗi lần sửa nguồn, chạy `npm run build` rồi đưa cả nguồn và bản build mới vào cùng commit. Không chỉnh tay HTML trong `out/` hay `index.html` gốc. Có thể deploy riêng `out/` nếu sau này muốn.

### Deploy trên Vercel

`vercel.json` cấu hình Vercel phục vụ trực tiếp thư mục `out/` đã được đưa vào Git: Framework Preset là **Other**, bỏ qua cài dependency và build trên hosting, giữ URL có đuôi `.html`. Vercel mở dashboard tại `/`, bài học tại `/lessons/day-01.html`, chủ đề tại `/topics/index.html`; không thêm `/out/` vào URL trên Vercel.

Trong **Settings → Build and Deployment**, Root Directory phải là gốc repo (nơi có `vercel.json`), không phải `src`, `public` hay `out`. Cấu hình trong file ghi đè Framework Preset, Install Command, Build Command và Output Directory cũ. Commit/push file này lên nhánh deploy để Vercel tạo deployment mới; redeploy commit cũ chưa có file sẽ không áp dụng bản sửa.

Nếu gặp `404 NOT_FOUND`, kiểm tra deployment mới có nhận `vercel.json` và Output Directory là `out`. Với preset Other, Vercel có thể mặc định phục vụ `public/` khi thư mục này tồn tại; trong dự án này `public/` chỉ chứa asset nguồn, không có dashboard. Xem [hướng dẫn xử lý 404 của Vercel](https://vercel.com/kb/guide/why-is-my-deployed-project-giving-404) và [cấu hình vercel.json](https://vercel.com/docs/project-configuration/vercel-json).

Sau mỗi lần sửa nội dung hoặc giao diện, vẫn chạy `npm run build` ở máy phát triển và commit `out/` mới trước khi push, vì Vercel phục vụ đúng bản build đã commit.

## Cấu trúc nguồn

- `src/pages/`: dashboard, chủ đề và route động `lessons/[day].jsx`; `getStaticPaths` sinh 28 bài lúc build.
- `src/components/`: khung trang, thẻ chunk và câu hỏi dùng chung cho mọi bài.
- `src/content/lessons/day-NN.json`: nội dung từng bài; chunk/câu hỏi là dữ liệu có cấu trúc, phần đọc và bài luyện có định dạng là fragment HTML tin cậy trong trường `html`.
- `public/assets/styles.css`: giao diện chung.
- `public/assets/app.js`: logic học, tiến độ, routine, ghi âm và nhận diện giọng nói hiện có. `_app.jsx` nạp sau hydration; điều hướng bằng link HTML để mỗi trang có vòng đời listener riêng.
- `public/assets/topics-data.js`, `topics.js`: nội dung và tương tác chủ đề.
- `scripts/package-static.mjs`: đóng gói đường dẫn tương đối và tự sinh `index.html` dẫn ở gốc.

Tiến độ vẫn dùng khóa `englishTutorProgressV1`, file ghi âm vẫn ở IndexedDB. Chuyển đường dẫn sang `out/` trên **cùng origin** không đổi vùng lưu dữ liệu. Giữ nguyên ID bài và `data-save` khi sửa nội dung để câu trả lời cũ tiếp tục khớp.

## Cài ứng dụng và học offline

SpeakSprint có favicon, icon màn hình chính và manifest PWA. Bấm **Cài ứng dụng** ở cuối trang để mở hộp thoại cài của trình duyệt khi có hỗ trợ. Trên iPhone/iPad, mở bằng Safari rồi chọn **Chia sẻ → Thêm vào Màn hình chính**. Cài đặt và service worker cần HTTPS hoặc localhost; xem [điều kiện cài PWA trên MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable).

Sau lần tải đầu, service worker lưu toàn bộ bản tĩnh để dashboard, 28 bài học và chủ đề có thể mở offline. Micro nhận diện giọng nói và nguồn bên ngoài vẫn có thể cần mạng. Tiến độ giữ trong localStorage/IndexedDB của cùng origin; hãy xuất JSON trước khi chuyển trình duyệt hoặc thiết bị.

Manifest và service worker dùng đường dẫn tương đối, hỗ trợ deploy nguyên repo, thư mục con hoặc riêng `out/`. Mỗi build có cache theo nội dung; app kiểm tra bản mới khi mở/reload hoặc quay lại cửa sổ. Sau khi bản mới tải xong, nhấn **Cập nhật ứng dụng** để kích hoạt và tải lại. Với bản app cũ chưa có nút này, đóng mọi tab/cửa sổ SpeakSprint rồi mở lại một lần để nhận bản mới. Cache chỉ xóa bản build cũ của cùng đường dẫn, không xóa tiến độ.

Icon gốc nằm ở `public/icons/icon.svg`; chạy `npm run icons` để sinh lại PNG (cần Chromium của Playwright), rồi `npm run build`. Bộ `tests/pwa.cjs` kiểm tra manifest/icon, cài đặt, hướng dẫn iOS, scope thư mục con, bài học offline và tiến độ sau reload.

## Routine

- 30 phút/buổi, 6 ngày/tuần: **Input 10 → Recall 5 → Retell 5 → Think 5 → Review 5**.
- Trước buổi mới, thêm 3–5 phút kể lại bài hôm trước, không xem tài liệu.
- Đọc nội dung ngắn, đóng lại, tự kể bằng tiếng Anh, đối chiếu và kể lần hai. Mỗi bài giữ 5 chunk trọng tâm.
- Bộ đếm giờ từng bước là lời nhắc. Để hoàn thành bài, cần đọc hiểu, xác nhận nói lần một, quiz, Recall, Think, ghi chú đối chiếu và lần kể thứ hai. Các bài tập mở không được tự chấm ngữ pháp hay phát âm.
- Khi lưu routine lần đầu, trang giữ mốc lời kể, số ý (0–3) và số chunk (0–5) do người học tự ghi. Lịch ôn **+1 / +7 ngày lịch** hiện trên dashboard và trong bài; khi ôn, tài liệu được ẩn cho tới khi người học chủ động mở lại. So sánh dùng cùng tiêu chí, không suy ra điểm thành thạo.
- Luyện trước hạn vẫn được lưu nhưng không xóa mốc ôn tương lai. Bài quá hạn vẫn có thể ôn; dữ liệu cũ chưa có mốc routine dùng ngày hoàn thành và không tự tạo điểm so sánh.
- Toàn bộ 28 bài luôn mở, kể cả truy cập URL trực tiếp hoặc học nhiều bài trong một ngày. Số Day là số thứ tự bài, không phải ngày lịch bắt buộc. Streak chỉ tăng theo ngày lịch có bài mới hoàn thành; ôn bài cũ giữ ngày hoàn thành và streak.
- Bài 7/14/21/28 có kho ôn tuần (30 chunk, 90 bài luyện mỗi tuần). Kho này và các bài tập mở rộng nằm ở **Luyện thêm**, ngoài routine chính.

## Giọng nói và dữ liệu

Chọn ô trả lời văn bản rồi bấm **Nói tiếng Anh → điền ô**. Nhận diện dùng `SpeechRecognition`/`webkitSpeechRecognition`, đặt ngôn ngữ `en-US`, thêm kết quả hoàn chỉnh vào cuối nội dung đang có và tự lưu như khi gõ. Có nút dừng; đổi ô hoặc bước học sẽ dừng phiên cũ.

Micro cần HTTPS hoặc localhost và trình duyệt hỗ trợ. Dịch vụ nhận diện có thể cần mạng, gửi âm thanh tới nhà cung cấp của trình duyệt; đây không phải tính năng chấm phát âm. Khi không hỗ trợ, bị từ chối quyền hoặc lỗi mạng, dùng bàn phím. Xem [tài liệu SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition). Ghi âm/tải file âm thanh và nhập giọng nói là hai tính năng riêng.

Tiến độ, câu trả lời và lịch sử routine nằm trong localStorage (`englishTutorProgressV1`); bản ghi âm nằm trong IndexedDB. Xuất/nhập JSON giữ tiến độ và lịch sử văn bản, **không bao gồm file âm thanh**. Dùng cùng trình duyệt và địa chỉ để giữ dữ liệu, hoặc xuất JSON để chuyển tiến độ. Bản sao lưu phiên bản 1 cũ vẫn dùng được.

## Kiểm tra

Sau `npm ci`, cài Chromium nếu máy chưa có và khởi động server bản tĩnh:

```sh
npx playwright install chromium
npm run build
./start-server.sh 8000
# Trong terminal khác:
npm test
# Khi sửa chunk, tái sinh ngân hàng ôn trước khi build:
python3 scripts/build-weekly-review.py
node --check public/assets/app.js
```

Bộ `static-export.cjs` tự chạy server tĩnh để kiểm tra domain gốc, thư mục con, 28 URL bài học, asset, query/hash và tiến độ sau chuyển trang. Các bộ còn lại dùng `BASE_URL` (mặc định `http://127.0.0.1:8000/out`); kiểm tra cả 28 bài, chủ đề, lịch ôn, nhập/xuất và màn hình mobile/desktop.

Có thể đặt `PLAYWRIGHT_CHROMIUM_EXECUTABLE` để dùng Chromium đã cài, `NODE_PATH` nếu dùng Playwright từ runtime dùng chung, và `SCREENSHOT_DIR` để lưu ảnh kiểm tra. Bộ routine kiểm tra mọi URL bài học, luồng 5 bước, lưu/nhập/xuất, ôn +1/+7 ngày thực, streak và kết quả/lỗi giọng nói mô phỏng. Nhận diện micro thật cần kiểm tra thủ công trên trình duyệt/thiết bị sử dụng: cấp quyền, nói, dừng, sửa văn bản và tải lại để xác nhận đã lưu.

## Chủ đề chuyên sâu · Senior Backend Interview

Trên dashboard, mở **Chủ đề chuyên sâu**, hoặc truy cập `out/topics/index.html`. Lộ trình đầu là **Senior Backend Interview · Technical & Real Experience**, học theo thứ tự gợi ý hoặc chọn tự do, với tiến độ riêng:

1. **Node.js runtime:** event loop/latency, worker pools/concurrency, streams/backpressure.
2. **System design & data:** API/retry/idempotency, transaction/race condition, cache/queue/consistency.
3. **AI application engineering:** RAG, tool calling và ranh giới thực thi, evaluation/cost/latency.
4. **Production & mock interview:** prompt injection/data boundaries, incidents/observability, thiết kế AI support backend đa tenant.

5. **Giới thiệu, dự án & giải quyết vấn đề:** giới thiệu 60–90 giây, kể dự án và ownership, điều tra issue/kiểm chứng/phòng ngừa.
6. **Teamwork, presales & phỏng vấn thực tế:** hỗ trợ member, discovery/estimate/proposal, demo/objections/handoff và mock kinh nghiệm 60 phút.

Tổng cộng **19 buổi**. Buổi 13–18 có thẻ chuẩn bị chuyện thật, khung trả lời có thời lượng, 6 follow-up, shadowing, lỗi dễ mắc và rubric tự đánh giá có bằng chứng. Buổi 19 tái sử dụng 5 chunk cũ: 3 phút chuẩn bị + 5 phút input + 2 phút recall + 45 phút hỏi–đáp qua 8 vòng + 5 phút review. Dùng đồng hồ riêng và bạn luyện hoặc tự đóng hai vai; không có người phỏng vấn AI tự động. Số giây lưu ở ô speaking là thời lượng câu trả lời chính, không phải toàn buổi mock.

Mỗi buổi thường khoảng 30–40 phút: warm-up → input/đọc hiểu → 5 chunk và 5 thuật ngữ → recall → nói và 4–6 câu follow-up → quiz/đối chiếu. Gợi ý học 3 buổi mới/tuần, xen kẽ ôn, rồi lặp lại với hệ thống và ràng buộc của mình. Các ví dụ là giả định; không yêu cầu người học nhận thành tích không có thật. Buổi mock interview tái sử dụng chunk đã xuất hiện trước đó.

Sổ 95 mục từ (gồm các từ được ôn lại trong ngữ cảnh khác) có nghĩa tiếng Việt, collocation và điểm dễ dùng sai; tìm kiếm và đánh dấu **Cần ôn cách dùng**. Các câu mẫu của bài tập chỉ mở sau lượt thử. Câu trả lời mở/phát âm không tự chấm; quiz có đáp án và giải thích. Hoàn thành buổi yêu cầu đọc hiểu, 5 lượt recall, lời nói ít nhất 20 từ, xác nhận đã nói, số giây/chunk tự ghi, các follow-up, quiz đúng và ghi chú sửa/mục tiêu.

Lưu bản nháp, bước hiện tại và lịch sử từng lượt trong `topicState` của cùng record `englishTutorProgressV1`; xuất/nhập từ dashboard hoặc trang chủ đề giữ cả tiến độ bài ngày lẫn chủ đề. Lịch ôn **+1 / +3 / +7 / +14 ngày lịch** tính từ lần hoàn thành đầu, giữ nguyên khi luyện lại. Lượt ôn che tài liệu trước khi tự kể; luyện sớm không xóa hạn tương lai. Chủ đề không tăng streak/XP hoặc thay đổi trạng thái 28 bài ngày. File JSON cũ vẫn nhập được theo cơ chế thay thế tiến độ hiện có.

Nội dung nằm ở `public/assets/topics-data.js`, giao diện ở `public/assets/topics.js`, kiểm tra schema/lưu/nhập/xuất do `public/assets/app.js` quản lý. ID chủ đề và ID buổi là khóa lưu ổn định; giữ ID khi sửa tiêu đề hoặc sắp xếp. Nguồn kỹ thuật được liên kết trong từng buổi, nội dung bài học vẫn dùng được offline. Không có dịch vụ AI trực tiếp; micro dùng cùng chức năng nhận diện giọng nói của trình duyệt.

Kiểm tra thêm:

```sh
BASE_URL=http://127.0.0.1:8000/out node tests/topics.cjs
node --check public/assets/topics.js
node --check public/assets/topics-data.js
```

## Chủ đề lớn · Làm việc

Trên dashboard chọn **Làm việc · Trao đổi trong dự án phần mềm**, hoặc mở `out/topics/index.html?topic=workplace-communication`. Đây là lộ trình riêng, gồm **14 buổi, 60 chunk khác nhau và 70 mục thuật ngữ theo ngữ cảnh**:

1. Kickoff: mục tiêu, vai trò, demo và bước tiếp theo.
2. Làm rõ yêu cầu, phạm vi và tiêu chí nghiệm thu.
3. Daily meeting: tiến độ, blocker, nhờ hỗ trợ và trao đổi sau họp.
4. Trao đổi kỹ thuật: API contract, phương án và bằng chứng cần đo.
5. Code review: lỗi cần sửa, gợi ý và phản hồi bất đồng.
6. QA: bước tái hiện, expected/actual và bàn giao retest.
7. Ôn tổng hợp: cuộc họp trước demo, dùng 5 chunk cũ.
8. Planning: chia ticket, owner, estimate, capacity và dependency.
9. Báo cáo: phần đã xong, còn lại, rủi ro và quyết định cần hỗ trợ.
10. Thay đổi yêu cầu: tác động, thương lượng phạm vi và deadline.
11. Release: go/no-go, giới hạn pilot, theo dõi và bàn giao.
12. Sự cố: ảnh hưởng, điều chưa biết, phối hợp và lịch cập nhật.
13. Quản lý: 1:1, feedback có bằng chứng, quá tải và kế hoạch hỗ trợ.
14. Mô phỏng ngày làm việc: daily, phân công, thương lượng và handover, dùng 5 chunk cũ.

Các tình huống gốc nối tiếp dự án giả định **Customer Import**, với PM Mai, backend Linh, frontend An và QA Bao. Ticket, giờ hẹn, dữ liệu mẫu và các quyết định giúp người học tập nói như đang phối hợp thật; đây không phải hướng dẫn vận hành kỹ thuật cho hệ thống thật. Không cần có kinh nghiệm dự án trước: dùng dữ kiện mô phỏng hoặc thay bằng bối cảnh công việc của mình.

Mỗi buổi 30–40 phút có 5 chunk, hội thoại 100–200 từ, 3 câu đọc hiểu, 2 lượt biến đổi/chunk, recall che mẫu, shadowing, bài nói 60–90 giây, 6 lượt đối thoại theo vai, 2 câu quiz và rubric tự đánh giá. Buổi 7/14 ôn chunk cũ. Warm-up gợi lại buổi trước theo khoảng +1/+3/+7/+14; lịch ôn riêng dùng ngày lịch thực.

Bước Speak có **Đầu ra công việc**: viết recap, ticket, comment PR, status report hoặc handover bằng tiếng Anh (ít nhất 15 từ). Đây là checkpoint bổ sung khi lưu buổi Làm việc; hệ thống kiểm tra có lượt viết, không tự chấm chất lượng nội dung. Bản nháp tự lưu; mọi câu mẫu bài tập vẫn chờ người học thử trước khi mở.

Nội dung nằm ở `public/assets/workplace-data.js`; `topics.js` dùng chung giao diện cho hai chủ đề. Tham số `topic` chọn lộ trình, `session` chọn buổi; URL phỏng vấn cũ không có `topic` vẫn hoạt động. Tiến độ lưu riêng dưới `topicState['workplace-communication']`, giữ chung cơ chế xuất/nhập JSON, ôn +1/+3/+7/+14 và sử dụng offline; không thay đổi tiến độ bài ngày hoặc chủ đề phỏng vấn.
