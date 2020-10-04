import { Button } from '@material-ui/core';
import React, { useState } from 'react';

function ImageUpload() {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');


    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {

    }


    return (
        <div>
            <input type = "text" placeholder='Enter a Caption...' onChange={event => setCaption(event.target.value)} value={caption} />
            <input type = "file" onChange={handleChange} />
            <Button onClick={handleUpload}>
                Upload
            </Button>
            
        </div>
    )
}

export default ImageUpload
