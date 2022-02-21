import { useEffect, useLayoutEffect, useRef } from "react";

export function Slides(props: any) {
  return <ul {...props} />;
}

export function Slide({isCurrent, takeFocus, pathToImage, id, title, children} : {
  isCurrent : boolean,
  takeFocus : boolean,
  pathToImage : string,
  id : any,
  title : string,
  children : any
}) {

  // we need to define this as 'html li element' to satisfy typescript
  const ref = useRef<HTMLLIElement>(null);

  // now if it's our current slide and we should take focus, do it
  useLayoutEffect(() => {
     if (isCurrent  &&  takeFocus  && ref.current)
      ref.current.focus();
  }, [isCurrent, takeFocus])

  return (
    <li
      ref={ref}
      aria-hidden={!isCurrent}
      tabIndex={ -1 }
      aria-labelledby={id}
      className="Slide"
      style={{ backgroundImage: `url(${pathToImage})` }}
    >
      <div className="SlideContent">
        <h2 id={id}>{title}</h2>
        {children}
      </div>
    </li>
  );
}