import React, {useState} from 'react'
import ReusableModal from './ReusableModal'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useSelector } from 'react-redux'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {
    loginStart,
    loginSuccess,
    loginFailure,
} from '../redux/userSlice/userSlice'
import { auth, db } from '../firebase'
import { useDispatch } from 'react-redux'
import { getDoc, doc } from 'firebase/firestore'


const SignInModal = ({open, handleClose}) => {
    const dispatch = useDispatch();
    const [studentNumber, setStudentNumber] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentBirthday, setStudentBirthday] = useState('');
    const { error } = useSelector((state) => state.user);
  
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            if (!studentNumber || !studentName || !studentBirthday) {
                return dispatch(loginFailure('Please fill in all fields'));
            }
            const studentEmail = `${studentNumber}@example.com`;
            dispatch(loginStart());
            const userCredential = await signInWithEmailAndPassword(auth, studentEmail, studentBirthday);
            const user = userCredential.user
            if (!user) {
                return dispatch(loginFailure('Invalid credentials'));
            }
            // get the user data from the database
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (!userDoc.exists()) {
                return dispatch(loginFailure('User not found'));
            }
            dispatch(loginSuccess(userDoc.data()));
            handleClose();
        } catch (error) {
            console.log('Error signing in:', error);
            dispatch(loginFailure(error.message));
        }
      };

  return (
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
          <p>
            Continue as a guest?{' '}
            <a href='#' className='mt-3 text-blue-500 font-bold'>Click here</a>
          </p>
        </div>
      </ReusableModal>
  )
}

export default SignInModal
