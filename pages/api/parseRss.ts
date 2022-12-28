import { NextApiRequest, NextApiResponse } from "next";
import Parser from "rss-parser";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const parser = new Parser();
    const feed = await parser.parseURL("https://www.reddit.com/r/programming/.rss");

    res.status(200).json(feed);
}