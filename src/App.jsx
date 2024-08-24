import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from './firebase';
import {
  setUserData,
} from './redux/userSlice/userSlice';
import { useDispatch } from 'react-redux';
import {getDoc, doc} from 'firebase/firestore';

function App() {
  const dispatch = useDispatch();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        return dispatch(setUserData(null));
      }
      dispatch(setUserData(userDoc.data()));
    } else {
      dispatch(setUserData(null));
    }
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/feed' element={<h1>Feed</h1>} />
      </Routes>
    </Router>
  )
}

export default App
