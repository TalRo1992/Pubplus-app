
import React, { useState, useRef, useEffect } from 'react';

const SelectCheckbox: React.FC<any> = ({ items, value, onChange }) => {
    const [originalItems, setOriginalItems] = useState<string[]>(items);

    useEffect(() => {
      if(!originalItems.length){
        setOriginalItems(items)
      }
    }, [items])

  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <div className="auto-container">
        <div className='input-wrapper'>
          <select className="search-input" onChange={(e) => handleChange(e.target.value)} value={value}>
            {originalItems.map((item:string) => (
                <option value={item} key={item}>{item} </option>
            ))}
          </select>
      </div>
    </div>
  );
};

export default SelectCheckbox;
