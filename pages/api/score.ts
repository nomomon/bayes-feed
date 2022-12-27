import { NextApiRequest, NextApiResponse } from "next";
import preprocess from "../../components/utils/Preprocess";
// import { getFreq, getSpeficWords, getWords } from "../../components/firebase";
// import { NaiveBayes, n_messages, n_words } from "../../components/utils/NaiveBayes";
// import preprocess from "../../components/utils/Preprocess";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const score = 0;

    res.status(200).send(`${score}`)
}