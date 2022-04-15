import React, {useEffect} from 'react';

const Card = ({index, imgSrc, selected, completed, selectImage, photoSize, imageSelectedCount}) => {

  const styles = {
    width: photoSize,
    height: photoSize,
    background: selected || completed ? `url(${imgSrc})` : "gray",
  }

  function handleClick() {
    imageSelectedCount !== 2 ? selectImage(index, selected, completed) : console.log("E");
  }

  useEffect(() => {

  }, [selected])

  return (
    <div style={styles} className="card" onClick={handleClick}>
    </div>
  );
};

export default Card;