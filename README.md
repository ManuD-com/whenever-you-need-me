# Whenever You Need Me 💌

A responsive React + Vite digital letter gift. It runs entirely in the browser; no account, backend, or database is needed.

## Run locally

1. Install Node.js (LTS) from https://nodejs.org/
2. Extract this folder.
3. Open a terminal in this folder and run:

```bash
npm install
npm run dev
```

4. Open the local URL printed by Vite (usually http://localhost:5173).

Build for deployment:

```bash
npm run build
```

The production site is created in `dist/`. Deploy that folder to Netlify or Vercel, or connect the repository for automatic builds.

## Personalize it

### Change the secret password
The starter password is `ourlittleuniverse`. For local development, create a `.env` file:

```env
VITE_SECRET_PASSWORD=your-own-inside-joke
```

Restart the dev server after changing it. For deployment, add the same variable in your hosting provider's environment-variable settings and redeploy. **Note:** this is a playful client-side lock, not secure authentication; the password is included in the browser bundle.

### Add photos, video, and voice notes
Put your media files in `public/media/`, then reference them as `/media/your-file.jpg`, etc. Search for `MediaPlaceholder` in `src/main.jsx` to replace the visual placeholders with actual `<img>`, `<audio controls>`, or `<video controls>` elements. Example:

```jsx
<img src="/media/us-together.jpg" alt="A favourite memory" />
<audio controls src="/media/voice-note.mp3" />
<video controls playsInline src="/media/final-message.mp4" />
```

Suggested names:
- `background.mp3` — optional site-wide background music
- `voice-note.mp3` — optional voice note
- `night-audio.mp3` — optional calming audio
- `final-message.mp4` — optional secret-letter video

The background music control is already wired to `/media/background.mp3`. Browsers require a user tap before audio can start.

### Edit the letters
All letter titles, paragraphs, captions, reasons, and timeline starter text are in the `LETTERS` array near the top of `src/main.jsx`. Change those strings to your own memories and words. The opened-letter count is saved in localStorage on the visitor's device.

### Reset the opened count
In the browser console, run:

```js
localStorage.removeItem('wym-opened')
```

Then refresh.

## Notes
- The password gate is intended as a sweet surprise, not protection for private content.
- The audio player is optional; add your own licensed or personally recorded audio.
- If you want a public website, remember that anything you put in its files can be viewed by visitors.

### **final link of website**
https://manud-com.github.io/surprise/?utm_source=chatgpt.com
