// Enhanced Service Worker for Mindset Coach Martina
// Version: v3 - Optimized for performance and offline experience

const CACHE_NAME = 'mindset-coach-v3';
const STATIC_CACHE = 'static-v3';
const DYNAMIC_CACHE = 'dynamic-v3';
const IMAGE_CACHE = 'images-v3';

// Critical assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/assets/images/icon-192.png',
  '/assets/images/icon-512.png',
  '/assets/images/favicon.png',
  '/assets/images/og-image.png'
];

// Critical images for immediate caching
const CRITICAL_IMAGES = [
  '/assets/images/og-image.png',
  '/assets/images/martina-profile.png',
  '/assets/images/icon-192.png',
  '/assets/images/icon-512.png'
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_ASSETS)),
      caches.open(IMAGE_CACHE).then(cache => cache.addAll(CRITICAL_IMAGES))
    ]).then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => 
            !cacheName.endsWith('-v3') && 
            (cacheName.startsWith('mindset-coach-') || 
             cacheName.startsWith('static-') || 
             cacheName.startsWith('dynamic-') || 
             cacheName.startsWith('images-'))
          )
          .map(cacheName => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

// Enhanced fetch handler with better performance
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) return;
  
  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache successful navigation responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cached version for offline support
          return caches.match('/').then(response => {
            return response || new Response('Offline - please check your connection', {
              status: 503,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
        })
    );
    return;
  }
  
  // Handle image requests with optimized caching
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then(response => {
        if (response) return response;
        
        return fetch(request).then(fetchResponse => {
          if (fetchResponse.status === 200) {
            const responseClone = fetchResponse.clone();
            caches.open(IMAGE_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return fetchResponse;
        }).catch(() => {
          // Return a placeholder or cached fallback
          return caches.match('/assets/images/favicon.png');
        });
      })
    );
    return;
  }
  
  // Handle static assets (CSS, JS, fonts)
  if (request.destination === 'style' || 
      request.destination === 'script' || 
      request.destination === 'font') {
    event.respondWith(
      caches.match(request).then(response => {
        if (response) return response;
        
        return fetch(request).then(fetchResponse => {
          if (fetchResponse.status === 200) {
            const responseClone = fetchResponse.clone();
            caches.open(STATIC_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return fetchResponse;
        });
      })
    );
    return;
  }
  
  // Handle other requests with network-first strategy and timeout
  event.respondWith(
    Promise.race([
      fetch(request),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Network timeout')), 3000)
      )
    ]).then(response => {
      // Cache successful responses
      if (response.status === 200 && request.url.startsWith(self.location.origin)) {
        const responseClone = response.clone();
        caches.open(DYNAMIC_CACHE).then(cache => {
          cache.put(request, responseClone);
        });
      }
      return response;
    }).catch(() => {
      // Fallback to cache
      return caches.match(request);
    })
  );
});

// Add push notification support for future use
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const options = {
    body: event.data.text(),
    icon: '/assets/images/icon-192.png',
    badge: '/assets/images/icon-96.png',
    data: {
      url: '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('Mindset Coach Martina', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});