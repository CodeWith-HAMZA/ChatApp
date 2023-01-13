import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { Link, Navigate, Route, Routes } from "react-router-dom"
import './App.css'
import SignInCard from './Components/Auth/SignInCard';
import SignupCard from './Components/Auth/SignupCard';
import ChatBox from './Components/Chat/ChatBox';


import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from './firebaseconfig';
import AuthContext from './Context/AuthContext';
import Alert from './Components/Alert';


function App() {
  const [User, setUser] = useState<object | null>(null);

  const ProtectedRoute: React.FC = ({ children }: any): JSX.Element => User ? children : <Navigate to="/signup" />;

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (userData) => {

      // * Setting state with user's  Account Related-Data
      setUser(userData);

      console.log(userData, "hohoho")
    });
    return () => {
      unSubscribe();
    }
  }, [])

  return (<>
    <AuthContext.Provider value={{ User, setUser }}>
      <Link to={"/"}>Go To Your Chats</Link>
      <Routes>
        <Route path='/'>

          <Route index element={
            <ProtectedRoute>
              <ChatBox />
            </ProtectedRoute>

          } />
          <Route path='/signin' element={<SignInCard />} />
          <Route path='/signup' element={<SignupCard />} />
          <Route path='/alert' element={<Alert  variant='info' text='Message' />} />
        </Route>

      </Routes>
    </AuthContext.Provider>

  </>
  )
}

export default App
