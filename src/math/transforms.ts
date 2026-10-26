export type Axis='x'|'y'|'z';
export type Frame='world'|'body';
export type Kind='rotate'|'translate';
export type Mat4=number[][];
export interface TransformStep {id:string;kind:Kind;axis:Axis;value:number;frame:Frame}
export const identity=():Mat4=>[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
export const mul=(a:Mat4,b:Mat4):Mat4=>a.map((r,i)=>r.map((_,j)=>r.reduce((s,__,k)=>s+a[i][k]*b[k][j],0)));
export const rotation=(axis:Axis,degrees:number):Mat4=>{const t=degrees*Math.PI/180,c=Math.cos(t),s=Math.sin(t); if(axis==='x')return [[1,0,0,0],[0,c,-s,0],[0,s,c,0],[0,0,0,1]];if(axis==='y')return [[c,0,s,0],[0,1,0,0],[-s,0,c,0],[0,0,0,1]];return [[c,-s,0,0],[s,c,0,0],[0,0,1,0],[0,0,0,1]]};
export const translation=(axis:Axis,d:number):Mat4=>{const m=identity();m['xyz'.indexOf(axis)][3]=d;return m};
export const matrixFor=(s:TransformStep,fraction=1)=>s.kind==='rotate'?rotation(s.axis,s.value*fraction):translation(s.axis,s.value*fraction);
export const applyStep=(pose:Mat4,s:TransformStep,fraction=1)=>s.frame==='world'?mul(matrixFor(s,fraction),pose):mul(pose,matrixFor(s,fraction));
export const compose=(steps:TransformStep[],count=steps.length)=>steps.slice(0,count).reduce((p,s)=>applyStep(p,s),identity());
export const inverse=(t:Mat4):Mat4=>{const out=identity();for(let i=0;i<3;i++)for(let j=0;j<3;j++)out[i][j]=t[j][i];for(let i=0;i<3;i++)out[i][3]=-out[i].slice(0,3).reduce((s,v,j)=>s+v*t[j][3],0);return out};
export const relative=(worldA:Mat4,worldB:Mat4)=>mul(inverse(worldA),worldB);
export const clean=(v:number)=>Math.abs(v)<1e-10?0:Math.abs(v-1)<1e-10?1:Math.abs(v+1)<1e-10?-1:v;
export const label=(s:TransformStep)=>`${s.kind==='rotate'?'R':'P'}${s.axis.toUpperCase()}(${s.value}${s.kind==='rotate'?'°':''})`;
