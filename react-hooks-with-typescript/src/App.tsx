import './App.css';
import { Carousel } from './components/Carousel'
import { CarouselItem } from './components/CarouselItem';
import infoText from './static/infoText';

/**
 * React with typescript available at https://reactjs.org/docs/static-type-checking.html 
 * 
 * Using:
 * 
 *    npx create-react-app react-with-typescript --template typescript
 * 
 * we are already ready to go. It can also be imported to an existing project.
 */

function App() {
  return (
    <div className="App">
      <Carousel>
        {
          infoText.map((info) => {
            return <CarouselItem key={info.title} nebula={info}/>
          })
        }
      </Carousel>
    </div>
  );
}

export default App;
