import React from "react";
import memesData from "../../memesData";
export default function Meme() {
  //   const [memeImage, setMemeImage] = React.useState("");

  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = React.useState([]);

  React.useEffect(() => {
    fetch(`https://api.imgflip.com/get_memes`)
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  function getMemeImage() {
    // const memesArray = allMemeImages.data.memes;
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const imageUrl = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: imageUrl,
    }));
  }
  return (
    <div className="meme-inputs">
      <input
        type="text"
        placeholder="Top text"
        name="topText"
        value={meme.topText}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Bottom text"
        name="bottomText"
        value={meme.bottomText}
        onChange={handleChange}
      />
      <button className="submit-btn" onClick={getMemeImage}>
        Get a new meme image 🖼
      </button>
      <div className="meme">
        <img src={meme.randomImage} alt="Meme Image" className="meme-image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </div>
  );
}
