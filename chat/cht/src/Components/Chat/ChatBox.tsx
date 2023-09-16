import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebaseconfig";
import ChatBar from "./ChatBar";
import ContactsBar from "./ContactsBar";
import ChatRoom from "./ChatRoom";

const ChatBox = () => {
  const [SelectedUser, setSelectedUser] = useState("");
  const [CombinedId, setCombinedId] = useState("");

  return (
    <>
      <button onClick={() => signOut(auth)}>Logout</button>
      <ContactsBar
        setSelectedUser={setSelectedUser}
        SelectedUser={{ UID: { stringValue: SelectedUser } }}
      >
        <ChatRoom SelectedUser={SelectedUser}></ChatRoom>{" "}
      </ContactsBar>
      {/* <ChatBar SelectedUser={SelectedUser} /> */}
    </>
  );
};

export default ChatBox;
