import React, { memo, useContext, useEffect, useRef, useState } from "react";

import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseconfig";
import AuthContext from "../../Context/AuthContext";
// export default ContactsBar;
import {
  DesktopOutlined,
  DownloadOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
interface Props {
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
  SelectedUser: string;
  children: React.ReactNode;
}

const ContactsBar: React.FC<Props> = ({
  setSelectedUser,
  SelectedUser,
}: Props): JSX.Element => {
  const [Contacts, setContacts] = useState(null);
  const { User } = useContext(AuthContext);

  const [Query, setQuery] = useState("");
  const search = useRef();

  const fetchAllContacts_ForCurrentUser = async () => {
    // * Fetching All-Users Who Are Registered Except "Me(Current-User)", As These Users Are Shown Up As Contacts-List Of The "Current-User"
    const q = query(collection(db, "_Users"), where("UID", "!=", User.uid)); // * Filtering Docs

    // * Fetched Contact-Items
    const AllUserContacts = await getDocs(q);

    // * Updating State
    setContacts(AllUserContacts?._snapshot?.docChanges);
  };

  useEffect(() => {
    // TODO: Gotta Prevent Rerendring Of [Child-Component(ContactsBar.ts)] On Changing Parent's State
    // * useCallback() or useMemo() Hook Is Quite Better Option for this Work
    console.log(
      "The Child-Compnent is Rendering On Parent's [State-Variable] Changing, Gotta FIx This...!"
    );

    fetchAllContacts_ForCurrentUser();
  }, []);

  return (
    <section className="flex flex-col gap-4 border-2 m-2 border-orange-500 w-[15rem]">
      <input
        type={"text"}
        onChange={(e: React.FormEvent) => setQuery(e.currentTarget.value)}
        placeholder="search"
      />

      {Contacts ? (
        Contacts?.filter((item) => {
          // console.log(Query, item?.doc?.data?.value?.mapValue?.fields?.name?.stringValue.includes(Query))
          return Query.toLowerCase() === ""
            ? true
            : item?.doc?.data?.value?.mapValue?.fields?.name?.stringValue
                .toLowerCase()
                .includes(Query);
        }).map((item: object, ind: number) => {
          const contact = item?.doc?.data?.value?.mapValue?.fields;

          return (
            <div
              key={ind}
              onClick={() => {
                // * Don't Change The State If The Other-User Is Already Selected!
                if (
                  contact?.UID?.stringValue !== SelectedUser?.UID?.stringValue
                ) {
                  setSelectedUser(contact);
                }
              }}
              className="flex justify-around"
            >
              <img
                src={contact?.profileURL?.stringValue}
                className="w-[1.5rem] rounded-full"
                alt="Image not found"
                srcset=""
              />
              <span>{contact?.name?.stringValue}</span>
            </div>
          );
        })
      ) : (
        <>&nbsp; Loading...</>
      )}
    </section>
  );
};

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const Practice: React.FC<Props> = ({
  setSelectedUser,
  SelectedUser,
  children,
}: Props): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [Contacts, setContacts] = useState<object[] | null>(null);
  const { User } = useContext(AuthContext);

  const [Query, setQuery] = useState("");
  const search = useRef();

  const fetchAllContacts_ForCurrentUser = async () => {
    // * Fetching All-Users Who Are Registered Except "Me(Current-User)", As These Users Are Shown Up As Contacts-List Of The "Current-User"
    const q = query(collection(db, "_Users"), where("UID", "!=", User.uid)); // * Filtering Docs

    // * Fetched Contact-Items
    const AllUserContacts = await getDocs(q);

    // * Updating State
    // setContacts(AllUserContacts?._snapshot?.docChanges);
    setContacts(
      AllUserContacts.docs.map((userContact) => ({
        id: userContact.id,
        ...userContact.data(),
      }))
    );
  };

  useEffect(() => {
    // TODO: Gotta Prevent Rerendring Of [Child-Component(ContactsBar.ts)] On Changing Parent's State
    // * useCallback() or useMemo() Hook Is Quite Better Option for this Work
    console.log(
      "The Child-Compnent is Rendering On Parent's [State-Variable] Changing, Gotta FIx This...!"
    );

    fetchAllContacts_ForCurrentUser();
  }, []);
  const items: MenuItem[] = [getItem("User-name", "2", <UserOutlined />)];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        style={{ padding: "1rem 0" }}
        collapsed={collapsed}
        onCollapse={(value) => {
          setCollapsed(value);
          console.log(value);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          onClick={({ key, keyPath: [contact] }) => {
            if (contact !== SelectedUser) {
              console.log("changed");
              setSelectedUser(contact);
            }
          }}
          items={
            Contacts?.length !== 0
              ? Contacts?.map((contact, idx) =>
                  getItem(contact?.name, contact?.UID, <UserOutlined />)
                )
              : []
          }
        />
      </Sider>
      <Layout>
        <Header style={{ padding: "0 1rem", background: colorBgContainer }}>
          <Button type="dashed" shape="default" size={4}>
            <Link to={"/"}> Go To Chats </Link>
          </Button>
        </Header>{" "}
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Chats</Breadcrumb.Item>
            <Breadcrumb.Item>Hamza Shaikh</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Practice;
