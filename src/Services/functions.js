// Slider Image Upload Function
import axios from 'axios';

export const uploadImage = async (file, apiEndpoint, setUploadedStates) => {
    const formData = new FormData();
    formData.append('image', file);

    for (const [key, value] of formData.entries()) {
        console.log(key, value);
    }

    try {
        const response = await axios.post(apiEndpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Set the content type
            }
        });

        const result = response.data;
        setUploadedStates('Upload Successful');
        console.log("upload result", result);
        alert('Upload Successful');

    } catch (error) {
        console.log("error", error);
        setUploadedStates(`Upload Failed: ${error.message}`);
    }
}
