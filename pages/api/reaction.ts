import { NextApiRequest, NextApiResponse } from "next";
import { patchFreq, patchWords } from "../../components/firebase";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const dict = req.body['dict'] || {};
    const score = req.body['score'] || '0';

    try {
        await patchWords(dict, Number(score))
        await patchFreq(Number(score))
        res.status(200).send("OK")
    }
    catch (err) {
        res.status(500).json(JSON.stringify(err))
    }
}