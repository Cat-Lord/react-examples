import React from 'react';

type AboutProps = {

};

const About: React.FC<AboutProps> = (props) => {
  return (
    <div>
      <h1>About</h1>
      <p>This app uses Redux to demonstrate state management of
        a React application. Implemented with Typescript from 🤎.</p>
    </div>
  );
};

export default About;