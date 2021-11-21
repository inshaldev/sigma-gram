import { useState, useEffect, useContext, createContext } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { auth, db } from '../firebase/firebase-config';
import { doc, getDoc } from '@firebase/firestore';
import { useRouter } from 'next/dist/client/router';

const UserContextAPI = createContext();

export const useData = () => {
  return useContext(UserContextAPI);
};

export default function UserContext({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (User) => {
      setUser(User);
    });
    return unSub;
  }, []);

  useEffect(() => {
    async function getUserData() {
      if (!user) {
        setUserData(null);
      } else if (user) {
        const userDataDoc = await getDoc(doc(db, 'users', user.uid));
        setUserData(userDataDoc.data());
      }
    }
    return getUserData();
  }, [user]);

  const [posts, setPosts] = useState([
    {
      authorUID: '123456789',
      authorName: 'Juan Jose',
      authorUsername: 'josethewise',
      authorLogo: 'JJ',
      id: 1,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      // comments: 0,
      likes: 0,
      // shares: 0,
    },
    {
      authorUID: '1234',
      authorName: 'Brott Maney',
      authorUsername: 'brottdaking',
      authorLogo: 'BM',
      id: 2,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tristique vestibulum pharetra. Curabitur a enim purus. Vestibulum convallis gravida condimentum.',
      // comments: 0,
      likes: 0,
      // shares: 0,
    },
  ]);
  const value = { user, setUser, userData, setUserData, posts };
  return (
    <UserContextAPI.Provider value={value}>{children}</UserContextAPI.Provider>
  );
}
