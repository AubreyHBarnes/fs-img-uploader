import Head from 'next/head'
import Image from 'next/image'
import MyDropzone from '../components/DropIn'

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
      <section className='flex justify-center items-center h-screen'>
        <MyDropzone />
      </section>
    </>
  )
}
