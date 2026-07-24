// このアプリはFirestoreのリアルタイム同期を使うため、あえてオフラインキャッシュはしない。
// インストール可能なPWAとして認識させるための最小限のservice worker。
self.addEventListener('install', () => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', () => {}); // 何もキャッシュせず、常に通常のネットワーク取得に任せる
