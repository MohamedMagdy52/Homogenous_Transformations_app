# RoboTransform 3D

An interactive robotics lab for visualizing fixed-frame and body-frame rotations, translations, homogeneous transforms, and transformation chains with smooth animated playback.

## Run

```bash
npm install
npm run dev
```

Use `npm test` for the transformation math tests and `npm run build` for a production build.

## Controls and conventions

The app uses right-handed coordinate systems, active transformations, and column vectors. A world-frame operation is premultiplied (`T′ = A T`); a body-frame operation is postmultiplied (`T′ = T A`). Add and reorder operations in the left panel, select timeline steps, and use the playback bar to animate the chain. Drag, zoom, and pan the 3D view independently.

The muted RGB world frame remains fixed while the high-contrast orange, yellow, and cyan body frame moves. Press Play to animate the full sequence with eased motion, or use the step and speed controls for closer inspection.
Use **Highlight world** above the 3D view whenever rotations or translations make the fixed frame hard to find. It brightens and enlarges the world axes and adds a pulsing marker at the world origin.

## Architecture

All matrix calculations live in `src/math/transforms.ts`, independent of React and Three.js. Scene rendering is in `src/components/Scene.tsx`; UI, matrix display, and tutorial data are separate reusable modules.
