import './App.css';

// react icons installed from https://react-icons.github.io/react-icons/
// via 'npm install react-icons --save'
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward
} from "react-icons/fa";

import { Carousel } from './components/Carousel'
import { Controls } from './components/Controls';
import { IconButton } from './components/IconButton';
import { SlideNav, SlideNavItem } from './components/SlideNav';
import { Slide, Slides } from './components/Slides';
import infoText from './static/infoText';
import { SpacerGif } from './components/SpacerGif';
import { ProgressBar } from './components/ProgressBar';
import VisuallyHidden from '@reach/visually-hidden';
import Alert from '@reach/alert';

/**
 * React with typescript available at https://reactjs.org/docs/static-type-checking.html 
 * 
 * Using:
 * 
 *    npx create-react-app react-with-typescript --template typescript
 * 
 * we are already ready to go. It can also be imported to an existing project.
 */

const SLIDE_DURATION = 3000;

function App() {
  let currentIndex = 0;
  return (
    <Carousel aria-label="Images from Space">
      <Slides>
      {
        infoText.map((info, index) => (
          <Slide
            key={index}
            id={`slide-${index}}`}
            title={info.title}
            pathToImage={info.imgPath}
            isCurrent={index === currentIndex}
            takeFocus={null}
            children={info.content}
          />
        ))
      }
      </Slides>

      <SlideNav>
        {
          infoText.map((info, index) => (
            <SlideNavItem
              key={index}
              isCurrent={index === currentIndex}
              ariaLabel={`Slide ${index + 1}`}
              onClick={() => {}}
            />
          ))
        }
      </SlideNav>

      <Controls>
        {false ? (
          <IconButton
            aria-label="Pause"
            onClick={() => {}}
            children={<FaPause />}
          />
        ) : (
          <IconButton
            aria-label="Play"
            onClick={() => {}}
            children={<FaPlay />}
          />
        )}
        <SpacerGif width="10px" />
        <IconButton
          aria-label="Previous Slide"
          onClick={() => {}}
          children={<FaBackward />}
        />
        <IconButton
          aria-label="Next Slide"
          onClick={() => {}}
          children={<FaForward />}
        />
      </Controls>

      <ProgressBar
        time={SLIDE_DURATION}
        animate={false}
      />

      {
        /* Installed via npm: 
            npm i @reach/visually-hidden 
            npm i @reach/alert
        */
      }
      <VisuallyHidden>
        <Alert>
          Item {currentIndex + 1} of {infoText.length}
        </Alert>
      </VisuallyHidden>
      
    </Carousel>
  );
}

export default App;
