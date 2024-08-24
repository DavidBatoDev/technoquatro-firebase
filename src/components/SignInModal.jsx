import React, {useState} from 'react'
import ReusableModal from './ReusableModal'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

const SignInModal = ({open, handleClose}) => {
    const [studentNumber, setStudentNumber] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentBirthday, setStudentBirthday] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
          console.log('Signed in as:', studentNumber, studentName, studentBirthday);
          handleClose();
        } catch (error) {
          setError('Authentication failed. Please check your credentials.');
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
