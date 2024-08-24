import React, { useState } from 'react';
import { IoMdMenu } from 'react-icons/io';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SignInModal from './SignInModal';
import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const HeaderNav = () => {
  const [signInOpen, setSignInOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {user} = useSelector(state => state.user);

  const handleOpen = () => {
    setSignInOpen(true);
  };

  const handleClose = () => {
    setSignInOpen(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = () => {
    let authenticationState = 'Login';
    if (user?.email) {
      authenticationState = 'Logout';
    }

    const handleLogout = async () => {
      try {
        await signOut(auth);
        handleClose();
      } catch (error) {
        console.log('Error signing out:', error);
      }
    }

    const handleOnClick = (text) => {
      if (text === 'Login') {
        handleOpen();
      } else if (text === 'Logout') {
        handleLogout();
      }
    }

    return (
      <List sx={{ width: 250 }}>
        {['Home', 'Officers', authenticationState].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleOnClick(text)}>
              <ListItemText className='font-semibold' primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    )
  };

  return (
    <header className='fixed top-0 w-full z-10'>
      <nav className='w-full flex justify-between items-center px-10 py-1 md:px-[30px] bg-white bg-opacity-70'>
        <img src="/images/yellow-logo.png" alt="" className='h-[50px] my-[10px]' />
        <IoMdMenu className='flex md:hidden text-black text-[30px] cursor-pointer' onClick={toggleDrawer(true)} />
        <ul className='md:flex gap-[15px] hidden'>
          <li>
            <a href='#' className='text-blue-500 font-bold text-[18px]'>Home</a>
          </li>
          <li>
            <a href='#' className='text-blue-500 font-bold text-[18px]'>Officers</a>
          </li>
          {user?.email ? (
            <li>
              <a href='#' className='text-blue-500 font-bold text-[18px]'>Logout</a>
            </li>
          ) :
          (
            <li>
              <div onClick={handleOpen} className='cursor-pointer text-blue-500 font-bold text-[18px]'>Login</div>
            </li>
          )}
        </ul>
      </nav>

      <SwipeableDrawer
        anchor='right'
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }
        }}
      >
        {drawerList()}
      </SwipeableDrawer>

      {/* Modal for signin */}
      <SignInModal open={signInOpen} handleClose={handleClose} />
    </header>
  );
};

export default HeaderNav;
