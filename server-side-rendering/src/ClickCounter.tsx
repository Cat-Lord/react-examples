import { useState } from "react";

export const ClickCounter = () => {
  const [clicks, setClicks] = useState(0);

  function increaseClicks() {
    setClicks(clicks + 1);
  }

  return (
    <button onClick={increaseClicks} >Click: {clicks} </button>
  )
}