# Krishna_Great Portfolio v2

React + Vite portfolio, deployed to **GitHub Pages** with **GitHub Actions**.
Live URL (after first deploy): https://greatkrishnacoder9826-sketch.github.io/Krishna-Great-Portfolio-v2/

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173/Krishna-Great-Portfolio-v2/
npm run build      # production build into dist/
npm run preview    # test the production build
```

## Deploy (first time)
1. On GitHub create a **new** repository named exactly `Krishna-Great-Portfolio-v2` (Public, empty: no README/licence). Your old portfolio repo is not touched.
2. In this folder:
```bash
git init
git add .
git commit -m "Initial portfolio v2"
git branch -M main
git remote add origin https://github.com/greatkrishnacoder9826-sketch/Krishna-Great-Portfolio-v2.git
git push -u origin main
```
3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Open the **Actions** tab. The "Deploy to GitHub Pages" run starts on the push (or press *Run workflow*). When green, the site is live at the URL above.

## Update later
Edit files, then `git add . && git commit -m "Update" && git push`. Every push to `main` redeploys.

## Add or edit a project
Each project is one file in `src/data/projects/`. Copy `_TEMPLATE.js`, rename it, fill in only facts you can verify. It appears automatically (cards, filters, search, modal, deep link `#/project/<id>`).
- `status`: `featured | standard | experimental | upcoming | pending`. Featured cards are larger and listed first.
- Empty modal tabs show "not published yet" instead of invented content.
- Categories and statuses live in `src/data/categories.js`.

## Resume and profile photo (optional)
- Resume: put the PDF in `public/assets/resume/`, then set `resume: 'assets/resume/Krishna_Resume.pdf'` in `src/data/profile.js`. Buttons appear automatically.
- Photo: put it in `public/assets/images/profile/`, then set `photo: 'assets/images/profile/krishna.jpg'`.

## Notes
- Repo name is set in `vite.config.js` (`base`). If you rename the repo, change it there.
- Routing uses the URL hash, so GitHub Pages never returns 404 for project links.
- The GitHub section uses the public API without tokens and falls back gracefully if rate-limited.
- No phone number is shown anywhere; contact is email, GitHub and LinkedIn.
