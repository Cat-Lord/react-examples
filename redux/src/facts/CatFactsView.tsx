import React from 'react';
import { CatFact } from '../types';

type CatFactsProps = {
  facts: CatFact[];
  isFetching: boolean;
  getNewFact: () => void;
};

const CatFactsView: React.FC<CatFactsProps> = ({ facts, isFetching, getNewFact }) => {

  return (
    <div>
      <h1>Cat Facts</h1>
      <button disabled={isFetching} onClick={getNewFact}>Get new Fact</button>

      <ul>
        {
          facts.map((fact, index) => {
            return (
              <li key={index}>
                <p>{fact.text}</p>
                <small>{fact.updatedAt}</small>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default CatFactsView;