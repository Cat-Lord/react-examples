import './App.css';
import { Children } from './components/Children';
import { IgnoredItems } from './components/IgnoredCharacters';
import { JSComponent } from './components/JavascriptExpressions';
import { Heading } from './components/Spread';

/**
 * I also tested running this example with production build.
 * https://reactjs.org/docs/optimizing-performance.html
 * 
 * npm run build
 * - created /build directory
 * 
 * npm install -g serve
 * 
 * serve -s build
 * 
 * Now visit localhost (or configured site) and you're set.
 * 
 */

function App() {
  return (
    <div className="App">
      <Heading className="heading" width="50" height="80" align="center">Heading with spread operator !</Heading>
      <hr/>

      <h2>Below are multiple divs with differently spaced content</h2>
      <p>But even though they are different in content, they get rendered equally because of whitespace stripping/collapsing.</p>
      
      {/* See how here react ignores trailing spaces, collapses new lines, etc.
          All of these divs are essentialy the same content when rendered. */}
      <IgnoredItems >
        <div>Hello World</div>
        <div>
          Hello World
        </div>

        <div>
          Hello
                                  World
        </div>

        <div>

          Hello World                
        </div>
      </IgnoredItems>

      <hr />
      <Children />

      <hr />
      <JSComponent items={[1,2,3,4, {toString: () => {return "meow";}}]} />

      <hr />
      {/* See how here react handles nulls, undefineds and others.
      They are valid, but don't render at all. */}
      <IgnoredItems >
        <p>Now observe magic: There are <strong>multiple</strong> children below me, but you don't see any of them !</p>
          <div />

          <div></div>

          <div>{false}</div>

          <div>{null}</div>

          <div>{undefined}</div>

          <div>{true}</div>
        <p>This is the end of the magic trick.</p>
      </IgnoredItems>


      <hr />

    </div>
  );
}

export default App;
