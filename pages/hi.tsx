import { getFreq, getSpeficWords, getWords } from "../components/firebase"
import { NaiveBayes, n_messages, n_words } from "../components/utils/NaiveBayes"
import preprocess from "../components/utils/Preprocess";

const a = async () => {
    const text = `bermensch chatgpt cloudformation compuserve digitalocean dns dune fps gan gcp`;

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

    return score;
}

export default () => {
    console.log(a())
    return <></>
}