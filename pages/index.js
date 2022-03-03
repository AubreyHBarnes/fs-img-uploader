import Head from 'next/head'
import Image from 'next/image'
import MyDropzone from '../components/DropIn'

export default function Home() {
  return (
    <>
      <section className='flex justify-center items-center flex-col w-11/12 m-auto h-screen'>
        <MyDropzone />
      </section>
    </>
  )
}
