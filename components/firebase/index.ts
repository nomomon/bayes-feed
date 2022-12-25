import { initializeApp } from 'firebase/app';
import { collection, getDocs, setDoc, getFirestore, increment, doc, query, where } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyBxMURyVqPsZ65H6lMduz1zkgwQQUwKICA",
    authDomain: "bayes-feed.firebaseapp.com",
    projectId: "bayes-feed",
    storageBucket: "bayes-feed.appspot.com",
    messagingSenderId: "607907142768",
    appId: "1:607907142768:web:0effe3a1765a562719a8b5",
    measurementId: "G-X1CS8NV3TS"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export async function getWords() {
    const wordsCol = collection(db, 'words');
    const wordSnapshot = await getDocs(wordsCol);
    const wordList = wordSnapshot.docs.map(doc => doc.data());
    return wordList;
}

export async function getSpeficWords(words: string[]) {
    const wordsCol = collection(db, 'words');
    const wordQuery = query(wordsCol, where("word", "in", words));
    const wordSnapshot = await getDocs(wordQuery);
    const wordList = wordSnapshot.docs.map(doc => doc.data());

    return wordList;
}

export async function getFreq() {
    const freqCol = collection(db, 'freq');
    const freqSnapshot = await getDocs(freqCol);
    const freqList = freqSnapshot.docs.map(doc => doc.data());

    return freqList;
}

export async function patchWords(words: any, score: number) {
    const wordsCol = collection(db, 'words');
    const wordSnapshot = await getDocs(wordsCol);

    const keys = Object.keys(words);

    for (const word of keys) {
        const wordDoc = wordSnapshot.docs.find(doc => doc.data().word === word);
        if (wordDoc) {
            if (score == 1) {
                setDoc(wordDoc.ref, {
                    word: word,
                    like_freq: increment(words[word])
                }, { merge: true });
            }

            if (score == -1) {
                setDoc(wordDoc.ref, {
                    word: word,
                    dislike_freq: increment(words[word])
                }, { merge: true });
            }
        } else {
            if (score == 1) {
                setDoc(doc(db, 'words', word), {
                    word: word,
                    like_freq: words[word],
                    dislike_freq: 0
                });
            }

            if (score == -1) {
                setDoc(doc(db, 'words', word), {
                    word: word,
                    like_freq: 0,
                    dislike_freq: words[word]
                });
            }
        }
    }
}

export async function patchFreq(score: number) {
    const freqCol = collection(db, 'freq');
    const freqSnapshot = await getDocs(freqCol);
    const freqDoc = freqSnapshot.docs[0];


    if (freqDoc) {
        if (score == 1) {
            setDoc(freqDoc.ref, {
                like: increment(1)
            }, { merge: true });
        }

        if (score == -1) {
            setDoc(freqDoc.ref, {
                dislike: increment(1)
            }, { merge: true });
        }
    }
    else {
        if (score == 1) {
            setDoc(doc(db, 'freq', 'freq'), {
                like: 1,
                dislike: 0
            });
        }

        if (score == -1) {
            setDoc(doc(db, 'freq', 'freq'), {
                like: 0,
                dislike: 1
            });
        }
    }
}