// Service worker của ứng dụng V2P Education.
// Trang chính luôn lấy bản mới nhất từ mạng (để câu hỏi và tính năng mới cập nhật ngay),
// chỉ dùng bản lưu sẵn khi mất mạng.
const CACHE = 'v2p-app-v1';
const SHELL = ['./', './index.html', './firebase-config.js', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => {}));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Không can thiệp dữ liệu Firebase / đăng nhập
  if (/googleapis\.com|firebaseapp\.com|identitytoolkit|securetoken|firestore/.test(url.host + url.pathname)) return;
  const sameOrigin = url.origin === self.location.origin;
  const isLib = /gstatic\.com|jsdelivr\.net|cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com/.test(url.host);
  if (!sameOrigin && !isLib) return;
  if (sameOrigin) {
    // Mạng trước – luôn có bản mới nhất
    e.respondWith(fetch(req).then(res => { if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); } return res; })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('./index.html'))));
  } else {
    // Thư viện (Firebase SDK, MathJax, font): dùng bản lưu, cập nhật ngầm
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req).then(res => { if (res.ok || res.type === 'opaque') { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); } return res; }).catch(() => hit);
      return hit || net;
    }));
  }
});
