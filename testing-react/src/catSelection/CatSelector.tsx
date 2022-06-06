import React, { useState } from 'react'
import './catBanner.css'
import CatBanner from './CatBanner'

export type Cat = {
  name: string
  dateOfBirth: Date
  dateOfDeath?: Date
  selected: boolean
}

type CatSelectorProps = {
  cats: Cat[]
}

const CatSelector: React.FC<CatSelectorProps> = ({ cats }) => {
  const [allCats, _] = useState<Cat[]>(cats);
  const [selectedCats, setSelectedCats] = useState<Cat[]>(cats.filter((cat: Cat) => cat.selected));

  const toggleSelectedCat = (cat: Cat) => {
    if (cat.selected)
      setSelectedCats([...selectedCats, cat])
    else
      setSelectedCats(selectedCats.filter((kittie: Cat) => kittie.selected));
  }

  return (
    <div>
      <div className='cats-container'>
        {
          allCats.map((cat) => {
            return (
              <CatBanner onChange={toggleSelectedCat} key={cat.name} cat={cat} />
            )
          })
        }
      </div>
      <div className='selected-cats-container'>
        <ol>
          {
            selectedCats.map((selectedCat: Cat) => {
              return (
                <li key={selectedCat.name}>
                  {
                    selectedCat.dateOfBirth.toISOString() + ": " + selectedCat.name
                  }
                </li>
              );
            })
          }
        </ol>
      </div>
    </div>
  )
}

export default CatSelector