import './App.css';
import "animate.css";
import LoadingSpinner from "react-loading-spin";
import {useEffect, useState} from "react";
import Card from "../card/Card";
import ReactCanvasConfetti from "react-canvas-confetti";

function App() {

  const NUMBER_OF_IMAGES = 8;
  const BEST_SCORE_KEY = "BEST_SCORE";
  const photoSize = Math.floor(window.innerWidth / (NUMBER_OF_IMAGES * 1.25));

  const [images, setImages] = useState([{}]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [imageSelectedCount, setImageSelectedCount] = useState(0);
  const [indexOfFirstOpenImage, setIndexOfFirstOpenImage] = useState(null);
  const [numberOfTurns, setNumberOfTurns] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const [currentBestScore, setCurrentBestScore] = useState(() => JSON.parse(localStorage.getItem(BEST_SCORE_KEY)) || 0);
  const [fireConfettiSwitch, setFireConfettiSwitch] = useState(0);

  useEffect(() => {
    fillArray();
  }, []);

  useEffect(() => {
    if (isWin && (currentBestScore > numberOfTurns || currentBestScore === 0)) {
      localStorage.setItem(BEST_SCORE_KEY, JSON.stringify(numberOfTurns));
      setCurrentBestScore(numberOfTurns);
    }
  }, [isWin])

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
      setNumberOfTurns(prevNumber => prevNumber + 1);
      setImageSelectedCount(2);
      if (images[indexOfSelected].imgSrc === images[indexOfFirstOpenImage].imgSrc) {
        updateImages(indexOfSelected, true);
      } else
        setTimeout(() => updateImages(indexOfSelected, false), 1000);
    }
  }

  function updateImages(indexOfSelected, isMatch) {
    if (isMatch) {
      const newArr = images.map((img, currentIndex) => {
        return currentIndex === indexOfSelected || currentIndex === indexOfFirstOpenImage ? {
          ...img,
          completed: true
        } : img;
      });
      setImages(newArr);
      checkWin(newArr);
    } else {
      setImages(prevImages => prevImages.map((img, currentIndex) => {
        return currentIndex === indexOfSelected || currentIndex === indexOfFirstOpenImage ? {
          ...img,
          selected: false
        } : img;
      }));
    }
    setIndexOfFirstOpenImage(null);
    setImageSelectedCount(0);
  }

  function checkWin(arr) {
    if (arr.find(img => img.completed !== true) === undefined) {
      setIsWin(true);
      setInterval(() => setFireConfettiSwitch(prevNumber => prevNumber + 1), 1000);
    }
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

  if (showSpinner) {
    return <div>
      <LoadingSpinner/>
      <h1>Loading images...</h1>
    </div>
  }

  return (
    <>
      <ReactCanvasConfetti className="confetti" fire={fireConfettiSwitch}/>
      <div className="app-grid">
        {showCards()}
      </div>
      <footer>
        <h1>Number of turns: {numberOfTurns}</h1>
        <h1>Best result: {currentBestScore}</h1>
        {isWin && <div>
          <h1>You won!</h1>
          <button onClick={() => window.location.reload()}><h2>Play again</h2></button>
        </div>}
      </footer>
    </>
  );
}

export default App;
