import React from 'react';
import { CardProps } from '../../types/base';

const Card: React.FC<CardProps> = ({ title, content, customClass }) => {
  return (
    <div className={`card ${customClass && customClass || ''}`}>
        <div className='card-header'>
            <h3 className='title'>{title}</h3>
        </div>
        <div className='card-content'>
          {content}
        </div>
    </div>
  );
};

export default Card;
