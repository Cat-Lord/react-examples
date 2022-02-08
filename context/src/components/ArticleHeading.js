import Icon from "./Icon";

export default function ArticleHeading(props) {
  return (
    <div className="heading-container">
        <h1>{ props.title }</h1>
        <Icon icon={props.icon} />
    </div>
  );
}
