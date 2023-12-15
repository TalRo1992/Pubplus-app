
import React, { useState, useRef, useEffect } from 'react';
import { MultiSelectCheckboxProps } from '../../types/base';

const MultiSelectCheckbox: React.FC<MultiSelectCheckboxProps> = ({ items, onChange }) => {
    const [selectedItems, setSelectedItems] = useState<string[]>(items);
    const [originalItems, setOriginalItems] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if(!originalItems.length){
        setOriginalItems(items)
      }
    }, [items])

  const handleCheckboxChange = (item: string) => {
    const updatedSelection = selectedItems.includes(item)
      ? selectedItems.filter((selectedItem) => selectedItem !== item)
      : [...selectedItems, item];

    setSelectedItems(updatedSelection);
    onChange(updatedSelection);
  };

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setSelectedItems(items)
  }, [items])

  return (
    <div ref={containerRef} className="multiselect-container">
      <div className="multiselect-input" onClick={handleInputClick}>
        {isOpen ? 'Close' : 'Filter By Status'}
      </div>
      {isOpen && (
        <div className="multiselect-list">
          {originalItems.map((item:string) => (
            <label key={item}>
              <input
                type="checkbox"
                value={item}
                checked={selectedItems.includes(item)}
                onChange={() => handleCheckboxChange(item)}
              />
              {item}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectCheckbox;
