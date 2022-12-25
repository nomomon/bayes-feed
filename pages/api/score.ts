import { NextApiRequest, NextApiResponse } from "next";
import { getFreq, getSpeficWords, getWords } from "../../components/firebase";
import { NaiveBayes, n_messages, n_words } from "../../components/utils/NaiveBayes";
import preprocess from "../../components/utils/Preprocess";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const text = req.query['text'] as string || '';

    if (text == '') {
        res.status(400).send('0')
    }

    const words = Object.keys(preprocess(text));

    const freq = await getFreq();
    const n_messages = freq[0] as n_messages;

    const top_10_words = Object.entries(words).sort().map(el => el[1]).slice(0, 10);
    const word_freq = await getSpeficWords(top_10_words)
    const word_freq_ = word_freq.map(el => [
        el.word, {
            like: el.like_freq,
            dislike: el.dislike_freq
        }
    ]) as any[];
    const n_words = Object.fromEntries(new Map(word_freq_)) as n_words;

    const score = NaiveBayes(
        words,
        n_messages,
        n_words
    );

    // const score = Math.random();

    res.status(200).send(`${score}`)
}