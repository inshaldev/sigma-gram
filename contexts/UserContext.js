import { useState, useEffect, useContext, createContext } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { auth, db, storage } from '../firebase/firebase-config';
import { collection, doc, getDoc, getDocs } from '@firebase/firestore';
import { useRouter } from 'next/dist/client/router';
import { getDownloadURL, ref } from '@firebase/storage';

const UserContextAPI = createContext();

export const useData = () => {
  return useContext(UserContextAPI);
};

export default function UserContext({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [imgURL, setImgURL] = useState(null);

  useEffect(() => {
    if (userData) {
      const userRef = ref(storage, `display-pictures/${userData.username}.jpg`);
      getDownloadURL(userRef).then((url) =>
        setUserData({ ...userData, dpURL: url.toString() })
      );
    }
  }, [userData]);

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

  useEffect(() => {
    async function getPosts() {
      const postsData = [];
      const Snapshot = await getDocs(collection(db, 'posts'));
      Snapshot.forEach(async (doc) => {
        const imageURL = null;
        await getDownloadURL(
          ref(storage, `posts/${doc.id}.${doc.data().imgExt}`)
        ).then((url) => {
          imageURL = url;
        });
        postsData.push({ ...doc.data(), id: doc.id, imgURL: imageURL });
      });
      setPosts(postsData);
    }
    return getPosts();
  }, []);
  const [posts, setPosts] = useState([]);
  const value = { user, setUser, userData, setUserData, posts };
  return (
    <UserContextAPI.Provider value={value}>{children}</UserContextAPI.Provider>
  );
}
