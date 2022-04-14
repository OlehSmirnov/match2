import './App.css';
import {useEffect, useState} from "react";
import Card from "../card/Card";

function App() {
  const [images, setImages] = useState([{}]);

  const NUMBER_OF_IMAGES = 8;

  useEffect(() => {
    fillArray();
  }, []);

  async function fillArray() {
    try {
      const allImages = [];
      for (let i = 0; i < NUMBER_OF_IMAGES; i++) {
        const res = await fetch("https://picsum.photos/200");
        const blob = await res.blob();
        const imgObject = {
          imgSrc: URL.createObjectURL(blob),
          selected: false,
          isDuplicate: false
        }
        allImages.splice(getRandomNumber(), 0, imgObject);
        allImages.splice(getRandomNumber(), 0, {...imgObject, isDuplicate: true});
        console.log(allImages);
      }
      setImages(allImages);
    } catch (error) {
      console.error(error)
    }
  }

  function getRandomNumber() {
    return Math.floor(Math.random() * NUMBER_OF_IMAGES * 2)
  }

  function setSelected(isDuplicate, imgSrc) {
    console.log(images.find((el) => el.imgSrc));
  }

  const cards = images.map((img, index) => {
    return <Card
      key={index}
      imgSrc={img.imgSrc}
      selected={img.selected}
      isDuplicate={img.isDuplicate}
      setSelected={setSelected}/>
  });

  return (
    <div className="App">
      {cards}
    </div>
  );
}

export default App;
