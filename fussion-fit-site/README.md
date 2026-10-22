# Fussion Fit website

An editorial, black-and-red static website concept for Fussion Fit, Hazratganj. It now uses local photos and a supplied gym video from `C:/Users/Gaurav Jee/Downloads/fussion gym media/`. Eight optimized WebP images are used in the page; one additional cropped source image is retained but not used. The MP4 is local in `public/videos/`.

## Run locally

Open `index.html` in a browser, or serve this folder using a local static HTTP server. For example, with Node installed:

```sh
npx serve .
```

No npm install or build step is required. The page uses HTML, CSS, SVG decorations, and vanilla JavaScript. Barlow Condensed and DM Sans are requested from Google Fonts with local system fallbacks.

## Project files

- `index.html` — page content, navigation, local media, and CTAs
- `styles.css` — design tokens, responsive layout, depth treatments, and reduced-motion rules
- `app.js` — mobile menu, reveal animations, 3D card tilt, scroll parallax/progress, BMI calculator, and email draft behavior
- `business-config.json` — location, map and unverified business contact settings
- `asset-manifest.json` — local asset sources, target sections, sizes/permission notes, and follow-up items
- `public/images/` — eight compressed WebP images used by the site, including a clean hero crop and owner portrait; one unused source visual is also retained
- `public/videos/` — supplied MP4 video, loaded on demand with controls

## Visual and motion notes

The hero uses a clean crop from the supplied training photo. Scroll movement shifts and scales the photo in perspective. A top progress line, reveal transitions, photo-card hover tilt, and layered location graphic add depth without requiring WebGL. Reduced-motion preferences disable continuous/reveal motion. The supplied portrait video is click-to-play; it does not autoplay or fetch until requested.

## Media and permissions

Eight optimized local image files used on the site were created from six supplied photos, plus one local MP4 (2,420,396 bytes). Some source posts include existing promotional design; image crops focus on the gym activity and avoid carrying over visible contact details or unsupported schedule/pricing claims. One additional cropped image that still contains promotional text is retained but not shown on the site.

Before public launch, confirm the gym can reuse these files, the owner portrait is approved, and identifiable people in photos/videos have given permission. Review the owner video and add captions/subtitles. The manifest links each local asset to its source and website section.

## Business details before launch

The location CTA uses the exact Google Maps link you provided. The short link timed out in this environment, so I could not inspect its resolved pin or coordinates. The website links to your pin directly and does not claim a street address or coordinates.

The supplied phone value `0000000000` remains marked unverified and is not linked. No business email, prices, trainer details, timetable, ratings, testimonials, or statistics are invented. Membership questions remain contact-only. The enquiry form opens an email draft through `mailto:`; there is no connected backend and the website does not send the message. Configure a verified business email before launch.

## Verification and limitations

All eight local images referenced by `index.html` and the video file exist. The site has no automated test suite or production build configuration because it is a static page. The Instagram profile itself remained behind a sign-up/log-in gate during the earlier inspection, so no files were retrieved from Instagram. The current page visuals came from your supplied media folder.
