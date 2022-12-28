import type { NextApiRequest, NextApiResponse } from 'next'
import { RawPost } from '../../components/interface/RawPost';
import Parser from 'rss-parser';
import { getImageSrc } from '../../components/backend';

const parser = new Parser();

const rss: string[] = [
    // 'https://www.reddit.com/r/nextjs/.rss',
    // 'https://www.reddit.com/r/reactjs/.rss',
    // 'https://medium.com/feed/@will-carter',
    'https://habr.com/ru/rss/all/all/?fl=ru',
    'https://habr.com/ru/rss/feed/posts/all/089201e53df20f692f1c6dd842ecc29a/?fl=ru'
];

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}[]>
) {
    res.status(200).json(await GetFeed(rss))
}


const cleanDescription = (description: string) => {
    // Remove HTML tags from postDescription
    description = description.replace(/<[^>]*>?/gm, '');

    // Remove Читать далее from postDescription
    description = description.replace(/Читать далее*/, '');

    // Remove everything after [link] [comments] from postDescription
    description = description.replace(/\[link\].*/, '');
    description = description.replace(/\[comments\].*/, '');

    return description;
}

const GetFeed = async (rss: string | string[]) => {
    const feed: RawPost[] = [];

    if (typeof rss === 'string') {
        rss = [rss];
    }

    for (let i = 0; i < rss.length; i++) {
        await parseRSS(`https://nextjs-cors-anywhere.vercel.app/api?endpoint=${rss[i]}`)
            .then(posts => feed.push(...posts))
    }

    return feed;
}

const parseRSS = async (rss: string): Promise<RawPost[]> => {
    return parser.parseURL(rss)
        .then(async (feed) => {
            const itemsArray = feed.items || [];

            if (itemsArray.length === 0) {
                return [];
            }
            const sourceName = feed.title || '';
            const output = [];
            for (let i = 0; i < itemsArray.length; i++) {
                const item = itemsArray[i];

                const link = item.link || '';
                const title = item.title || '';
                const description = cleanDescription(
                    item.summary || item.content ||
                    item.contentSnippet ||
                    item['content:encoded'] || '');

                const lang = description.match(/[а-яА-ЯёЁ]/) ? 'ru' : 'en';

                // const imageSrc = await getImageSrc(link);
                const imageSrc = "";

                const post = {
                    sourceName: sourceName,
                    link: link,
                    postName: title,
                    postDescription: description,
                    imageSrc: imageSrc,
                    lang: lang,
                    score: null
                };
                output.push(post);
            }
            return output;
        })
        .catch(() => {
            return [];
        });
}