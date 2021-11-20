import { useState, useContext, createContext } from 'react';

const UserContextAPI = createContext();

export const useUserContext = () => {
  return useContext(UserContextAPI);
};

export default function UserContext({ children }) {
  const [user, setUser] = useState({
    uid: '123456789',
    id: 1,
    firstname: 'Juan',
    lastname: 'Jose',
    username: '@josethewise',
    buddies: 0,
    following: 0,
    posts: 1,
  });
  const [posts, setPosts] = useState([
    {
      authorUID: '123456789',
      authorName: 'Juan Jose',
      authorUsername: '@josethewise',
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
      authorUsername: '@brottdaking',
      authorLogo: 'BM',
      id: 2,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tristique vestibulum pharetra. Curabitur a enim purus. Vestibulum convallis gravida condimentum.',
      // comments: 0,
      likes: 0,
      // shares: 0,
    },
  ]);
  const value = { user, setUser, posts };
  return (
    <UserContextAPI.Provider value={value}>{children}</UserContextAPI.Provider>
  );
}
