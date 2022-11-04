import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

import "./container.css";
import styles from './button.module.css';
import inputStyles from './input.module.css';

export const Container = () =>{
  const navigate = useNavigate();

  const goToHome=()=>{
    navigate(-1)
  }

  const [showMusic, setShowMusic] = useState(false);
  const [showBan, setShowBan]=useState(false);
  const [flirt,setFlirt]=useState(false);
  const [meme,setMeme]=useState(false);

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
  const [banCategories,setBanCategories]=useState(ban);
  const [loading,setLoading]=useState(false);
  const [results,showResults] = useState(false);


  const changeMusicState=(e)=>{
    e.preventDefault()
    setShowMusic(!showMusic);
    
  }

  const changeBanCategories=(e)=>{
    e.preventDefault()
    setShowBan(!showBan);
  }

  const flirtOrNot=()=>{
    setFlirt(!flirt);
  }

  const showMeme=()=>{
    setMeme(!meme);
  }

  const viewResult=async ()=>{
      showResults(false);
      setLoading(true);
      setTimeout(()=>setLoading(false),1500);
      showResults(true);
  }
 

  const saveFormData=async(e)=>{
    e.preventDefault()
    // const data;
    const data={
      bot_name:"",
      server_name:"",
      command:[],
      desc:[]
    };
    console.log("getting form data........")
    const form = document.getElementById('my_form');
    const formData = new FormData(form);
    

    for (const [key, value] of formData) {
      if(key=="bot_name")data[key]=value
      if(key=="server_name")data[key]=value;
      if(key=="command")data[key].push(value);
      if(key=="desc")data[key].push(value);
    }

    console.log(data)

    const endpoint="http://localhost:5000/save-bot";


    const response = await fetch(endpoint, {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
        // "x-access-token": "token-value",
      },
      body: JSON.stringify(data) 
    });

  
    console.log("success")

    const getAllServers= await fetch("http://localhost:5000/get-bot",{
      method:"get"
    })
    const resp=await getAllServers.json();
    
    viewResult();
  }

  return (
    <>
    {/* <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script> */}

    <i class='fas fa-chevron-left back' style={{fontSize:"48px",color:"white",fontWeight:"bolder",background:"transparent"}} onClick={goToHome}></i>
    <h1 className="heading">
      create-a-bot
    </h1>
    <form action="#" id="my_form" >
    <div className="welcome">
      <div className="wlI">
    <input type="input" class="form__field" placeholder="Bot Name" name="bot_name" id='name' required />
    <input type="input" class="form__field" placeholder="Server Name" name="server_name" required />
    </div>
    <div className="create-a-bot">  


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
            <input type="text" name="command" value={singleCategory.category} readonly/>

            <div class={inputStyles.webflow}>
              <input class="" type="text" name="desc" placeholder="Enter the command"></input>
              
            </div>
            {/* <button className="cls close black pointy" onClick={closeInput(index)}></button> */}
          </div>
        })
      },
      {
        showBan && banCategories.map((singleCategory,index)=>{
          return <div key={index} className="categories">
          <input type="text" name="command" value={singleCategory.category} readonly/>

          <div class={inputStyles.webflow}>
            <input class="" type="text" name="desc" placeholder="Enter the command"></input>
            
          </div>
          {/* <button className="cls close black pointy" onClick={closeInput(index)}></button> */}
        </div>
        })
      }
      <button class={styles.an2} onClick={saveFormData} href="#">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        SUBMIT
        
    </button>
    </form>
    {
      loading && <Spinner/>
    }
    {
      results && <div>
        <a href="https://discord.com/api/oauth2/authorize?client_id=1036664574851698720&permissions=4398046511095&scope=bot" className="finalLink">Add Bot</a>
      </div>
    }
    </>
  );
}
