# RoboTransform 3D

An interactive robotics lab for visualizing fixed-frame and body-frame rotations, translations, homogeneous transforms, and transformation chains.

## Run

```bash
npm install
npm run dev
```

Use `npm test` for the transformation math tests and `npm run build` for a production build.

## Controls and conventions

The app uses right-handed coordinate systems, active transformations, and column vectors. A world-frame operation is premultiplied (`T′ = A T`); a body-frame operation is postmultiplied (`T′ = T A`). Add and reorder operations in the left panel, select timeline steps, and use the playback bar to animate the chain. Drag, zoom, and pan the 3D view independently.

The guided lab covers Problems 1–7 from Tutorial 2. The PDF extraction does not preserve the axis arrows in the Problem 7 diagram reliably, so the app records that ambiguity instead of assigning unverified orientations.

## Architecture

All matrix calculations live in `src/math/transforms.ts`, independent of React and Three.js. Scene rendering is in `src/components/Scene.tsx`; UI, matrix display, and tutorial data are separate reusable modules.
