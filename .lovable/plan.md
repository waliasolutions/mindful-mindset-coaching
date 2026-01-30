
## Plan: Fix Missing "Über mich" and "Preise" Sections

### Problem Identified
The conditional rendering logic in `Index.tsx` is inverted, causing sections to disappear after the user scrolls or after 3 seconds.

**Current broken logic (line 117):**
```tsx
{(isAboveTheFold || index < 2) && (
```

This means:
- When page loads (`isAboveTheFold = true`): All sections show
- After scroll/3 seconds (`isAboveTheFold = false`): Only Hero + Services show (About, Pricing, Contact disappear!)

### Solution
Change the condition from `(isAboveTheFold || index < 2)` to `(!isAboveTheFold || index < 2)`

**Corrected logic:**
- Before scroll (`isAboveTheFold = true`): Only first 2 sections load (performance optimization)
- After scroll (`isAboveTheFold = false`): ALL sections load and stay visible

### File Change

**File:** `src/pages/Index.tsx`

**Line 117 - Change:**
```tsx
// FROM:
{(isAboveTheFold || index < 2) && (

// TO:
{(!isAboveTheFold || index < 2) && (
```

### Technical Details
This is a single character fix (`!` added) that inverts the boolean condition. The `useAboveFold` hook correctly:
1. Starts with `isAboveTheFold = true`
2. Sets it to `false` after 100px scroll OR after 3-second timeout
3. The sections should load MORE content after this transition, not less

### Result
After this fix:
- All 5 sections (Hero, Services, About/Über mich, Pricing/Preise, Contact) will display correctly
- Performance optimization still works: only first 2 sections load initially
- After scroll or timeout, remaining sections lazy-load and remain visible
