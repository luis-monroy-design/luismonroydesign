# Scroll-driven stage

`stage.js` is the source of the interactive layer (a near-black WebGL background with very soft
colour glows, smooth scroll, pinned 3D carousel, chapter ruler, mouse parallax). It is bundled into `public/site/stage.js`, which is the
file the site actually loads (see `src/routes/index.tsx`).

The page works without it: with reduced motion or no WebGL, the static design stays. The background
also runs on phones.

## Rebuild

The libraries are not project dependencies on purpose (so Lovable's `package.json` stays
untouched). Install them anywhere, then bundle:

```sh
# one-time, in any scratch folder
npm i three@0.170.0 lenis@1.1.0 esbuild

# from the project root (NODE_PATH points at that scratch node_modules)
NODE_PATH=/path/to/scratch/node_modules \
  /path/to/scratch/node_modules/.bin/esbuild stage-src/stage.js \
  --bundle --minify --format=esm --target=es2020 --legal-comments=none \
  --outfile=public/site/stage.js
```

Notes

- Lenis 1.1.0 calls its `prevent` option as a function, so it is passed `() => false`.
- Chapters and palettes (`LIGHT` / `DARK`) are at the top of `stage.js`; the glow colours and strength are in the shader in `createStage()`.
- The carousel, focus rows and ruler only activate on screens at least 900 x 560 px.
