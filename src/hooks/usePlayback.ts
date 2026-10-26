import {useEffect,useRef,useState} from 'react';

/** A single continuous cursor avoids competing step/progress state updates. */
export function usePlayback(count:number) {
  const [cursor,setCursor]=useState(count);
  const [playing,setPlaying]=useState(false);
  const [speed,setSpeed]=useState(1);
  const current=useRef(cursor);
  current.current=cursor;
  useEffect(()=>{
    if(!playing)return;
    let raf=0;
    let last=performance.now();
    const tick=(now:number)=>{
      const next=Math.min(count,current.current+(now-last)/1800*speed);
      last=now;
      current.current=next;
      setCursor(next);
      if(next>=count){setPlaying(false);return;}
      raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);
    return()=>cancelAnimationFrame(raf);
  },[playing,count,speed]);
  const seek=(step:number)=>{setPlaying(false);current.current=step;setCursor(step);};
  const toggle=()=>{
    if(playing){setPlaying(false);return;}
    if(current.current>=count){current.current=0;setCursor(0);}
    if(count)setPlaying(true);
  };
  return {selected:Math.floor(cursor),progress:cursor-Math.floor(cursor),playing,speed,setSpeed,seek,toggle};
}
