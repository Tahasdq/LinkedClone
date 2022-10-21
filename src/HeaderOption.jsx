import { Avatar } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import "./styles/HeaderOption.css"


const HeaderOption = ({ avatar, Icon , title ,onClick}) => {
  const userState = useSelector(selectUser);
  const{user} = userState;
  console.log(user)
  // console.log(isEmptyObject(user)); 
  return (
    <div className='headerOption' onClick={onClick}>
      {Icon && <Icon  className ="headerOption__icon"/>}
      
      
      { avatar && (<Avatar
          className="headerOption__icon"
          // style={{ fontSize: "10px" }}
        >
          {!user ? "sample Email" :user.email[0].toUpperCase()
          }
        </Avatar>)
      }
        
      
      <h3 className='headerOption__title'>{title}</h3>
    </div>
  )
}

export default HeaderOption
