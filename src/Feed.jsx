import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import InputOption from "./InputOption.jsx";
import ImageIcon from "@mui/icons-material/Image";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import EventIcon from "@mui/icons-material/Event";
import ArticleIcon from "@mui/icons-material/Article";
import "./styles/Feed.css";
import Post from "./Post.jsx";
import firebase from "firebase";
import { db } from "./Firebase1.js";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice.js";
import FlipMove from 'react-flip-move'
const Feed = () => {
  const userState = useSelector(selectUser);
  const { user } = userState;
  const [input , setInput] = useState('')
  const [posts, setPosts] = useState([]);
  useEffect(()=>{

    db.collection('posts').orderBy('timestamp' , 'desc').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({
          id:doc.id,
          data:doc.data()
      })))  
    })
  },[])
  const sendPost = (e)=>{
    e.preventDefault()
    db.collection('posts').add({
      name:user.displayName,
      description:user.email,
      message:input,
      photoUrl:user.photoUrl || "",
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),

    })
    setInput("")
  }
  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input value={input} type= "text"  onChange={e=>setInput(e.target.value)} />
            <button onClick={sendPost} type="submit">Send</button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} color="#70BFF9" title="Photo" />
          <InputOption Icon={OndemandVideoIcon} color="#70BFF9" title="Video" />
          <InputOption Icon={EventIcon} color="#70BFF9" title="Event" />
          <InputOption
            Icon={ArticleIcon}
            color="#70BFF9"
            title="Write Article"
          />
        </div>
      </div>
      {/* Post */}
      <FlipMove>

      
      {
      posts.map(({id, data:{name , description ,message ,photoUrl}})=>
        {
          return(
        <Post
        key={id}
        name={name}
        description={description}
        message={message}
        photoUrl={photoUrl}

        /> )}
      )
    }
    </FlipMove>
      {/* <Post
      name="Taha siddique"
      description="Desciprion"
      message="Message goes here Lorem Ipsum is simply dummy text of the printing and typesetting industry
      Message goes here Lorem Ipsum is simply dummy text of the printing and typesetting industry
      Message goes here Lorem Ipsum is simply dummy text of the printing and typesetting industry
      Message goes here Lorem Ipsum is simply dummy text of the printing and typesetting industry Message goes here Lorem Ipsum is simply dummy text of the printing and typesetting industryMessage goes here Lorem Ipsum is simply dummy text of the printing and typesetting industry "
      /> */}
    </div>
  );
};

export default Feed;
