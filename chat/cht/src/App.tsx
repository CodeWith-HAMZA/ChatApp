import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignInCard from "./Components/Auth/SignInCard";
import SignupCard from "./Components/Auth/SignupCard";
import ChatBox from "./Components/Chat/ChatBox";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "./firebaseconfig";
import AuthContext from "./Context/AuthContext";
import Alert from "./Components/Alert";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Practice from "./Practice";

interface Props {
  children: JSX.Element;
}

function App() {
  const [User, setUser] = useState<object | null>(null);
  const [ShowAlert, setShowAlert] = useState(false);
  const [AlertColor, setAlertColor] = useState<string>("");
  const [AlertType, setAlertType] = useState<string>("");
  const [AlertMessage, setAlertMessage] = useState<string>("");

  const ProtectedRoute: React.FC<Props> = ({ children }: Props): JSX.Element =>
    User ? children : <Navigate to="/signup" />;

  const showAlert = (
    givenColor: string,
    givenType: string,
    givenMessage: string
  ) => {
    setAlertColor(givenColor);
    setAlertType(givenType);
    setAlertMessage(givenMessage);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 8000);
  };

  const fetchMessages_BetweenBothUsers = async (givenCombinedID: string) => {
    // TODO SORT-BY-DATE
    const q = query(
      collection(db, "_Chats"),
      where("combinedID", "==", givenCombinedID)
    ); // * Filtering Docs

    // * Fetched Contact-Items
    const AllMessages = await getDocs(q);

    setAlertMessage(AllMessages?._snapshot?.docChanges);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (userData) => {
      // * Setting state with user's  Account Related-Data
      setUser(userData);

      console.log(userData, "hohoho");
      showAlert("green", "Success", "Page Reloaded Successfully ");
    });

    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          User,
          setUser,
          showAlert,
          setShowAlert,
          fetchMessages_BetweenBothUsers,
        }}
      >
        {/* <Link to={"/"}>Go To Your Chats {">"}</Link> */}
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <ChatBox />
                </ProtectedRoute>
              }
            />
            <Route path="/signin" element={<SignInCard />} />
            <Route path="/signup" element={<SignupCard />} />
            <Route path="/practice" element={<Practice />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
