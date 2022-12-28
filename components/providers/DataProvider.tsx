import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { getUserFreq, getUserWords, patchUserFreq, patchUserWords } from "../firebase";
import { Freq } from "../interface/Freq";
import { RawPost } from "../interface/RawPost";
import { Score } from "../interface/Score";
import { WordFreq } from "../interface/WordFreq";
import { Words } from "../interface/Words";
import NaiveBayesScorer from "../utils/NaiveBayes";

export const DataContext = createContext({});

// inputs for the provider
export interface DataProviderProps {
    children: ReactNode;
}

// outputs of the provider
export type DataProviderInterface = {
    posts: RawPost[];
    words: Words;
    freq: Freq;
    reactToPost: (wordFreq: WordFreq, score: Score) => Promise<void>;
};

export const DataProviderCls: FC<DataProviderProps> = ({
    children,
}) => {
    const [words, setWords] = useState<Words>({ like: {}, dislike: {} })
    const [freq, setFreq] = useState<Freq>({ like: 0, dislike: 0 })
    const [posts, setPosts] = useState<RawPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // load the data

    useEffect(() => {
        getUserWords().then(words => {
            setWords(words)
        })
        getUserFreq().then(freq => {
            setFreq(freq)
        })
    }, [])

    useEffect(() => {
        if (loading) {
            fetch("/api/posts")
                .then((res) => res.json())
                .then((newPosts: RawPost[]) => {
                    setPosts((p) => [
                        ...p,
                        ...newPosts
                            .map(post => {
                                const text = post.postName + " " + post.postDescription;
                                post.score = NaiveBayesScorer(text, freq, words);
                                return post;
                            })
                            .sort((a, b) => b.score - a.score)
                    ]);
                    setLoading(false);
                })
                .catch((err) => console.error(err))
        }
    }, [words, freq, loading])

    // funcs to update data
    const reactToPost = async (wordFreq: WordFreq, score: Score) => {
        const c = (score.like == 1) ? "like" : (score.dislike == 1) ? "dislike" : null;
        if (c == null) return;

        const usedWords = Object.keys(wordFreq);

        usedWords.forEach(word => {
            words[c][word] = wordFreq[word] + (words[c][word] || 0)
        })

        await Promise.all([
            patchUserWords(words),
            patchUserFreq(score)
        ]).then(() => {
            setWords({ ...words })
            setFreq((freq) => ({
                like: score.like + (freq?.like || 0),
                dislike: score.dislike + (freq?.dislike || 0)
            }))
        })
    }

    return (
        <DataContext.Provider
            value={{
                posts,
                loading,
                words,
                freq,
                reactToPost
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const DataProvider = DataProviderCls;


export const WithData = (Component: any) => (props: any) => {
    return (
        <DataContext.Consumer>
            {(context) => <Component {...context} {...props} />}
        </DataContext.Consumer>
    );
};
