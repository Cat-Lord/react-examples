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
import { infoText } from './static/infoText';
import { SpacerGif } from './components/SpacerGif';
import { ProgressBar } from './components/ProgressBar';
import VisuallyHidden from '@reach/visually-hidden';
import Alert from '@reach/alert';
import { useEffect, useState } from 'react';

/**
 * React with typescript available at https://reactjs.org/docs/static-type-checking.html 
 * 
 * Using:
 * 
 *    npx create-react-app react-with-typescript --template typescript
 * 
 * we are already ready to go. It can also be imported to an existing project.
 * 
 * This project is an attempt to solve problems as seen in example project in 
 * react conference video. Original source code available at:
 * https://github.com/ryanflorence/react-conf-2018/blob/master/carousel/src/App.js
 */

const SLIDE_DURATION = 1000;

function App() {
  let [currentIndex, setCurrentIndex] = useState(0);
  let [isPlaying, setIsPlaying] = useState(false);
  let [takeFocus, setTakeFocus] = useState(false);    // navigation via keyboard or other device

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (isPlaying) {
        console.log('playing...' + currentIndex);
        setCurrentIndex((currentIndex + 1) % infoText.length);
      }
    }, SLIDE_DURATION);

    /**
     * We need to specify what happens when we stop. Without this 
     * return cleanup our effect would've run one more time after we
     * pressed 'pause' and re-render. This would happen no matter when
     * we would press the pause button and is caused by changing
     * 'isPlaying' and recreating this effect, but the old last timeout
     * would still be there and would need to finish because it was
     * aleady set but not fired yet.
     */
    return function cleanup() { clearTimeout(timerId) };
  }, [currentIndex, isPlaying]);

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
            takeFocus={takeFocus}
            children={info.content}
          />
        ))
      }
      </Slides>

      <SlideNav>
        {
          // Sort of a 'go-to' implementation
          infoText.map((info, index) => (
            <SlideNavItem
              key={index}
              isCurrent={index === currentIndex}
              ariaLabel={`Slide ${index + 1}`}
              onClick={() => {
                setCurrentIndex(index);
                setTakeFocus(true);
              }}
            />
          ))
        }
      </SlideNav>

      <Controls>
        { isPlaying ? (
          <IconButton
            aria-label="Pause"
            onClick={() => {
              setIsPlaying(false);
              setTakeFocus(false);
            }}
            children={<FaPause />}
          />
        ) : (
          <IconButton
            aria-label="Play"
            onClick={() => {
              setIsPlaying(true);
              setTakeFocus(false);
            }}
            children={<FaPlay />}
          />
        )}
        <SpacerGif width="10px" />
        <IconButton
          aria-label="Previous Slide"
          onClick={() => {
            setCurrentIndex((currentIndex + infoText.length - 1)  %  infoText.length)
            setIsPlaying(false);
            setTakeFocus(false);
          }}
          children={<FaBackward />}
        />
        <IconButton
          aria-label="Next Slide"
          onClick={() => {
            setCurrentIndex((currentIndex + 1) % infoText.length)
            setIsPlaying(false);
            setTakeFocus(false);
          }}
          children={<FaForward />}
        />
      </Controls>

      {
        /**
         * 'key' allows us to 'reset' the progress bar without actually
         * passing in currentIndex, isPlaying, ... and other maybe unnecessary
         * information that progress bar doesn't need to know.
         * We compose the key of information our change depends on. In our
         * case, we need the progress bar to be re-created whe current index
         * or isPlaying change.
         * Without 'isPlaying' we would get weird artifacts like progress bar
         * starting from almost full and immediately reseting. Using 'isPlaying'
         * would be okay when animating, but it wouldn't reset when we would
         * manually update the selected item.
         */
      }
      <ProgressBar
        key={currentIndex + isPlaying.toString()}
        time={SLIDE_DURATION}
        animate={isPlaying}
      />

      {
        /*
         Using React component library Reach for accessibility.
         Installed via npm: 
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
