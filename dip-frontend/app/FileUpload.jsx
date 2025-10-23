"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUploadClient = () => {

  const [filesList, setFilesList] = useState([]);

  const onDrop = useCallback(async (acceptedFiles) => {

    const loadingState = acceptedFiles.map((curr) => ({ name: curr.name, status: "processing" }))
    setFilesList((prev) => [...prev, ...loadingState]);

    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const req = await fetch("http://localhost:8000/api/document/", {
          method: "POST",
          body: formData,
          credentials: "include",
        })

        const res = await req.json();
        if (!req.ok) throw Error("Something went wrong with request", res);

        setFilesList((prev) => (prev.map(curr => curr.name == file.name ? { ...curr, status: "processed" } : { ...curr })))

      }
      catch (err) {
        console.error(err);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="border-2 rounded-lg border-[#D1D1D1] p-2 w-[300px] sm:w-auto">
      <div className="border-2 rounded-lg border-[#D1D1D1] h-[200px] flex items-center justify-center" {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <>
              <p>Drag & drop or click here</p>
              <p>.pdf, .docx, .txt allowed</p>
              <p>Max: 10 MB</p>
            </> :
            <div className="flex flex-col items-center">
              <svg className="w-15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cloud-upload</title><path d="M11 20H6.5Q4.22 20 2.61 18.43 1 16.85 1 14.58 1 12.63 2.17 11.1 3.35 9.57 5.25 9.15 5.88 6.85 7.75 5.43 9.63 4 12 4 14.93 4 16.96 6.04 19 8.07 19 11 20.73 11.2 21.86 12.5 23 13.78 23 15.5 23 17.38 21.69 18.69 20.38 20 18.5 20H13V12.85L14.6 14.4L16 13L12 9L8 13L9.4 14.4L11 12.85Z" /></svg>
              <p>Drag & drop or click here</p>
              <p>.pdf, .docx, .txt allowed</p>
              <p>Max: 10 MB</p>
            </div>
        }
      </div>
      <div>
        <p className="text-lg  md:text-xl font-semibold">Uploaded files</p>
        <ul className="flex flex-col gap-2">
          {
            filesList.map((file, index) => {
              return (
                <li key={`${index}`} className="overflow-hidden flex mb-1 w-full justify-between gap-2">
                  <div className="w-1/2 overflow-x-hidden">
                    <p className="text-nowrap">{file.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-[#5A595A]">{file.status}</p>
                    <button className="border-2 px-1.5 rounded-md border-[#D1D1D1] hover:cursor-pointer active:bg-gray-300 duration-100">Delete</button>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
      <button className="bg-blue-400 px-2 py-1 rounded-md text-white hover:cursor-pointer active:bg-blue-600 transition-all duration-100">Go to chat!</button>
    </div>
  )
}


export default FileUploadClient;
