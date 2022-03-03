import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return( 
  <div className='bg-gradient-to-l from-green-200 via-indigo-200 to-purple-200'>
    <Component {...pageProps} />
  </div>
  );
}

export default MyApp
