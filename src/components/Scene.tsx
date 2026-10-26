import { Canvas, useFrame } from '@react-three/fiber';
import { Grid, Html, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { Axis, Mat4, TransformStep } from '../math/transforms';

type Palette = { x: string; y: string; z: string; origin: string };
const WORLD: Palette = { x: '#9b3342', y: '#257153', z: '#285d99', origin: '#71839a' };
const BODY: Palette = { x: '#ff6b35', y: '#ffe45e', z: '#26d9ff', origin: '#ffffff' };
const PREVIOUS: Palette = { x: '#72516f', y: '#72516f', z: '#72516f', origin: '#846e84' };

function AxisArrow({ axis, color, muted = false }: { axis: Axis; color: string; muted?: boolean }) {
  const rotation: [number, number, number] = axis === 'x' ? [0, 0, -Math.PI / 2] : axis === 'z' ? [Math.PI / 2, 0, 0] : [0, 0, 0];
  const length = muted ? 1.15 : 1.45;
  return <group rotation={rotation}>
    <mesh position={[0, length / 2, 0]}><cylinderGeometry args={[muted ? .018 : .035, muted ? .018 : .035, length, 12]} /><meshStandardMaterial color={color} transparent opacity={muted ? .55 : 1} emissive={color} emissiveIntensity={muted ? .05 : .2} /></mesh>
    <mesh position={[0, length, 0]}><coneGeometry args={[muted ? .065 : .1, muted ? .16 : .22, 16]} /><meshStandardMaterial color={color} transparent opacity={muted ? .55 : 1} emissive={color} emissiveIntensity={muted ? .05 : .2} /></mesh>
  </group>;
}

function toMatrix(pose: Mat4) { return new THREE.Matrix4().set(pose[0][0],pose[0][1],pose[0][2],pose[0][3],pose[1][0],pose[1][1],pose[1][2],pose[1][3],pose[2][0],pose[2][1],pose[2][2],pose[2][3],pose[3][0],pose[3][1],pose[3][2],pose[3][3]); }

function Frame({ pose, label, palette, muted = false }: { pose: Mat4; label: string; palette: Palette; muted?: boolean }) {
  const group = useRef<THREE.Group>(null); const matrix = useMemo(() => toMatrix(pose), [pose]);
  useFrame(() => { if (group.current) { group.current.matrixAutoUpdate = false; group.current.matrix.copy(matrix); } });
  return <group ref={group}>
    <AxisArrow axis="x" color={palette.x} muted={muted} /><AxisArrow axis="y" color={palette.y} muted={muted} /><AxisArrow axis="z" color={palette.z} muted={muted} />
    {(['x','y','z'] as Axis[]).map(axis => <Html key={axis} position={axis==='x'?[1.65,0,0]:axis==='y'?[0,1.65,0]:[0,0,1.65]} center><span className={`axis-label ${label.toLowerCase()}`} style={{color:palette[axis]}}>{label[0]}·{axis.toUpperCase()}</span></Html>)}
    <mesh><sphereGeometry args={[muted?.06:.1,18,18]}/><meshStandardMaterial color={palette.origin} transparent opacity={muted?.55:1} emissive={palette.origin} emissiveIntensity={.2}/></mesh>
    <Html position={[0,-.28,0]} center><span className={`frame-label ${label.toLowerCase()}`}>{label}</span></Html>
  </group>;
}

function MotionCue({ step, pose }: { step: TransformStep; pose: Mat4 }) {
  const cuePose = step.frame === 'body' ? pose : [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
  const group=useRef<THREE.Group>(null);const matrix=useMemo(()=>toMatrix(cuePose),[cuePose]);
  useFrame(({clock})=>{if(group.current){group.current.matrixAutoUpdate=false;group.current.matrix.copy(matrix);group.current.scale.setScalar(1+Math.sin(clock.elapsedTime*5)*.035)}});
  const rotation:[number,number,number]=step.axis==='x'?[0,Math.PI/2,0]:step.axis==='y'?[Math.PI/2,0,0]:[0,0,0];
  return <group ref={group}><group rotation={rotation}>{step.kind==='rotate'?<group><mesh><torusGeometry args={[.72,.025,12,64,Math.PI*1.65]}/><meshBasicMaterial color="#f6c453"/></mesh><mesh position={[-.64,.34,0]} rotation={[0,0,-.75]}><coneGeometry args={[.09,.22,16]}/><meshBasicMaterial color="#f6c453"/></mesh></group>:<AxisArrow axis={step.axis} color="#f6c453"/>}</group></group>;
}

export function TransformScene({pose,previous,activeStep,moving}:{pose:Mat4;previous?:Mat4;activeStep?:TransformStep;moving:boolean}) { return <Canvas dpr={[1,1.6]} gl={{antialias:true}} fallback={<div className="webgl-fallback">3D rendering is unavailable in this browser.</div>}>
  <color attach="background" args={['#070b14']}/><fog attach="fog" args={['#070b14',10,24]}/><PerspectiveCamera makeDefault position={[5,4.2,6]} fov={45}/><ambientLight intensity={.8}/><directionalLight position={[4,7,3]} intensity={1.8}/><Grid args={[20,20]} cellColor="#182c45" sectionColor="#284d76" fadeDistance={18} fadeStrength={1}/>
  <Frame pose={[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]} label="WORLD" palette={WORLD} muted/>{previous&&moving&&<Frame pose={previous} label="START" palette={PREVIOUS} muted/>}<Frame pose={pose} label="BODY" palette={BODY}/>{activeStep&&moving&&<MotionCue step={activeStep} pose={pose}/>}<OrbitControls makeDefault enableDamping dampingFactor={.08}/>
</Canvas> }
