Thay API KEY của Gemini Api để sử dụng:
```json
{
    "API_KEYS": [
        "1234567890-!@#$%^&*()"
    ]
}
```

# AI Chat App

## Giới thiệu

AI Chat App là một ứng dụng trò chuyện với trí tuệ nhân tạo (AI) được xây dựng bằng HTML, CSS, và JavaScript. Ứng dụng cung cấp giao diện thân thiện, hiện đại và tương tác, cho phép người dùng trò chuyện với một chatbot AI.

## Tính năng

* **Giao diện đẹp mắt và tùy biến:**
    * Giao diện chat hiện đại với hiệu ứng thị giác và chuyển động mượt mà.
    * Nhiều chủ đề màu sắc để người dùng lựa chọn và cá nhân hóa trải nghiệm.
    * Chế độ ban đêm để bảo vệ mắt người dùng trong điều kiện ánh sáng yếu.

* **Tương tác nâng cao:**
    * Hiển thị tin nhắn của người dùng và bot một cách rõ ràng và trực quan.
    * Cho phép người dùng nhập và gửi tin nhắn văn bản.
    * Hiển thị chỉ báo khi bot đang "gõ" để tăng tính tương tác.
    * Hỗ trợ gửi và nhận biểu tượng cảm xúc (emoji).

* **Responsive design:**
    * Hoạt động tốt trên nhiều thiết bị khác nhau, từ máy tính để bàn đến điện thoại di động.
    * Tối ưu hóa trải nghiệm người dùng trên các kích thước màn hình khác nhau.

## Cài đặt và chạy dự án

1. **Clone repository:**
   ```bash
   git clone <URL repository của bạn>
   ```

2. **Cài đặt dependencies:**
   ```bash
   cd ai-chat-app
   npm install
   ```

3. **Cấu hình API Key:**
   * Tạo một tệp `ApiKey.json` trong thư mục gốc của dự án.
   * Thêm API key của bạn vào tệp này:
     ```json
     {
         "API_KEYS": [
             "1234567890-!@#$%^&*()"
         ]
     }
     ```

4. **Chạy server:**
   ```bash
   node server.js
   ```

5. **Mở ứng dụng trong trình duyệt:**
   * Mở `index.html` trong trình duyệt web của bạn.

## Cấu trúc thư mục

* `assets`: Chứa các tài nguyên như hình ảnh, âm thanh, phông chữ.
* `css`: Chứa các tệp CSS để định dạng giao diện.
    * `style.css`: CSS chính của ứng dụng.
    * `theme.css`: CSS cho các chủ đề màu sắc khác nhau.
    * `Mode.css`: CSS cho chế độ ban đêm.
    * `Modesystem.css`: CSS cho hệ thống chuyển đổi chế độ.
* `json`: Chứa các tệp JSON để lưu trữ dữ liệu.
    * `conversation_history.json`: Lưu trữ lịch sử trò chuyện.
    * `system_instruction.json`: Chứa các hướng dẫn hệ thống cho chatbot AI.
* `node_modules`: Chứa các thư viện và dependencies của dự án.
* `button`: Chứa mã JavaScript liên quan đến nút gửi tin nhắn (`send.js`).
* `js`: Chứa các tệp JavaScript khác của dự án.
    * `client.js`: Xử lý giao tiếp giữa client và server.
    * `Hammer.js`: Thư viện hỗ trợ cử chỉ cảm ứng (nếu có).
    * `Mode.js`: Xử lý logic chuyển đổi chế độ hiển thị.
    * `Modesystem.js`: Xử lý logic liên quan đến hệ thống chuyển đổi chế độ.
* `index.html`: Tệp HTML chính của ứng dụng.
* `package.json` và `package-lock.json`: Quản lý các dependencies của dự án.
* `main.js`: Mã JavaScript phía máy chủ để xử lý các yêu cầu từ client và giao tiếp với API của chatbot AI.

## Công nghệ sử dụng

* HTML5
* CSS3 (bao gồm Flexbox, Grid, Transitions, Animations,...)
* JavaScript (ES6+)
* Node.js (cho server)
* [Thêm các thư viện hoặc framework khác nếu có]

## Đóng góp

Mọi đóng góp đều được chào đón! Nếu bạn muốn đóng góp vào dự án, vui lòng làm theo các bước sau:

1. Fork repository này.
2. Tạo một branch mới cho tính năng hoặc sửa lỗi của bạn: `git checkout -b my-new-feature`.
3. Commit các thay đổi của bạn: `git commit -am 'Add some feature'`.
4. Push lên branch của bạn: `git push origin my-new-feature`.
5. Tạo một Pull Request mới.

## Liên hệ

Nếu bạn có bất kỳ câu hỏi hoặc góp ý, vui lòng liên hệ với chúng tôi qua email: kenjiakira2006@gmail.com.

## Giấy phép

Dự án này được cấp phép theo giấy phép MIT. Xem tệp `LICENSE` để biết thêm chi tiết.

---

**Lưu ý:**
- Hãy thay thế `<URL repository của bạn>` bằng thông tin thực tế của dự án bạn.
- Cập nhật phần "Công nghệ sử dụng" nếu bạn có sử dụng thêm các thư viện hoặc framework khác.
- Bổ sung thêm các phần khác nếu cần thiết, ví dụ như "Các vấn đề đã biết" hoặc "Roadmap phát triển".
