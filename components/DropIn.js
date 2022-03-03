import React, {useCallback, useState } from 'react'
import Image from 'next/image'
import {useDropzone} from 'react-dropzone'
import { supabase } from '../api'

export default function MyDropzone() {

  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)
  const [isError, setisError] = useState(false)
  const [showError, setShowError] = useState([])
  const [displayUrl, setdisplayUrl] = useState(null)
  
  const onDrop = useCallback(async (acceptedFiles) => {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from('img-uploader-bucket')
      .upload(`public/${acceptedFiles[0].path}`, acceptedFiles[0])
    if (data) {
      // setdisplayImg(acceptedFiles)
      const { signedURL, error } = await supabase
        .storage
        .from('img-uploader-bucket')
        .createSignedUrl(`public/${acceptedFiles[0].path}`, 60)

      setdisplayUrl(signedURL);
      setLoading(false);
      setFinished(true);

    }
    if (error) {
      setisError(true)
      setShowError(error)
    }
  }, [])
  const {getRootProps, getInputProps, open, isDragActive} = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true
  });

  const copyThat = (copyThis) => {
    navigator.clipboard.writeText(copyThis)
  }
  if (isError) return (
    <>
      <div className="flex flex-col text-white text-2xl h-fit w-full max-w-lg rounded shadow-lg bg-transparent">
        <div className="rounded-xl flex justify-center items-center flex-col h-full px-12 py-12 bg-gradient-to-l bg-gradient-to-r from-sky-700 to-cyan-700">
          <div className='py-8'>
              <p>Oops! An Error has occured.</p>
              <p>Error Code: {showError.statusCode}</p>
              <p>{showError.message}</p>
          </div>
          
        </div>
      </div>  
    </>
  );
  if (loading) return (
    <>
      <svg role="status" className="mr-2 w-12 h-12 text-gray-600 animate-spin dark:text-gray-600 fill-blue-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
      </svg>
      <p>Uploading...</p>
    </>

  );
  if (finished) return (
    <>
      <div className="flex flex-col text-white h-fit w-full max-w-lg rounded shadow-lg bg-transparent">
        <div className="rounded-xl flex justify-center items-center flex-col h-full px-12 py-12 bg-gradient-to-l bg-gradient-to-r from-sky-700 to-cyan-700">
          <div className='py-8'>
              Uploaded successfully!
          </div>
          <div className='w-full'>
            <img src={displayUrl} alt="" />
            <textarea readOnly={true} rows={1} value={displayUrl? `${displayUrl}` : ''} onClick={() => copyThat(event.target.value)} className="copy-me w-full text-black"></textarea>
          </div>
        </div>
      </div>  
    </>
  );
  return (
    <>
    
    <div {...getRootProps()} className="flex flex-col text-white h-[28rem] w-full max-w-lg rounded shadow-lg bg-transparent">
      <div onClick={open} className="rounded-xl flex justify-center items-center flex-col h-full px-12 py-12 bg-gradient-to-l bg-gradient-to-r from-sky-700 to-cyan-700">
        <img src='/undraw_upload.svg' alt="" />
        <div className='py-8'>
          <input {...getInputProps()} />
            {
              isDragActive ?
                <p className="text-base text-lg">Drop the files here ...</p> :
                <p className="text-base text-2xl">Drag & drop some files here, or click to select files</p>
            }
        </div>
      </div>
    </div>    
</>
  )
}
