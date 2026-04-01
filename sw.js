// ============================================================
// SVN Inventory — Service Worker v1.0
// Shiv Vatika Nursery PWA — Offline support
// ============================================================

const CACHE_NAME = 'svn-inventory-v1';
const CACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192x192.png',
  './icon-512x512.png',
  // Google Fonts — cache karo offline ke liye
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Noto+Sans+Devanagari:wght@400;600&family=Poppins:wght@300;400;600;700&display=swap',
  // CDN scripts
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
];

// ── INSTALL ─────────────────────────────────────────────────
// Pehli baar install hone par sab files cache karo
self.addEventListener('install', function(event) {
  console.log('[SVN SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('[SVN SW] Caching app shell');
      // addAll fail ho toh bhi individual files try karo
      return Promise.allSettled(
        CACHE_URLS.map(url => cache.add(url).catch(err => {
          console.warn('[SVN SW] Could not cache:', url, err);
        }))
      );
    }).then(function() {
      console.log('[SVN SW] Install complete');
      return self.skipWaiting(); // Turant activate karo
    })
  );
});

// ── ACTIVATE ────────────────────────────────────────────────
// Purane cache versions delete karo
self.addEventListener('activate', function(event) {
  console.log('[SVN SW] Activating...');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('[SVN SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(function() {
      console.log('[SVN SW] Activated — controlling all pages');
      return self.clients.claim(); // Sab tabs pe control lo
    })
  );
});

// ── FETCH ───────────────────────────────────────────────────
// Network request intercept karo — Cache First strategy
self.addEventListener('fetch', function(event) {
  // Only GET requests handle karo
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // IndexedDB/localStorage data requests bypass karo
  if (event.request.url.includes('chrome-extension://')) return;

  event.respondWith(
    caches.match(event.request).then(function(cachedResponse) {
      // Cache mein mila — seedha return karo (offline bhi kaam karega)
      if (cachedResponse) {
        // Background mein update bhi karo (Stale While Revalidate)
        if (navigator.onLine) {
          fetch(event.request).then(function(networkResponse) {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then(function(cache) {
                cache.put(event.request, networkResponse.clone());
              });
            }
          }).catch(function() {}); // Fail silently
        }
        return cachedResponse;
      }

      // Cache mein nahi mila — network se fetch karo
      return fetch(event.request).then(function(networkResponse) {
        // Valid response — cache mein save karo
        if (networkResponse && networkResponse.status === 200 && networkResponse.type !== 'opaque') {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(function() {
        // Network bhi fail — offline fallback
        // HTML page ke liye index.html return karo
        if (event.request.headers.get('accept') && 
            event.request.headers.get('accept').includes('text/html')) {
          return caches.match('./index.html');
        }
        // Font/image ke liye transparent response
        return new Response('', { status: 408, statusText: 'Offline' });
      });
    })
  );
});

// ── BACKGROUND SYNC ─────────────────────────────────────────
// Jab internet aaye tab pending actions sync karo
self.addEventListener('sync', function(event) {
  console.log('[SVN SW] Background sync:', event.tag);
  // Future use ke liye — abhi IndexedDB handle kar raha hai sab
});

// ── PUSH NOTIFICATIONS ──────────────────────────────────────
// Future: Low stock alerts
self.addEventListener('push', function(event) {
  if (!event.data) return;
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title || 'SVN Inventory', {
      body: data.body || '',
      icon: './icon-192x192.png',
      badge: './icon-192x192.png',
      vibrate: [200, 100, 200],
      data: { url: data.url || './' }
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || './')
  );
});

console.log('[SVN SW] Service Worker loaded — SVN Inventory v1.0');
