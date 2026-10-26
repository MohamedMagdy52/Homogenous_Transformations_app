import {useEffect,useRef,useState} from 'react';

/** A single continuous cursor avoids competing step/progress state updates. */
export function usePlayback(count:number) {
  const [cursor,setCursor]=useState(count);
  const [playing,setPlaying]=useState(false);
  const [speed,setSpeed]=useState(1);
  const current=useRef(cursor);
  useEffect(()=>{
    if(!playing)return;
    let raf=0;
    let last=performance.now();
    const tick=(now:number)=>{
      const next=Math.min(count,current.current+Math.max(0,now-last)/1800*speed);
      last=now;
      current.current=next;
      setCursor(next);
      if(next>=count){setPlaying(false);return;}
      raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);
    return()=>cancelAnimationFrame(raf);
  },[playing,count,speed]);
  const seek=(step:number)=>{const safe=Math.max(0,Math.min(count,step));setPlaying(false);current.current=safe;setCursor(safe);};
  const toggle=()=>{
    if(playing){setPlaying(false);return;}
    if(current.current>=count){current.current=0;setCursor(0);}
    if(count)setPlaying(true);
  };
  const safeCursor=Math.max(0,Math.min(count,cursor));
  return {selected:Math.floor(safeCursor),progress:safeCursor-Math.floor(safeCursor),playing,speed,setSpeed,seek,toggle};
}
