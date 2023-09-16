import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import AuthContext from "../../Context/AuthContext";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseconfig";
interface Props {
  SelectedUser: string;
}
const ChatRoom: React.FC<Props> = ({ SelectedUser }) => {
  const { User } = useContext(AuthContext);
  const [Messages, setMessages] = useState<unknown[]>([]);

  const textInputRef = useRef<HTMLInputElement>(null);

  // * Adding All The Ascii-Values (integer) Of The Characters In String
  const SumAsciisOfString = (givenStr: string) =>
    givenStr
      .split("")
      .map((elem: string) => elem.charCodeAt())
      .reduce((a, b) => a + b, 0)
      .toString();

  // * Private-ID To Secure The Chat Between-Two-Users, "SalluBhaiID" + "ShahrukhKhanID" ya "ShahrukhKhanID" + "SalluBhaiID" The Resultant ID Must Be Same Order-Doesn't Matter At All
  const COMBINED_ID_CharSum = SumAsciisOfString(SelectedUser + User?.uid);
  // * Posting Message As DOc In FIREBASE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("hey ther e", SelectedUser);

    console.log(textInputRef.current);

    try {
      // *  Add a new Message(Doc) In Fire-Store (DB)
      await addDoc(collection(db, "_Chats"), {
        createdAt: serverTimestamp(),
        text: textInputRef.current !== null ? textInputRef.current.value : "",
        UID: User.uid,
        combinedID: COMBINED_ID_CharSum,
      });

      textInputRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ overflow: "scroll" }} className="flex flex-col h-[20rem]">
      <Message position="left" text="Hamza" />
      <Message position="left" text="Hamza" />
      <Message position="left" text="Hamza" />
      <Message position="left" text="Hamza" />
      <Message position="left" text="Hamza" />
      <Message position="left" text="Hamza" />
      <Message position="left" text="Hamza" />
      <Message position="left" text="Hamza" />
      <Message position="left" text="Hamza" />
      <Message position="left" text="Hamza" />
      <Message position="left" text="Hamza" />
      <Message position="left" text="Hamza" />
    </div>
  );
};

export default ChatRoom;
