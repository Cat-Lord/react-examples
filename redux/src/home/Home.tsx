import React from 'react';
import { Link } from 'react-router-dom';

type HomeProps = {

};

const Home: React.FC<HomeProps> = () => {
  return (
    <div className='jumbotron'>
      <h1>Administration</h1>
      <hr />
      <p>React with state management handled by Redux.</p>
    </div>
  );
};

export default Home;