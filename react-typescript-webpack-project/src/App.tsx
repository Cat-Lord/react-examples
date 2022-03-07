import "./css/app.css"
import catImage from './img/cat.jpg'

export const App = () => {
  return (
    <div>
      <div>
        <p>😍 React available for { process.env.name }s ! 🥰</p>
        <small>Running in { process.env.NODE_ENV } mode !</small>
      </div>
      <img src={ catImage } alt="cat on leash" width="auto" height="300"/>
    </div>
  ); 
}
