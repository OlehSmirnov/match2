import './App.css';
import "animate.css";
import LoadingSpinner from "react-loading-spin";
import {useEffect, useState} from "react";
import Card from "../card/Card";

function App() {
  const [images, setImages] = useState([{}]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [isOneImageSelected, setIsOneImageSelected] = useState(false);

  const NUMBER_OF_IMAGES = 8;
  const photoSize = Math.floor(window.innerWidth / 8);

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
          isDuplicate: false
        }
        allImages.splice(getRandomNumber(), 0, imgObject);
        allImages.splice(getRandomNumber(), 0, {...imgObject, isDuplicate: true});
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

  function selectImage(index) {
    if (isOneImageSelected) {
      return console.log("Already selected");
    }
    setIsOneImageSelected(true)
    setImages(prevImages => prevImages.map(img => {
      return prevImages.indexOf(img) === index ? {...img, selected: true} : img;
    }))
  }

  function showCards() {
    return images.map((img, index) => {
      return <Card
        photoSize={photoSize}
        key={index}
        index={index}
        imgSrc={img.imgSrc}
        selected={img.selected}
        isDuplicate={img.isDuplicate}
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
