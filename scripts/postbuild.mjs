// GitHub Pages serves 404.html for unknown paths; reuse the SPA shell so deep links never show a raw 404.
import { copyFileSync } from 'node:fs'
copyFileSync('dist/index.html', 'dist/404.html')
