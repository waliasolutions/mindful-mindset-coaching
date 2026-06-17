## Fix: Phone number tel: links have extra leading zero after country code

Swiss mobile numbers are displayed locally with a leading zero (e.g. `078 840 04 81`). When prefixed with the `+41` country code, that zero must be removed to produce the correct E.164 format (`+41788400481`).

### Changes

| File | Change |
|------|--------|
| `src/components/Contact.tsx` (line 80) | Change `tel:+41${content.phone.replace(/\s/g, '')}` → `tel:+41${content.phone.replace(/\s/g, '').replace(/^0/, '')}` |
| `src/components/Contact.tsx` (line 122) | Same fix for the "Jetzt anrufen" button |
| `src/components/Footer.tsx` (line 60) | Strip spaces from `contactPhone` in tel link: `tel:${footerContent.contactPhone}` → `tel:${footerContent.contactPhone?.replace(/\s/g, '')}` |

### Result
All `tel:` links will now dial the correct international number without the extra leading zero.