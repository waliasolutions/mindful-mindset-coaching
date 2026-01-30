

## Plan: Performance Optimization & Code Cleanup

### Phase 1: Remove Duplicate Code (DRY Principle)

**1.1 Merge SEO Components**
- Delete `src/components/SEO.tsx`
- Keep only `src/components/EnhancedSEO.tsx` (rename to `SEO.tsx`)
- Delete `src/components/StructuredData.tsx`
- Keep only `src/components/EnhancedStructuredData.tsx` (rename to `StructuredData.tsx`)

**1.2 Consolidate Performance Monitoring**
- Delete `src/utils/performance.ts` → `trackPerformanceMetrics()` function (unused)
- Delete `src/hooks/usePerformanceMonitor.ts` (duplicates `useCoreWebVitals`)
- Keep only `src/hooks/useCoreWebVitals.ts` 
- Update `src/components/admin/PerformanceDashboard.tsx` to use `useCoreWebVitals`

**1.3 Fix QueryClient Duplication**
- Remove `QueryClientProvider` from `App.tsx`
- Keep only the one in `main.tsx`

### Phase 2: Fix Performance Bottlenecks

**2.1 Font Loading Optimization**
- Remove the `@import url('https://fonts.googleapis.com/...')` from `src/styles/index.css` (line 1)
- Keep only the preload in `index.html` (already optimized)

**2.2 GA4 Single Initialization**
- Remove GA4 initialization from `EnhancedSEO.tsx`
- Remove GA4 initialization from `App.tsx`
- Keep only GTM in `index.html` (it handles GA4 automatically)
- Simplify `ga4Manager.ts` to just expose tracking methods, not initialization

**2.3 Hero Image Optimization**
- Only render ONE image component in Hero.tsx
- Use CSS to show/hide based on screen size instead of React conditionals
- This prevents duplicate image loads

**2.4 Lazy Load Admin Page**
```tsx
// In App.tsx:
const Admin = lazy(() => import('./pages/Admin'));
```

**2.5 Remove Duplicate Event Listeners**
- Remove hotkey listener from `Footer.tsx` (keep only in `App.tsx`)

### Phase 3: Remove Unused/Bloated Code

**3.1 Remove Dark Mode CSS**
- Delete lines 40-60 in `src/styles/index.css` (`.dark {}` rules)
- Since we force light mode, these are never used

**3.2 Remove Duplicate Service Worker**
- Delete `public/sw.js`
- Keep only `public/sw-optimized.js`
- Update `manifest.json` and service worker registration to use `sw-optimized.js`

**3.3 Consolidate Sitemap Generators**
- Keep only `dynamicSitemapGenerator.ts`
- Delete `sitemapGenerator.ts`

**3.4 Remove Duplicate Preload Hints**
- Remove `preloadCriticalResources()` from `src/utils/performance.ts`
- Keep preloads only in `EnhancedSEO.tsx` (React Helmet handles deduplication)

**3.5 Fix useAboveFold Logic**
- The condition `(!isAboveTheFold || index < 2)` seems inverted
- Should be `(isAboveTheFold || index < 2)` to load above-fold content immediately

### Phase 4: Bundle Optimization

**4.1 Code Split Admin Components**
```tsx
// In Admin.tsx - lazy load heavy components
const MediaLibrary = lazy(() => import('./admin/MediaLibrary'));
const SeoSettings = lazy(() => import('./admin/SeoSettings'));
const BackupManager = lazy(() => import('./admin/BackupManager'));
```

**4.2 Remove Unused Imports from Icon Library**
- `IconSelector.tsx` imports ALL Lucide icons (`* as LucideIcons`)
- Convert to dynamic import or use subset

### Summary of Files to Modify

| Action | Files |
|--------|-------|
| **Delete** | `SEO.tsx`, `StructuredData.tsx`, `usePerformanceMonitor.ts`, `sitemapGenerator.ts`, `sw.js` |
| **Modify** | `App.tsx`, `main.tsx`, `EnhancedSEO.tsx`, `index.css`, `Hero.tsx`, `Footer.tsx`, `PerformanceDashboard.tsx` |
| **Rename** | `EnhancedSEO.tsx` → `SEO.tsx`, `EnhancedStructuredData.tsx` → `StructuredData.tsx` |

### Expected Performance Improvements

- **~15-20% smaller bundle** (removing duplicates + lazy loading)
- **~200-400ms faster LCP** (single hero image, better font loading)
- **~100ms faster TTI** (removing duplicate GA4 initialization)
- **Cleaner codebase** with single sources of truth

