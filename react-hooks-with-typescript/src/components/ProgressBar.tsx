import { useEffect, useState } from "react";

export function ProgressBar({ animate, time }: { animate: boolean, time: number }) {
  let progress = useProgress(animate, time);

  return (
    <div className="ProgressBar" >
      <div 
        style={{width: `${progress * 100}%`}} 
      />
    </div>
  );
}

function useProgress(animate: boolean, time: number) {
  let [progress, setProgress] = useState(0);

  useEffect(() => {
    
    if (animate) {
      let animationFrameId: any = null;
      let start: number = 0;
      let step = (timestamp: number) => {
        if ( ! start)
          start = timestamp;

        let progress = timestamp - start;
        setProgress(progress);

        if (progress < time)
          animationFrameId = requestAnimationFrame(step);
      }
      animationFrameId = requestAnimationFrame(step);

      return function cleanup() {
        cancelAnimationFrame(animationFrameId);
      }
    }
  }, [animate, time]);
  
  return animate
          ? Math.min(progress / time, time)
          : 0;
}