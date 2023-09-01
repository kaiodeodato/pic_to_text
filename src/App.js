import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import LoadingBar from 'react-top-loading-bar';
import axios from 'axios'; 
import './App.css';

const apiKey = process.env.REACT_APP_SUA_API_KEY_DO_IMGBB;

function App() {  
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [canClick, setCanClick] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleChange = async (e) => {
    console.log(e.target.files[0])
    const avatarFile = e.target.files[0];

    // Faça o upload da imagem para o ImgBB
    const formData = new FormData();
    formData.append('image', avatarFile);

    try {
      const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          key: apiKey,
        },
      });

      const imageUrl = response.data.data.url;
      setUrl(imageUrl);
      CountDown();
    } catch (error) {
      console.error('Erro no upload da imagem:', error);
    }
  }

  const handlePic = async () => {
    handleWrite()
  }

  const handleWrite = async () => {
    console.log('project update')
    Tesseract.recognize(
      url,
      'eng',
      { logger: (m) => console.log(m) }
    ).then(({ data: { text } }) => {
      setText(text);
    });
  }

  function CountDown() {
    setCanClick(false);
    setTimeout(() => {
      setProgress(100);
    }, 100);

    setTimeout(() => {
      setCanClick(true);
      setProgress(0);
    }, 18000);
  }

  return (
    <div className="App">
      <LoadingBar
        waitingTime="18000"
        loaderSpeed="18000"
        color="#02D35E"
        progress={progress}
        onLoaderFinished={() => handlePic()}
      />

      <div className="box_imagem">
        <img src={url} alt="Imagem" />
      </div>
      <input onChange={handleChange} className="input_file" type="file" />
      <div style={{ display: "flex" }}>
        <button
          className={canClick ? "" : "disable_class"}
          disabled={canClick ? false : true}
          onClick={handleWrite}
        >
          WRITE
        </button>
        <button onClick={() => window.location.reload()}>CLEAR</button>
      </div>
      <textarea
        onChange={(e) => setText(e.target.value)}
        className="textarea_class"
        name="text"
        id=""
        cols="38"
        rows="19"
        value={text}
      />
    </div>
  );
}

export default App;





