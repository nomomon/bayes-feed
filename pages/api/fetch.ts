import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const url = req.query['url'] || '';
    if (url == "") {
        res.status(200).json("No url specified")
    }

    if (typeof url !== 'string') {
        res.status(200).send(await doFetch(url[0]))
    }
    else {
        res.status(200).send(await doFetch(url))
    }
}

const doFetch = async (
    url: string
) => {
    const response = await fetch(url, {
        method: "GET"
    });
    const text = await response.text();
    return text;
}