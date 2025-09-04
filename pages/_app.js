import NavBar from '../components/NavBar';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <NavBar />
    </>
  );
}
