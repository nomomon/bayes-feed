import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000/api';

export const getImageSrc = async (url: string) => {
    const response = await fetch(`${BASE_URL}/imageSrc?url=${url}`);
    const imageSrc = await response.text();
    return imageSrc;
}