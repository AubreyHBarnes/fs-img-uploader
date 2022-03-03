import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return( 
  <div className='bg-gradient-to-l from-sky-300 to-cyan-300'>
    <Component {...pageProps} />
  </div>
  );
}

export default MyApp
