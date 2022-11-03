import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Lottie from "lottie-react";
import animatedBot from '../assets/animated-bot.json'

import "./container.css";
import styles from './button.module.css';
import inputStyles from './input.module.css';

export const Container = () =>{

  const [showMusic, setShowMusic] = useState(false);
  const [showBan, setShowBan]=useState(false);
  const [flirt,setFlirt]=useState(false);
  const [meme,setMeme]=useState(false);

  // const music=

  const ban=[
    {category:"ban"},
    {category:"unban"}
  ]

  const music=[
    {category:"play"},
    {category:"playskip"},
    {category:"playtop"},
  ];


  const [musicCategories, setMusicCategories] = useState(music);

  useEffect(() => {
    console.log(musicCategories)
  }, [])
  
  const [banCategories,setBanCategories]=useState(ban);

  const changeMusicState=()=>{
    setShowMusic(!showMusic);
  }

  const changeBanCategories=()=>{
    setShowBan(!showBan);
  }

  const flirtOrNot=()=>{
    setFlirt(!flirt);
  }

  const showMeme=()=>{
    setMeme(!meme);
  }

  const closeInput=(index)=>{
    console.log("index")
    // const dupCat=[...musicCategories];
    // dupCat.splice(index);
    console.log(index);
    // setMusicCategories(dupCat);
  }

  return (
    <>
    <h1 className="heading">
      create-a-bot
    </h1>
    <form action="http://localhost:3000/get-commands" method="post">
    <div className="welcome">
      <div className="wlI">
    <input type="input" class="form__field" placeholder="Bot Name" name="bot-name" id='name' required />
    <input type="input" class="form__field" placeholder="Server Name" name="server-name" required />
    </div>
    <div className="create-a-bot">  

    {/* <div class="form_g">
      <input type="input" class="form__field" placeholder="Bot Name" name="name" required />
      <input type="input" class="form__field" placeholder="Sever Name" name="name" id='name' required />
    </div> */}

      <img src="https://i.pinimg.com/originals/f6/d7/ef/f6d7ef4b5b015be7cf607e2087c0a244.png" alt="" />
     </div>
     </div>

     <div class={styles.container}>
        <div class={styles.btn} onClick={changeMusicState}><a href="#">MUSIC</a></div>  
        <div class={styles.btn} onClick={changeBanCategories}><a href="#">BAN</a></div>  
        <div class={styles.btn}><a href="#">FLIRT</a></div>  
        <div class={styles.btn}><a href="#">MEME</a></div>  
    </div>

      {
        showMusic && musicCategories.map((singleCategory,index)=>{
          return <div key={index} className="categories">
            <input type="text" name="command" value={singleCategory.category}/>

            <div class={inputStyles.webflow}>
              <input class="" type="text" name="desc" placeholder="Enter the command"></input>
              
            </div>
            <button className="cls close black pointy" onClick={closeInput(index)}></button>
          </div>
        })
      }
      {
        showBan && banCategories.map((singleCategory,index)=>{
          return <div key={index} className="categories">
          <input type="text" name="command" value={singleCategory.category}/>

          <div class={inputStyles.webflow}>
            <input class="" type="text" name="desc" placeholder="Enter the command"></input>
            
          </div>
          <button className="cls close black pointy" onClick={closeInput(index)}></button>
        </div>
        })
      }
      <button class={styles.an2} type="submit" href="#">
        {/* <span></span>
        <span></span>
        <span></span>
        <span></span> */}
        SUBMIT
        
    </button>
    </form>
    </>
  );
}
