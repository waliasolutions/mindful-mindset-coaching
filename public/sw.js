
// Service Worker for caching static assets and improving performance
const CACHE_NAME = 'mindset-coach-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/lovable-uploads/7b4f0db6-80ea-4da6-b817-0f33ba7562b5.png', // Hero image
  '/lovable-uploads/053f601c-1228-481c-9aca-d078fb3d7d8a.png', // Profile image
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE)
            .map(cacheName => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  const { request } = event;
  
  // Skip for non-GET requests
  if (request.method !== 'GET') return;
  
  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .catch(() => caches.match('/'))
    );
    return;
  }
  
  // Handle static assets and images
  if (request.destination === 'image' || request.url.includes('/static/') || request.url.includes('/lovable-uploads/')) {
    event.respondWith(
      caches.match(request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(request)
            .then(response => {
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(DYNAMIC_CACHE)
                  .then(cache => cache.put(request, responseClone));
              }
              return response;
            });
        })
    );
    return;
  }
  
  // For other requests, try network first
  event.respondWith(
    fetch(request)
      .catch(() => caches.match(request))
  );
});
