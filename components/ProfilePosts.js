import styles from '../styles/Profile.module.css';
import React from 'react';
import { useData } from '../contexts/UserContext';
import { AiOutlineLike } from 'react-icons/ai';

const ProfilePosts = () => {
  const { user, posts } = useData();
  if (user) {
    const userPosts = posts.filter((post) => post.authorUID === user.uid);
  }
  return (
    <>
      {user ? (
        <div className={styles.profile_posts}>
          {userPosts.map((post) => {
            return (
              <div className={styles.post} key={post.id}>
                <p className={styles.post_content}>{post.content}</p>
                <p className={styles.post_likes}>
                  <span>
                    <AiOutlineLike />
                  </span>
                  {post.likes}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default ProfilePosts;
