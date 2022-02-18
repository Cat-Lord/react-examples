
// todo: figure out css names according to finished css 
export function CarouselItem(props: any): JSX.Element {
  return (
    <div className="Slide">
      <h1>{props.nebula.title}</h1>
      {props.nebula.content}
      <img className="Media" src={props.nebula.imgPath} alt={props.nebula.title} />
    </div>
  );
}