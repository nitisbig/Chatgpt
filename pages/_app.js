import '../styles/globals.css';
import NavBar from '../components/NavBar';
import Chatbot from '../components/Chatbot';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <NavBar />
      <Chatbot />
    </>
  );
}
