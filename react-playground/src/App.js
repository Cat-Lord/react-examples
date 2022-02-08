import logo from 'static/logo.svg';
import 'stylesheets/App.css';
import 'stylesheets/loginControl.css'
import LoginControl from 'components/logger';
import Clock from 'components/clock';
import Comment from 'components/comments';
import Clicker from 'components/clickWarning';
import List from 'components/list/list';
import Listing from 'components/list/listItem';
import Form from 'components/form';
import NullValue from 'components/nullValue';
import WaterTemperature from 'components/WaterTemperature';
import Sidebar from 'components/Sidebar';
import SplitPanel from 'SplitPanel';
import SignUpDialog from 'components/SignUp';

/*
  Creating "jsconfig.json" file lets us setup the project so that each import isn't relative or file system aboslute 
  (meaning writing "/" would result in root directory of the whole file system). 
  Its setup allows us then to write "import 'path/to/something'" with respect to our root directory. In our case this
  root directory was set to "/path/to/this/project/src".

  https://create-react-app.dev/docs/importing-a-component/
*/


function App(props) {
  let numbers = [37,23,7,24137,231,72];
  let items = [
    {id: 5, data: 'Nostril'},
    {id: 16},
    {id: 82, data: 'meow'}
  ];
  return (
    <div>
      
      <div className="App-header">
        <img className="App-logo" alt="logo" src={logo} width="90" height="auto"/>
        
        <Comment />
        <h1>Cats are Love</h1>
        <Clock />
        <LoginControl loggedIn={false} />
        <Clicker />
        <List numbers={numbers} />
      </div>

      <Sidebar color="grey">
        <ul>
          <li><h1 className="Dialog-title">Welcome</h1></li>
          <li><p className="Dialog-message">Thank you for visiting our spacecraft!</p></li>
          <li><h1>Number 3</h1></li>
          <li><h1>Number 4</h1></li>
        </ul>
      </Sidebar>

      <h3>What do you think ? {props.message}</h3>
      <div className="horizontal-body">
        <img src="https://kitcat.com.sg/wp-content/uploads/2020/07/Kit-Cat.png" alt="Kittie" width="300" height="auto"/>
        <NullValue />
        <WaterTemperature />
        <SplitPanel />
      </div>

      <br />

      <Listing items={items} />
      <Form options={["sk", "en", "us", "li"]} />

      <SignUpDialog />
    </div>
  );
}

export default App;
