

## Plan: Performance Optimization & Code Cleanup ✅ COMPLETED

### Phase 1: Remove Duplicate Code (DRY Principle) ✅

**1.1 Merge SEO Components** ✅
- ~~Delete `src/components/SEO.tsx`~~ Deleted
- ~~Keep only `src/components/EnhancedSEO.tsx` (rename to `SEO.tsx`)~~ Renamed
- ~~Delete `src/components/StructuredData.tsx`~~ Deleted
- ~~Keep only `src/components/EnhancedStructuredData.tsx` (rename to `StructuredData.tsx`)~~ Renamed

**1.2 Consolidate Performance Monitoring** ✅
- ~~Delete `src/hooks/usePerformanceMonitor.ts`~~ Deleted (duplicates `useCoreWebVitals`)
- Keep only `src/hooks/useCoreWebVitals.ts` 
- ~~Update `src/components/admin/PerformanceDashboard.tsx` to use `useCoreWebVitals`~~ Updated

**1.3 Fix QueryClient Duplication** ✅
- ~~Remove `QueryClientProvider` from `App.tsx`~~ Removed
- Keep only the one in `main.tsx`

### Phase 2: Fix Performance Bottlenecks ✅

**2.1 Font Loading Optimization** ✅
- ~~Remove the `@import url('https://fonts.googleapis.com/...')` from `src/styles/index.css`~~ Removed
- Keep only the preload in `index.html`

**2.2 GA4 Single Initialization** ✅
- ~~Remove GA4 initialization from `EnhancedSEO.tsx`~~ Removed
- ~~Remove GA4 initialization from `App.tsx`~~ Removed
- Keep only GTM in `index.html` (handles GA4 automatically)

**2.3 Hero Image Optimization** ✅
- Using CSS to show/hide based on screen size instead of duplicating image loading

**2.4 Lazy Load Admin Page** ✅
- Admin page now lazy loaded in `App.tsx`

**2.5 Remove Duplicate Event Listeners** ✅
- ~~Remove hotkey listener from `Footer.tsx`~~ Removed (kept only in `App.tsx`)

### Phase 3: Remove Unused/Bloated Code ✅

**3.1 Remove Dark Mode CSS** ✅
- ~~Delete `.dark {}` rules in `src/styles/index.css`~~ Removed

**3.2 Remove Duplicate Service Worker** ✅
- ~~Delete `public/sw.js`~~ Deleted
- Keep only `public/sw-optimized.js`

**3.3 Consolidate Sitemap Generators** ✅
- ~~Delete `sitemapGenerator.ts`~~ Deleted
- Keep only `dynamicSitemapGenerator.ts`

**3.4 Remove Unused Performance Utils** ✅
- ~~Remove `trackPerformanceMetrics()` and `preloadCriticalResources()` from `src/utils/performance.ts`~~ Removed

**3.5 Fix useAboveFold Logic** ✅
- ~~Fixed the condition to `(isAboveTheFold || index < 2)`~~ Fixed in Index.tsx
- ~~Removed dependency on `isAboveTheFold` in the scroll handler~~ Optimized

### Phase 4: Bundle Optimization ✅

**4.1 Code Split Admin Components** ✅
- Admin page lazy loaded in App.tsx

**4.2 Optimize Icon Imports** ✅
- ~~Convert `* as LucideIcons` to dynamic import~~ Done
- Icons now load on demand when IconSelector popover opens
- Common icons subset loaded immediately for quick access

### Summary of Changes Made

| Action | Files |
|--------|-------|
| **Deleted** | `SEO.tsx` (old), `StructuredData.tsx` (old), `usePerformanceMonitor.ts`, `sitemapGenerator.ts`, `sw.js` |
| **Modified** | `App.tsx`, `main.tsx`, `SEO.tsx`, `index.css`, `Hero.tsx`, `Footer.tsx`, `PerformanceDashboard.tsx`, `Index.tsx`, `IconSelector.tsx`, `performance.ts`, `use-above-fold.ts` |
| **Renamed** | `EnhancedSEO.tsx` → `SEO.tsx`, `EnhancedStructuredData.tsx` → `StructuredData.tsx` |

### Expected Performance Improvements

- **~15-20% smaller bundle** (removing duplicates + lazy loading Admin + dynamic icon imports)
- **~200-400ms faster LCP** (single hero image, removed font @import)
- **~100ms faster TTI** (removing duplicate GA4 initialization, no duplicate event listeners)
- **Cleaner codebase** with single sources of truth
