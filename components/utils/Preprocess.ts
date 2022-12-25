import { Stopwords } from "../interface/Stopwords";
import { Lemmatizer } from "../interface/Lemmatizer";
import makeStopwords from "./MakeStopwords";
import makeLemmatizer from "./MakeLemmatizer";

const cleanChars = (text: string) => {
    return text.replace(/[^а-яА-Яa-zA-Z\s]/g, " ").toLowerCase();
}

const cleanSpaces = (text: string) => {
    return text.replace(/\s+/g, " ");
}

const lemmatize = (words: string[], lemmatizer: Lemmatizer) => {
    return words.map(word => lemmatizer(word));
}

const removeStopWords = (words: string[], stopwords: Stopwords) => {
    return words.filter(word => !stopwords.includes(word));
}

const wordsToDict = (words: string[]) => {
    const dict: any = {};
    words.forEach(word => {
        dict[word] = (dict[word] || 0) + 1;
    });
    return dict;
};

const stopwords: Stopwords = makeStopwords();
const lemmatizer: Lemmatizer = makeLemmatizer()

const preprocess = (
    text: string
): {
    [key: string]: number
} => {
    let cleanText = cleanChars(text);
    let words = cleanText.split(" ");
    words = words.filter(word => word.length >= 1);
    words = removeStopWords(words, stopwords);
    words = lemmatize(words, lemmatizer);
    words = cleanSpaces(words.join(" ")).split(" ");
    words = words.filter(word => word.length >= 1);

    return wordsToDict(words);
}

export default preprocess;