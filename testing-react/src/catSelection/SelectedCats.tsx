import React from 'react'
import { Cat } from './CatSelector'

type SelectedCatsProps = {
  selectedCats: Cat[]
}

const SelectedCats: React.FC<SelectedCatsProps> = ({ selectedCats }) => {
  return (
    <div className='selected-cats-container'>
      <ol>
        {
          selectedCats.map((selectedCat: Cat) => {
            return (
              <li key={selectedCat.name} data-testid={'selected-cat-' + selectedCat.name}>
                {
                  selectedCat.dateOfBirth.toISOString() + ": " + selectedCat.name
                }
              </li>
            );
          })
        }
      </ol>
    </div>
  )
}

export default SelectedCats