import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import '../src/styles/Header.css'
import logo from '../src/assets/linkedin-logo-2430.svg'
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import MessageIcon from '@mui/icons-material/Message';
import HeaderOption from './HeaderOption';
import { useDispatch } from 'react-redux';
import {auth} from './Firebase1.js'
import {logout} from './features/userSlice.js'

const Header = () => {
  
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    dispatch(logout());
    await auth.signOut();
  };
  return (
    <div className='header'>
            <div className='header__left'>
                <img src={logo} alt="" />
                    <div className="header__search">
                        {/* Search icon */}
                        <SearchIcon/>
                        <input type="text" />
                    </div>

            </div>
            <div className='header__right'> 
                <HeaderOption Icon = {HomeIcon} title="Home"/>
                <HeaderOption Icon = {SupervisorAccountIcon} title="My Network"/>
                <HeaderOption Icon = {BusinessCenterIcon} title="Jobs"/>
                <HeaderOption Icon = {NotificationsIcon} title="Notification"/>
                <HeaderOption title="Me" onClick={logoutHandler} avatar={true}  />
            </div>
    </div>
  )
}

export default Header
