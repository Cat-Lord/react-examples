export function Slides(props: any) {
  return <ul {...props} />;
}

export function Slide({isCurrent, takeFocus, pathToImage, id, title, children} : {
  isCurrent : boolean,
  takeFocus : any,
  pathToImage : string,
  id : any,
  title : string,
  children : any
}) {
  return (
    <li
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