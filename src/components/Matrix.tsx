import {clean,Mat4} from '../math/transforms';
export function Matrix({value,size=4}:{value:Mat4,size?:3|4}){return <div className="matrix" style={{gridTemplateColumns:`repeat(${size},1fr)`}}>{value.slice(0,size).flatMap((r,i)=>r.slice(0,size).map((v,j)=><span key={`${i}-${j}`} className={(size===4&&j===3&&i<3)?'changed':''}>{clean(v).toFixed(clean(v)%1?2:0)}</span>))}</div>}
