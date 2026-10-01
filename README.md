# SpeakSprint

Trang học tiếng Anh A2–B1 tĩnh, dùng HTML/CSS/JavaScript. Chạy `./start-server.sh 8000`, rồi mở `http://localhost:8000`.

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

Cần Node.js, Playwright và Chromium; khởi động server trước:

```sh
BASE_URL=http://127.0.0.1:8000 node tests/weekly-review.cjs
BASE_URL=http://127.0.0.1:8000 node tests/routine.cjs
python3 scripts/build-weekly-review.py
node --check assets/app.js
```

Có thể đặt `PLAYWRIGHT_CHROMIUM_EXECUTABLE` để dùng Chromium đã cài, `NODE_PATH` nếu dùng Playwright từ runtime dùng chung, và `SCREENSHOT_DIR` để lưu ảnh kiểm tra. Bộ routine kiểm tra mọi URL bài học, luồng 5 bước, lưu/nhập/xuất, ôn +1/+7 ngày thực, streak và kết quả/lỗi giọng nói mô phỏng. Nhận diện micro thật cần kiểm tra thủ công trên trình duyệt/thiết bị sử dụng: cấp quyền, nói, dừng, sửa văn bản và tải lại để xác nhận đã lưu.
