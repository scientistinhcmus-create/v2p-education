# V2P Education – Ôn thi THPT môn Toán

Trang web ôn tập cho học sinh trung tâm V2P Education: luyện đề theo chủ đề (trắc nghiệm 4 phương án, đúng/sai, trả lời ngắn), chấm điểm theo thang 2025, lời giải chi tiết, lưu điểm và thống kê điểm yếu từng học sinh.

- Trang web chạy miễn phí trên **GitHub Pages**.
- Đăng nhập và lưu điểm dùng **Firebase** (gói Spark miễn phí).
- Câu hỏi từ **file PDF / AI soạn** được làm ở **Xưởng soạn câu hỏi V2P** trên claude.ai rồi nhập vào trang bằng JSON.

## Các file trong thư mục

| File | Dùng để |
|---|---|
| `index.html` | Toàn bộ trang web (giao diện + chức năng) |
| `firebase-config.js` | Cấu hình Firebase của trung tâm — **cần điền một lần** |
| `firestore.rules` | Quy tắc bảo mật dữ liệu — dán vào Firebase một lần |
| `README.md` | Hướng dẫn này |

---

## Cài đặt lần đầu (khoảng 15 phút)

### Bước 1 — Tạo dự án Firebase
1. Vào https://console.firebase.google.com → **Create a project** (Tạo dự án), đặt tên ví dụ `v2p-education`. Có thể tắt Google Analytics.
2. Trong trang dự án, bấm biểu tượng **Web `</>`** để thêm ứng dụng web, đặt tên `v2p-web` (không cần chọn Hosting) → **Register app**.
3. Firebase hiện một đoạn `const firebaseConfig = { apiKey: ..., authDomain: ..., ... }`. Sao chép các giá trị này vào file `firebase-config.js` (thay các chỗ `DIEN_...`).

### Bước 2 — Bật đăng nhập Google
1. Menu trái **Build → Authentication → Get started**.
2. Tab **Sign-in method** → chọn **Google** → **Enable** → chọn email hỗ trợ → **Save**.
3. Tab **Settings → Authorized domains** → **Add domain** → thêm `TEN-GITHUB-CUA-THAY.github.io` (tên miền GitHub Pages của thầy).

### Bước 3 — Tạo cơ sở dữ liệu
1. **Build → Firestore Database → Create database** → chọn vị trí `asia-southeast1 (Singapore)` → **Start in production mode**.
2. Tab **Rules** → xóa nội dung cũ, dán toàn bộ file `firestore.rules` → **Publish**.

### Bước 4 — Đưa lên GitHub Pages
1. Tạo repository mới trên GitHub, ví dụ `v2p-education` (Public).
2. **Add file → Upload files** → kéo thả 4 file trong thư mục này → **Commit changes**.
3. **Settings → Pages** → *Source*: **Deploy from a branch** → *Branch*: `main` / `(root)` → **Save**.
4. Sau 1–2 phút trang có địa chỉ: `https://TEN-GITHUB-CUA-THAY.github.io/v2p-education/`

### Bước 5 — Đặt tài khoản của thầy làm giáo viên
1. Mở trang web, **Đăng nhập bằng Google** bằng tài khoản của thầy.
2. Hộp "Chào mừng" hiện ra: phía dưới có dòng **Mã tài khoản (UID)** — sao chép mã này (có thể nhập tạm tên và lớp rồi bấm Lưu).
3. Vào Firebase → **Firestore Database → Data → Start collection**:
   - Collection ID: `admins`
   - Document ID: **dán UID của thầy**
   - Thêm một field: `role` (string) = `teacher` → **Save**.
4. Tải lại trang web → xuất hiện các mục **Lớp học**, **Ngân hàng câu hỏi**.
   (Muốn thêm giáo viên khác: giáo viên đó đăng nhập 1 lần, gửi UID, thầy thêm một document nữa trong `admins`.)

### Bước 6 — Nạp câu hỏi
- **85 câu mẫu đã soạn sẵn**: mở trang cũ trên claude.ai → *Ngân hàng câu hỏi* → chọn Lớp 10 → **Xuất JSON** → **Sao chép**; sang trang mới → *Ngân hàng câu hỏi* → **Nhập JSON** → dán → **Nhập**. Lặp lại cho Lớp 11 và Lớp 12.
- **Từ file PDF hoặc AI soạn câu mới**: mở **Xưởng soạn câu hỏi V2P** (claude.ai) → tải PDF hoặc chọn chủ đề → duyệt, sửa → **Xuất JSON** → dán vào *Nhập JSON* như trên.
- Có thể dán link Xưởng vào `firebase-config.js` (dòng `V2P_WORKSHOP_URL`) để có nút mở nhanh.

### Bước 7 — Gửi cho học sinh
Gửi link GitHub Pages. Học sinh đăng nhập bằng Gmail, nhập họ tên + lớp là dùng được. Không cần tài khoản claude.ai.

---

## Cập nhật trang sau này
- Sửa trực tiếp trên GitHub: mở file → biểu tượng bút chì ✏️ → sửa → **Commit changes**. Trang tự cập nhật sau 1–2 phút.
- Khi Claude gửi bản `index.html` mới: **Add file → Upload files** → thả file đè lên → Commit.
- Dữ liệu (câu hỏi, điểm học sinh) nằm trong Firebase nên **không mất** khi thay file trên GitHub.

## Hạn mức miễn phí (Firebase Spark)
- 50.000 lượt đọc, 20.000 lượt ghi mỗi ngày — đủ cho vài trăm học sinh.
- Ngân hàng câu hỏi được lưu đệm trên máy học sinh và chỉ tải lại khi thầy sửa câu hỏi, nên tiết kiệm lượt đọc.
- Xem mức sử dụng: Firebase Console → Firestore → **Usage**.

## Cấu trúc dữ liệu (Firestore)
- `bank/{id}` — câu hỏi: `type` (mcq/tf/short), `grade`, `topic`, `level` (NB/TH/VD/VDC), `stem`, `options[4]` hoặc `statements[4]`, `answer`, `solution`, `img`.
- `bankimg/{id}` — hình vẽ của câu hỏi: `q` (hình đề), `s` (hình lời giải).
- `config/topics` — chủ đề tự thêm; `config/bankver` — phiên bản ngân hàng theo lớp; `config/blueprints` — các cấu trúc đề.
- `students/{uid}` — hồ sơ & thống kê; `students/{uid}/attempts/{id}` — từng bài làm.
- `admins/{uid}` — danh sách giáo viên.

## Thang điểm (theo cấu trúc 2025)
Trắc nghiệm 0,25 đ/câu · Đúng/Sai: đúng 1 ý 0,1 đ – 2 ý 0,25 đ – 3 ý 0,5 đ – 4 ý 1 đ · Trả lời ngắn 0,5 đ/câu · quy về thang 10.
