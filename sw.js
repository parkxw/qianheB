var CACHE='qianhe-bjl-v1';
var ASSETS=['./','index.html','manifest.webmanifest','bjl-icon-192.png','bjl-icon-512.png','bjl-icon-maskable-512.png'];
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS).catch(function(){});}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.map(function(k){if(k!==CACHE)return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){var req=e.request;if(req.method!=='GET')return;
if(req.mode==='navigate'){e.respondWith(fetch(req).then(function(res){var c=res.clone();caches.open(CACHE).then(function(x){x.put('index.html',c);});return res;}).catch(function(){return caches.match('index.html').then(function(r){return r||caches.match('./');});}));return;}
e.respondWith(caches.match(req).then(function(hit){return hit||fetch(req).then(function(res){var c=res.clone();caches.open(CACHE).then(function(x){x.put(req,c);});return res;}).catch(function(){return hit;});}));});
