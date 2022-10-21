import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Widgets from './Widgets.jsx'
import Login from './Login.jsx'
import Feed from './Feed.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './Firebase1';

function App() {
  const userState = useSelector(selectUser);
  const { user } = userState;
  
  const dispatch = useDispatch()
  useEffect(()=>{
    auth.onAuthStateChanged((userAuth)=>{
      //user is logged in 
      if(userAuth){
          dispatch(login({
            email:userAuth.user.email,
            uid:userAuth.user.uid,
            displayName:userAuth.displayName,
            photoUrl:userAuth.profilePic
          }))
      }
      //user is logged out 
      else{
          dispatch(logout())
      }
    })
  },[])
  return (
    <div className="app">

      {/* Header portion */}
      <Header/>
      {
        !user ? <Login/> :(
          <div className="app__body">

          {/* Sidebar */}
          <Sidebar/>
          {/* Feed */}
          <Feed/>
          {/* Widgets */}
          <Widgets/> 
      </div>
        )
      }
      {/* App body */}
      
       </div>
  );
}

export default App;
