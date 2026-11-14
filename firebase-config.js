// =====================================================================
//  CẤU HÌNH FIREBASE CHO TRANG V2P EDUCATION
//  Thay các giá trị "DIEN_..." bằng cấu hình lấy từ Firebase Console:
//  Project settings (biểu tượng bánh răng) → General → Your apps → Web app → SDK setup and configuration → Config
//  (Các giá trị này được phép để công khai trên GitHub; dữ liệu được bảo vệ bằng firestore.rules.)
// =====================================================================
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyCz1V2LBEAT6eDM1BTbf9nlFh5V2_lyrOM",
  authDomain: "v2p-education.firebaseapp.com",
  projectId: "v2p-education",
  storageBucket: "v2p-education.firebasestorage.app",
  messagingSenderId: "744548489758",
  appId: "1:744548489758:web:071e4e890e366470826c0f"
};

// Đường link tới "Xưởng soạn câu hỏi V2P" trên claude.ai (dùng AI đọc file PDF / soạn câu mới).
// Dán link vào giữa hai dấu nháy, ví dụ: "https://claude.ai/artifact/xxxx"
window.V2P_WORKSHOP_URL = "https://claude.ai/artifact/TG5RdQ7tt6yBhemZ9NwJQn";
