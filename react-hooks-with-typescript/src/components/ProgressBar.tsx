export function ProgressBar({ animate, time }: { animate: boolean, time: number }) {
  let progress = 0.5;

  return (
    <div className="ProgressBar" >
      <div 
        style={{width: `${progress * 100}%`}} 
      />
    </div>
  );
}