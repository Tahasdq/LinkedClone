import { auth } from './Firebase1.js'
import { login } from './features/userSlice'
// import firebase from 'firebase/auth'
// import 'firebase/auth';
import React, { useState } from 'react'
import './styles/login.css'
import { useDispatch } from 'react-redux'
const Login = () => {
  const[email , setEmail] = useState("")
  const[password , setPassword] = useState("")
  const[name , setName] = useState("")
  const[profilePic , setProfilePic] = useState("")
  const dispatch = useDispatch();

  const register=()=>{
    if (!name) {
      return alert("please enter your name")      
      
    }
    auth.createUserWithEmailAndPassword(email,password)
    .then((res)=>{
      // console.log(res.user)
      res.user.updateProfile({
        displayName: name,
        photoUrl: profilePic
      }).then(()=>{

        dispatch(login({
                  email:res.user.email,
                  uid:res.user.uid,
                  displayName:name,
                  photoUrl:profilePic
        }))
      })
      
    }).catch((error)=>error.message)
    // let userAuth
    // console.log("userAuth consoled " + userAuth.user)
    // userAuth.user.updateProfile({
    //   displayName: name,
    //   photoUrl: profilePic
    // });
      
    // dispatch(login({
    //         email:userAuth.user.email,
    //         uid:userAuth.user.uid,
    //         displayName:name,
    //         photoUrl:profilePic
    //       })).catch(error=>alert(error))
      
  }
  const loginToApp=(e)=>{
    e.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .then((userAuth)=>{
      dispatch(
        login({
          email:userAuth.user.email,
          uid:userAuth.user.uid,
          displayName:userAuth.user.displayName,
          profileUrl:userAuth.user.photoURL
        })
      )
    }).catch((error)=>alert(error))
  }
  return (
    <div  className='login'>
      <img
        src="https://news.hitb.org/sites/default/files/styles/large/public/field/image/500px-LinkedIn_Logo.svg__1.png"
        alt="Linkedin main logo"
      />
      <form action="" >
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  placeholder='Full name required'/>
        <input type="text" value={profilePic} onChange={(e)=>setProfilePic(e.target.value)}    placeholder='profile pic Url (optional)'/>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email'/>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='enter password here'/>
        <button type="submit"  onClick={loginToApp} >
          Sign In
        </button>
        <p>
        Not a member?{" "}
        <span className="login__register" onClick={register}  >
          Register Now
        </span>
      </p>
      </form>
    </div>
  )
}

export default Login
