# UCCM KERACON 2027 Interactive Interface

## Implemented flow
- Home screen: **UNIVERSAL CORNEA CARE** / **MISSION**
- Heading: **SELECT AN AI EXPERIENCE**
- Infection: Model 1, Model 2, Model 3; each launches its own 30-second MP4.
- Keratoconus: Case A, Case B, Case C; each launches its own 30-second MP4.
- KPOP: immediately launches its single 60-second workflow MP4.
- When a video ends, the app automatically returns to the home screen.
- No delegate-facing back, confirmation or finish buttons. Video player controls are hidden.

## Required video filenames
Put these files in `videos/`:
| Experience | Filename | Duration |
|---|---|---:|
| Infection Model 1 | `infection_model_1.mp4` | 30 sec |
| Infection Model 2 | `infection_model_2.mp4` | 30 sec |
| Infection Model 3 | `infection_model_3.mp4` | 30 sec |
| Keratoconus Video 1 | `keratoconus_video_1.mp4` | 30 sec |
| Keratoconus Video 2 | `keratoconus_video_2.mp4` | 30 sec |
| Keratoconus Video 3 | `keratoconus_video_3.mp4` | 30 sec |
| KPOP | `kpop_workflow.mp4` | 60 sec |

Change labels and filenames in `config.js`. Keratoconus options are labelled Case A, Case B and Case C.

## Test locally
Use Python 3 in this folder:
```bash
python -m http.server 8000
```
Open `http://localhost:8000` in Chrome or Edge. Do not test by double-clicking `index.html`.

## Deploy to GitHub Pages
1. Create a repository, e.g. `uccm-keracon-2027`.
2. Upload the contents of this folder to the repository root.
3. Add the seven MP4s to `videos/`.
4. Open repository **Settings → Pages**.
5. Select **Deploy from a branch**, branch `main`, folder `/ (root)`, then save.
6. Open the published GitHub Pages URL after deployment.

GitHub Pages needs internet to load initially. The service worker caches the app shell and caches videos after successful fetches; load all seven videos once and test offline on the actual tablet before relying on offline use. GitHub blocks ordinary Git files larger than 100 MB; for large video files consider Git LFS or separate media hosting. GitHub Pages is suitable for hosting the interface, but for a fully offline conference setup, use a local server/app package and keep all MP4s locally on the tablet/device.

## Hardware notes
- The tablet must support wired external video output (USB-C DisplayPort Alt Mode or manufacturer-supported HDMI output) for a USB-C-to-HDMI adapter.
- Connect tablet → HDMI adapter → wall display. Use adapter USB-C Power Delivery input to keep the tablet charging.
- Set tablet to landscape and mirror/duplicate its display.
- Enable Android screen pinning/kiosk mode or iPad Guided Access; disable notifications and auto-lock.
- Test all seven videos, audio, screen mirroring and automatic reset on the actual equipment.

## Scope and safety
This is a front-end video-presentation interface. It does not run AI inference or generate clinical predictions. Use only de-identified, approved clinical media and verified model outputs. The interface uses locally named video assets and does not fabricate results.


## Replaceable clinical experience logos
The three experience logos are separate SVG assets and can be replaced without editing the application logic. Keep the same filenames and paths:
- `assets/logos/infection.svg` — Infection
- `assets/logos/keratoconus.svg` — Keratoconus
- `assets/logos/keratoplasty.svg` — Keratoplasty / KPOP

Each logo appears on the home-screen experience card and on the relevant model/case selection screen. To update a logo, replace its SVG file while preserving its filename. SVG is recommended for crisp rendering on the tablet and wall display. The UCCM header mark remains separate from these three clinical identity logos.


## Latest interface updates
- Removed the KERACON event badge, event dates, and event footer text.
- Home-screen icons are independently replaceable in `config.js` using `homeIcon`.
- Each Infection model and Keratoconus case has its own replaceable profile image using the `image` property in `config.js`. Replace the image file or change its path.
- The Infection selection screen says `SELECT A MODEL`; the Keratoconus screen says `SELECT A CASE`.
- KPOP launches directly and the player label reads `KPOP WORKFLOW`, without the word presentation.
- Added Back buttons: options return to home; Infection/Keratoconus video returns to its model/case selection; KPOP video returns to home.
- Videos play muted and automatically return to home when finished. Use the Full screen button during playback; the Minimize control exits full screen.

### Replacing icons and case images
1. Put your replacement PNG, JPG, or SVG files in `assets/logos/` (or another project asset folder).
2. Open `config.js`.
3. Change `homeIcon` to replace the home-screen icon for an experience.
4. Change each option's `image` to replace its individual Model 1/2/3 or Case A/B/C profile image.
5. Save the file and refresh the browser. Keep the video filenames in `videos/` unchanged.
