import React from "react";
import FileUploadClient from "./FileUpload";


export default function Home() {
  return (
    <div className="border-2 h-screen flex justify-center items-center">
      <div className="flex flex-col  gap-2">
        <h1 className="text-3xl md:text-4xl font-bold ">Upload Documnets</h1>
        <p className="text-lg  md:text-xl text-[#5A595A]">Drag & drop or click to select files</p>
        <FileUploadClient />
      </div>
    </div>
  );
}
