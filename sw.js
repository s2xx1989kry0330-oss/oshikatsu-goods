// 推し活グッズ帳：端末内保存版。アプリ本体をキャッシュして起動を補助。
const CACHE_NAME = 'oshikatsu-local-v1';
const APP_FILES = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)).catch(() => {})); self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('oshikatsu-') && k !== CACHE_NAME).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', event => { const req=event.request; if(req.method!=='GET')return; const url=new URL(req.url); if(url.origin===self.location.origin) event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE_NAME).then(cache=>cache.put(req,copy));}return res;}))); });
