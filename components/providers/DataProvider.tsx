// @ts-nocheck
import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { auth, getUserFreq, getUserWords, patchUserFreq, patchUserWords } from "../firebase";
import { Freq } from "../interface/Freq";
import { RawPost } from "../interface/RawPost";
import { Score } from "../interface/Score";
import { WordFreq } from "../interface/WordFreq";
import { Words } from "../interface/Words";
import NaiveBayesScorer from "../utils/NaiveBayes";
import { fetchBuilder, MemoryCache } from 'node-fetch-cache';

const fetch = fetchBuilder.withCache(new MemoryCache({ ttl: 60 * 60 * 1000 }));

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
        if (loading && auth.currentUser) {
            fetch("/api/posts")
                .then((res) => res.json())
                .then((newPosts: RawPost[]) => {
                    setPosts((p) => [
                        ...p,
                        ...newPosts
                    ].filter((post, i, self) =>
                        self.findIndex(p => p.link === post.link) === i
                    ));
                    setLoading(false);
                })
        }
    }, [words, freq, loading, auth.currentUser])

    useEffect(() => {
        if (posts.length > 0 && posts[0].score == null) {
            setPosts((p) => {
                return p.map(post => {
                    const text = post.postName + " " + post.postDescription;
                    post.score = NaiveBayesScorer(text, freq, words);
                    return post;
                }).sort((a, b) => (b.score || 0) - (a.score || 0))
            })
        }
    }, [words, freq, posts])

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
