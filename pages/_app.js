import '../styles/globals.css';
import UserContext from '../contexts/UserContext';
import { Layout } from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <UserContext>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext>
  );
}

export default MyApp;
