import React, { ChangeEvent, useEffect, useRef } from 'react'
import { Cat } from './CatSelector'

type CatBannerProps = {
  cat: Cat
  onChange: (cat: Cat) => void
}

const CatBanner: React.FC<CatBannerProps> = ({ cat, onChange }) => {
  const checkbox = useRef<HTMLInputElement>(null);

  const toggleInclude = () => {
    if (checkbox.current !== null) {
      toggleCheckbox(checkbox.current);
    }
  }

  const toggleCheckbox = (checkbox: HTMLInputElement) => {
    const isSelected = !checkbox.checked;   // reverse the OLD value first
    cat.selected = isSelected;
    onChange(cat);
    checkbox.checked = isSelected;
  }

  return (
    <ul className='pointer-on-hover' data-testid={'cat-banner-' + cat.name} onClick={toggleInclude} >
      <li>
        <h2>{cat.name}</h2>
      </li>
      <li><p>Born: {cat.dateOfBirth.getFullYear()} 😺</p></li>
      {
        cat.dateOfDeath ?
          <li><small>Passed: {cat.dateOfDeath.getFullYear()} 💔</small></li>
          : null
      }

      <li>
        <input
          className='pointer-on-hover'
          data-testid="checkbox-test-id"
          ref={checkbox}
          onChange={(event) => { toggleCheckbox(event.target) }}
          type="checkbox"
          id={cat.name}
          name={cat.name}
          checked={cat.selected}
        /></li>
    </ul>
  )
}

export default CatBanner