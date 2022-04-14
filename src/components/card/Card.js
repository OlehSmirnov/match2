import React from 'react';

const Card = ({imgSrc, isDuplicate, selected, setSelected}) => {

  return (
    <div className="card" onClick={() => console.log(isDuplicate)}>
      <img src={imgSrc} alt=""/>
    </div>
  );
};

export default Card;