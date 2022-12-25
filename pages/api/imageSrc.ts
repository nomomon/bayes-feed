import { NextApiRequest, NextApiResponse } from "next";
import fetch from 'node-fetch';
import { JSDOM } from "jsdom";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const url = req.query['url'] as string || '';
    if (url == "") {
        res.status(400).json("No url specified")
        return;
    }

    await fetch(url)
        .then(async (response) => {
            const html = await response.text();
            const dom = new JSDOM(html);
            const img = getImg(dom.window.document);
            const imgUrl = new URL(img, url);

            res.status(200).send(imgUrl.href);
        })
        .catch((error) => {
            res.status(500).send("");
        });
}

const getImg = (document: Document): string => {
    const ogImg = document.querySelector('meta[property="og:image"]');
    if (
        ogImg != null &&
        ogImg.getAttribute("content")
    ) {
        return ogImg.getAttribute("content") || "";
    }
    const imgRelLink = document.querySelector('link[rel="image_src"]');
    if (
        imgRelLink != null &&
        imgRelLink.getAttribute("href")
    ) {
        return imgRelLink.getAttribute("href") || "";
    }
    const twitterImg = document.querySelector('meta[name="twitter:image"]');
    if (
        twitterImg != null &&
        twitterImg.getAttribute("content")
    ) {
        return twitterImg.getAttribute("content") || "";
    }

    let imgs = Array.from(document.getElementsByTagName("img"));
    if (imgs.length > 0) {
        imgs = imgs.filter(img => {
            let addImg = true;
            if (img.naturalWidth > img.naturalHeight) {
                if (img.naturalWidth / img.naturalHeight > 3) {
                    addImg = false;
                }
            } else {
                if (img.naturalHeight / img.naturalWidth > 3) {
                    addImg = false;
                }
            }
            if (img.naturalHeight <= 50 || img.naturalWidth <= 50) {
                addImg = false;
            }
            return addImg;
        });
        return imgs[0].getAttribute("src") || "";
    }

    return "";
};