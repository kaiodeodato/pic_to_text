import React,{useState,useEffect} from 'react';
import { supabase } from './supabase';
import Tesseract from 'tesseract.js';
import LoadingBar from 'react-top-loading-bar'
import { nanoid } from 'nanoid';

import './App.css';


function App() {

  const[url,setUrl] = useState("")
  const[text,setText] = useState("")
  const[avatar,setAvatar] = useState("")
  const[canClick,setCanClick] = useState(true)
  const[progress,setProgress] = useState(0)

  useEffect(()=>{
    setAvatar(url)
  },[url])

  const handleChange = async (e)=>{

    const avatarFile = e.target.files[0]
    const { data, error } = await supabase
    .storage
    .from('images')
    .upload('file', avatarFile, {
      cacheControl: '1',
      upsert: true
    })
    CountDown()
  }

  const handlePic = async ()=>{


    const dataPic = await supabase
    .storage
    .from('images')
    .getPublicUrl('file')
    setUrl(dataPic.data.publicUrl)
  }

  const handleWrite = async ()=>{


    console.log('write')
  Tesseract.recognize(
    url,
    'eng',
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    setText(text)
  })
  }

  function CountDown(){
    setCanClick(false)
    setTimeout(()=>{
      setProgress(100)
    },100)

    setTimeout(()=>{
      setCanClick(true)
      setProgress(0)
    },18000)
  }


  //colocando imagem na box



  return (
    <div className="App">

      <LoadingBar
        waitingTime="18000"
        loaderSpeed="18000"
        color='#02D35E'
        progress={progress}
        onLoaderFinished={() => handlePic()}
      />

      <div className='box_imagem'>
        <img src={url}  />
      </div>
      <input onChange={handleChange} className='input_file' type="file" />
      <div style={{display:"flex"}}>
        <button  
        className={canClick ? "" : "disable_class"}
        disabled={canClick ? false : true}
        onClick={handleWrite}>
          
          WRITE
        
        </button>
      <button onClick={()=> window.location.reload()}>CLEAR</button>
      </div>
      <textarea onChange={(e) => setText((prevText)=> e.target.value)}  
      className='textarea_class' 
      name="text" id="" 
      cols="38" 
      rows="19" 
      value={text}/>
    </div>
  );
}

export default App;

