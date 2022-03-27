import React, { useState, useEffect } from 'react'

const UploadImage = ({ token }) => {
    const [img, setImg] = useState()

    const handleUpload = () => {
        console.log(img);
    }

    return <>
        <input type="file" accept="image/*" onChange={(e) => { setImg(e.target.files) }} />
        <button onClick={handleUpload}>Upload</button>
    </>
}

export default UploadImage;