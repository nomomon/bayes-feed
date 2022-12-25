import fetch from 'node-fetch';
import preprocess from '../utils/Preprocess';

const BASE_URL = 'http://localhost:3000/api';

export const getImageSrc = async (url: string) => {
    const response = await fetch(`${BASE_URL}/imageSrc?url=${url}`);
    const imageSrc = await response.text();
    return imageSrc;
}

export const getScore = async (text: string) => {
    const response = await fetch(`${BASE_URL}/score?text=${text}`, {
        method: 'GET'
    });
    const score = await response.text();
    return score;
}

export const setScore = async (text: string, score: string) => {
    const dict = preprocess(text);

    return await fetch(`${BASE_URL}/reaction`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            dict, score
        })
    });
}