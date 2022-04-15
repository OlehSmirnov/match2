import './App.css';
import "animate.css";
import LoadingSpinner from "react-loading-spin";
import {useEffect, useState} from "react";
import Card from "../card/Card";

function App() {
  const [images, setImages] = useState([{}]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [imageSelectedCount, setImageSelectedCount] = useState(0);
  const [indexOfFirstOpenImage, setIndexOfFirstOpenImage] = useState(null);

  const NUMBER_OF_IMAGES = 8;
  const photoSize = Math.floor(window.innerWidth / 8.5);

  useEffect(() => {
    fillArray();
  }, []);

  async function fillArray() {
    try {
      setShowSpinner(true);
      const allImages = [];
      for (let i = 0; i < NUMBER_OF_IMAGES; i++) {
        const res = await fetch(`https://picsum.photos/${photoSize}`);
        const blob = await res.blob();
        const imgObject = {
          imgSrc: URL.createObjectURL(blob),
          selected: false,
          completed: false
        }
        allImages.splice(getRandomNumber(), 0, imgObject);
        allImages.splice(getRandomNumber(), 0, imgObject);
      }
      setImages(allImages);
      setShowSpinner(false);
    } catch (error) {
      console.error(error);
    }
  }

  function getRandomNumber() {
    return Math.floor(Math.random() * NUMBER_OF_IMAGES * 2);
  }

  function selectImage(indexOfSelected, selected, completed) {
    if (selected || completed) return;
    setImages(prevImages => prevImages.map((img, currentIndex) => {
      return currentIndex === indexOfSelected ? {...img, selected: true} : img;
    }));
    setImageSelectedCount(1);
    setIndexOfFirstOpenImage(indexOfSelected);
    if (imageSelectedCount === 1) {
      setImageSelectedCount(2);
      if (images[indexOfSelected].imgSrc === images[indexOfFirstOpenImage].imgSrc) {
        setTimeout(() => updateImages(indexOfSelected, true), 500);
      } else {
        setTimeout(() => updateImages(indexOfSelected, false), 500);
      }
    }
  }

  function updateImages(indexOfSelected, isMatch) {
    if (isMatch) {
      setImages(prevImages => prevImages.map((img, currentIndex) => {
        return indexOfSelected === currentIndex ? {...img, completed: true} : img;
      }));
    } else {
      setImages(prevImages => prevImages.map((img, currentIndex) => {
        return currentIndex === indexOfSelected || currentIndex === indexOfFirstOpenImage ? {
          ...img,
          selected: false
        } : img;
      }));
    }
    setImageSelectedCount(0);
  }

  function showCards() {
    return images.map((img, index) => {
      return <Card
        photoSize={photoSize}
        key={index}
        index={index}
        imgSrc={img.imgSrc}
        selected={img.selected}
        completed={img.completed}
        imageSelectedCount={imageSelectedCount}
        selectImage={selectImage}/>
    });
  }

  return (
    <>
      {showSpinner &&
        <div>
          <LoadingSpinner/>
          <h1>Loading images...</h1>
        </div>
      }
      <div className="App animate__fadeIn animate__animated">
        {!showSpinner && showCards()}
      </div>
    </>
  );
}
export default App;
