import React, { useState } from 'react';
import { IoMdMenu } from 'react-icons/io';
import ReusableModal from './ReusableModal';
import { auth } from '../firebase'; // Import your Firebase configuration
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const HeaderNav = () => {
  const [open, setOpen] = useState(false);
  const [studentNumber, setStudentNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentBirthday, setStudentBirthday] = useState('');
  const [error, setError] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Example authentication process, replace with your actual logic
      const userCredential = await auth.signInWithEmailAndPassword(
        `${studentNumber}@example.com`, // Example email format
        studentBirthday // Using birthday as password
      );
      console.log('Signed in as:', userCredential.user);
      handleClose(); // Close modal on successful sign-in
    } catch (error) {
      setError('Authentication failed. Please check your credentials.');
    }
  };

  return (
    <header className='fixed top-0 w-full z-10'>
      <nav className='w-full flex justify-between items-center px-10 py-1 md:px-[30px] bg-white bg-opacity-70'>
        <img src="/images/yellow-logo.png" alt="" className='h-[50px] my-[10px]' />
        <IoMdMenu className='flex md:hidden text-black text-[30px] cursor-pointer' />
        <ul className='md:flex gap-[15px] hidden'>
          <li>
            <a href='#' className='text-blue-500 font-bold text-[18px]'>Home</a>
          </li>
          <li>
            <a href='#' className='text-blue-500 font-bold text-[18px]'>Officers</a>
          </li>
          <li>
            <div onClick={handleOpen} className='cursor-pointer text-blue-500 font-bold text-[18px]'>Login</div>
          </li>
        </ul>
      </nav>

      <ReusableModal 
        open={open} 
        handleClose={handleClose} 
        title='Are you a techno student?'
      >
        <form onSubmit={handleSignIn}>
          <TextField
            id='studentNumber'
            label='Student Number'
            type='text'
            fullWidth
            margin='normal'
            variant='outlined'
            value={studentNumber}
            onChange={(e) => setStudentNumber(e.target.value)}
            required
          />
          <TextField
            id='studentName'
            label='Student Name'
            type='text'
            fullWidth
            margin='normal'
            variant='outlined'
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
          <TextField
            id='studentBirthday'
            label='Student Birthday'
            type='date'
            fullWidth
            margin='normal'
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            value={studentBirthday}
            onChange={(e) => setStudentBirthday(e.target.value)}
            required
          />
          {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </form>
        <div className='mt-3'>
          {/* continue as a guest message */}
          <p>
            Continue as a guest?{' '}
            <a href='#' className='mt-3 text-blue-500 font-bold'>Click here</a>
          </p>
        </div>
      </ReusableModal>
    </header>
  );
};

export default HeaderNav;
