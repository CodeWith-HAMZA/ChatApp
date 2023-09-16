import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import React, {
  FormEvent,
  LegacyRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { unstable_batchedUpdates } from "react-dom";
import AuthContext from "../../Context/AuthContext";
import { db } from "../../firebaseconfig";
import Message from "./Message";
interface Props {
  SelectedUser: string;
}
const ChatBar: React.FC<Props> = ({ SelectedUser }: Props): JSX.Element => {
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
  const COMBINED_ID_CharSum = SumAsciisOfString(
    SelectedUser?.UID?.stringValue + User?.uid
  );

  // * Posting Message As DOc In FIREBASE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("hey ther e", SelectedUser);

    console.log(textInputRef.current);

    console.log(
      SelectedUser?.UID?.stringValue + User?.uid,
      SelectedUser?.UID,
      User?.uid
    );

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

  useEffect(() => {
    const unSubscribeForMessage = onSnapshot(
      // * Sorting Them According To The Created-Time, In Ascending-Order
      query(
        collection(db, "_Chats"),
        where("combinedID", "==", COMBINED_ID_CharSum)
      ),

      (snap: any) => {
        setMessages(snap?.docs);
        console.log(
          new Date(
            snap?.docs[0]?._document?.data?.value?.mapValue?.fields?.createdAt?.timestampValue
          )
        );

        const firstDate = new Date(
          snap?.docs[0]?._document?.data?.value?.mapValue?.fields?.createdAt?.timestampValue
        );
        setMessages(
          snap?.docs
            .slice()
            .sort(
              (a, b) =>
                new Date(
                  a._document?.data?.value?.mapValue?.fields?.createdAt?.timestampValue
                ) -
                new Date(
                  b._document?.data?.value?.mapValue?.fields?.createdAt?.timestampValue
                )
            )
        );

        console.log(firstDate);
      }
    );

    console.log("first");

    return () => {
      unSubscribeForMessage();
    };
  }, [SelectedUser]);

  return (
    <div className="w-[100%]">
      <h1 className="text-blue-500">{SelectedUser?.name?.stringValue}</h1>

      <section className="border-2 m-2 border-green-500 w-[100%] h-[17.5rem] overflow-scroll">
        {(Messages &&
          Messages.map((item) => {
            const message = item?._document?.data?.value?.mapValue?.fields;
            // console.log(message, "MMMM")
            return (
              <Message
                text={message?.text?.stringValue}
                position={
                  message?.UID?.stringValue === User.uid ? "right" : "left"
                }
              />
            );
          })) || <>Loading...</>}
      </section>

      <form onSubmit={handleSubmit} className="">
        <input type="text" ref={textInputRef} />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default ChatBar;
