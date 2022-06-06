import React, { ChangeEvent, useRef } from 'react'
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
    <ul className='pointer-on-hover' onClick={toggleInclude} >
      <li>
        <h2>{cat.name}</h2>
      </li>
      <li><small>{cat.dateOfBirth.toISOString()}</small></li>
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