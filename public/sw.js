
// Optimized Service Worker for better performance
const CACHE_NAME = 'mindset-coach-v2';
const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v2';
const IMAGE_CACHE = 'images-v2';

// Critical assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json'
];

// Critical images to cache immediately
const CRITICAL_IMAGES = [
  '/lovable-uploads/7b4f0db6-80ea-4da6-b817-0f33ba7562b5.png', // Hero image
  '/lovable-uploads/053f601c-1228-481c-9aca-d078fb3d7d8a.png', // Profile image
];

// Install event - cache critical assets only
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_ASSETS)),
      caches.open(IMAGE_CACHE).then(cache => cache.addAll(CRITICAL_IMAGES))
    ]).then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => 
              !cacheName.includes('v2') && 
              (cacheName.includes('mindset-coach') || cacheName.includes('static') || cacheName.includes('dynamic') || cacheName.includes('images'))
            )
            .map(cacheName => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - optimized caching strategy
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip for non-GET requests
  if (request.method !== 'GET') return;
  
  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then(cache => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => caches.match('/'))
    );
    return;
  }
  
  // Handle images with aggressive caching
  if (request.destination === 'image' || url.pathname.includes('/lovable-uploads/')) {
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
                caches.open(IMAGE_CACHE)
                  .then(cache => cache.put(request, responseClone));
              }
              return response;
            });
        })
    );
    return;
  }
  
  // Handle static assets
  if (url.pathname.includes('/static/') || url.pathname.includes('.js') || url.pathname.includes('.css')) {
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
                caches.open(STATIC_CACHE)
                  .then(cache => cache.put(request, responseClone));
              }
              return response;
            });
        })
    );
    return;
  }
  
  // For other requests, try network first with timeout
  event.respondWith(
    Promise.race([
      fetch(request),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 3000)
      )
    ])
    .catch(() => caches.match(request))
  );
});
