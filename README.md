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

## Cấu trúc nguồn

- `src/pages/`: dashboard, chủ đề và route động `lessons/[day].jsx`; `getStaticPaths` sinh 28 bài lúc build.
- `src/components/`: khung trang, thẻ chunk và câu hỏi dùng chung cho mọi bài.
- `src/content/lessons/day-NN.json`: nội dung từng bài; chunk/câu hỏi là dữ liệu có cấu trúc, phần đọc và bài luyện có định dạng là fragment HTML tin cậy trong trường `html`.
- `public/assets/styles.css`: giao diện chung.
- `public/assets/app.js`: logic học, tiến độ, routine, ghi âm và nhận diện giọng nói hiện có. `_app.jsx` nạp sau hydration; điều hướng bằng link HTML để mỗi trang có vòng đời listener riêng.
- `public/assets/topics-data.js`, `topics.js`: nội dung và tương tác chủ đề.
- `scripts/package-static.mjs`: đóng gói đường dẫn tương đối và tự sinh `index.html` dẫn ở gốc.

Tiến độ vẫn dùng khóa `englishTutorProgressV1`, file ghi âm vẫn ở IndexedDB. Chuyển đường dẫn sang `out/` trên **cùng origin** không đổi vùng lưu dữ liệu. Giữ nguyên ID bài và `data-save` khi sửa nội dung để câu trả lời cũ tiếp tục khớp.

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

Trên dashboard, mở **Chủ đề chuyên sâu**, hoặc truy cập `out/topics/index.html`. Lộ trình đầu là **Senior Backend Interview · Node.js & AI**, học theo thứ tự gợi ý hoặc chọn tự do, với tiến độ riêng:

1. **Node.js runtime:** event loop/latency, worker pools/concurrency, streams/backpressure.
2. **System design & data:** API/retry/idempotency, transaction/race condition, cache/queue/consistency.
3. **AI application engineering:** RAG, tool calling và ranh giới thực thi, evaluation/cost/latency.
4. **Production & mock interview:** prompt injection/data boundaries, incidents/observability, thiết kế AI support backend đa tenant.

Mỗi buổi khoảng 30–40 phút: warm-up → input/đọc hiểu → 5 chunk và 5 thuật ngữ → recall → nói và 4–6 câu follow-up → quiz/đối chiếu. Gợi ý học 3 buổi mới/tuần, xen kẽ ôn, rồi lặp lại với hệ thống và ràng buộc của mình. Các ví dụ là giả định; không yêu cầu người học nhận thành tích không có thật. Buổi mock interview tái sử dụng chunk đã xuất hiện trước đó.

Sổ 60 thuật ngữ có nghĩa tiếng Việt, collocation và điểm dễ dùng sai; tìm kiếm và đánh dấu **Cần ôn cách dùng**. Các câu mẫu của bài tập chỉ mở sau lượt thử. Câu trả lời mở/phát âm không tự chấm; quiz có đáp án và giải thích. Hoàn thành buổi yêu cầu đọc hiểu, 5 lượt recall, lời nói ít nhất 20 từ, xác nhận đã nói, số giây/chunk tự ghi, các follow-up, quiz đúng và ghi chú sửa/mục tiêu.

Lưu bản nháp, bước hiện tại và lịch sử từng lượt trong `topicState` của cùng record `englishTutorProgressV1`; xuất/nhập từ dashboard hoặc trang chủ đề giữ cả tiến độ bài ngày lẫn chủ đề. Lịch ôn **+1 / +3 / +7 / +14 ngày lịch** tính từ lần hoàn thành đầu, giữ nguyên khi luyện lại. Lượt ôn che tài liệu trước khi tự kể; luyện sớm không xóa hạn tương lai. Chủ đề không tăng streak/XP hoặc thay đổi trạng thái 28 bài ngày. File JSON cũ vẫn nhập được theo cơ chế thay thế tiến độ hiện có.

Nội dung nằm ở `public/assets/topics-data.js`, giao diện ở `public/assets/topics.js`, kiểm tra schema/lưu/nhập/xuất do `public/assets/app.js` quản lý. ID chủ đề và ID buổi là khóa lưu ổn định; giữ ID khi sửa tiêu đề hoặc sắp xếp. Nguồn kỹ thuật được liên kết trong từng buổi, nội dung bài học vẫn dùng được offline. Không có dịch vụ AI trực tiếp; micro dùng cùng chức năng nhận diện giọng nói của trình duyệt.

Kiểm tra thêm:

```sh
BASE_URL=http://127.0.0.1:8000/out node tests/topics.cjs
node --check public/assets/topics.js
node --check public/assets/topics-data.js
```
