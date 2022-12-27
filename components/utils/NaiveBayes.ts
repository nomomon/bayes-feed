import { Freq } from "../interface/Freq";
import { Words } from "../interface/Words"
import preprocess from "./Preprocess";

const eta = 1e-4;

export type c = "like" | "dislike";

const sum = (arr: number[]) => {
    return arr.reduce((a, b) => a + b, eta);
}

const log_prior = (c: c, n_messages: Freq) => {
    const vals = Object.values(n_messages)
    return Math.log(n_messages[c] / sum(vals));
}

const log_likelihood = (word: string, c: c, n_words: Words, n_messages: Freq) => {
    if (n_words[c] && n_words[c].hasOwnProperty(word)) {
        const n_word = n_words[c][word] || 0;
        const n_c = n_messages[c];

        return Math.log((n_word + eta) / (n_c + eta));
    }
    else {
        return Math.log(eta);
    }
}

export const NaiveBayes = (
    words: string[], n_messages: Freq, n_words: Words
): number => {
    const log_p_like = log_prior("like", n_messages);
    const log_p_dislike = log_prior("dislike", n_messages);

    const log_p_words_like = sum(
        words.map(words => log_likelihood(words, "like", n_words, n_messages))
    );
    const log_p_words_dislike = sum(
        words.map(words => log_likelihood(words, "like", n_words, n_messages))
    );

    const log_p_like_words = log_p_like + log_p_words_like;
    const log_p_dislike_words = log_p_dislike + log_p_words_dislike;

    const p_like_words = Math.exp(log_p_like_words);
    const p_dislike_words = Math.exp(log_p_dislike_words);

    return p_like_words / (p_like_words + p_dislike_words);
};

const NaiveBayesScorer = (text: string, freq: Freq, words: Words) => {
    const wordFreq = preprocess(text);
    const textWords = [] as string[];

    Object.keys(wordFreq).forEach(w => {
        textWords.push(...Array(wordFreq[w]).fill(w))
    })

    const score = NaiveBayes(
        textWords,
        freq,
        words
    );

    if (!score) return 0;

    return score;
}

export default NaiveBayesScorer;