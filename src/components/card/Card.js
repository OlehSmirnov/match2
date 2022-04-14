import React, {useEffect} from 'react';

const Card = ({index, imgSrc, isDuplicate, selected, selectImage, photoSize}) => {

  const styles = {
    width: photoSize,
    height: photoSize,
    background: selected ? `url(${imgSrc})` : "gray",
  }

  useEffect(() => {

  }, [styles])

  return (
    <div style={styles} className="card"
         onClick={() => selectImage(index)}>
    </div>
  );
};

export default Card;