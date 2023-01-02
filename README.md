# Bayes Feed (Web)

RSS feed with a Naïve Bayes classifier that learns from your reactions. You like or dislike posts; the algorithm predicts what you'll enjoy and gets better over time.

**This repo is the web app.** There is also an Android app: **[bayes-feed-android](https://github.com/nomomon/bayes-feed-android)**.

**Live:** [bayes-feed.vercel.app](https://bayes-feed.vercel.app)

---

## What it does

Aggregates posts from RSS feeds, runs the text through a Naïve Bayes model to predict "like" vs "dislike," and lets you react with thumbs up/down. Your reactions update the model in Firestore so predictions improve as you use it.

## Tech

- **Next.js** (Pages), **React**, **MUI**
- **Firebase** (Auth, Firestore) for user state and word counts
- **rss-parser** for feeds; custom preprocessing + Naïve Bayes in the client

## How to run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign in with Google so your likes/dislikes are stored. The app reads/writes to a Firebase project; the config in `components/firebase/index.ts` points at the original project. For your own deployment, replace it with your Firebase config (or use env vars).

Build and run in production:

```bash
npm run build
npm start
```

## Story

I built **this web version first.** In December I got back into reading as my main source of info and ran into a recommender that used Naïve Bayes to filter an RSS feed. I wanted the same thing: one place to read feeds, with a classifier that learns from my reactions.

I tried a Telegram bot first and hit a lot of errors. Then PocketBase for the backend, but it was still in beta. I switched to Next.js + MUI + Firebase and wrapped this version in about 11 hours. Deployed on Vercel, then tried paid Heroku and a server on my own phone—still not the free, simple app I had in mind. So I rewrote Bayes Feed as a **React Native app** and shipped an APK; that's **[bayes-feed-android](https://github.com/nomomon/bayes-feed-android)**.

One caveat on this web app: Firebase read usage can hit limits if you're not careful. Storing all word counts in a single document is one way to cut down reads; I didn't get to that here.

---

<p align="center">
  <img src="assets/feed-overview.jpg" width="320" alt="Feed overview">
  <img src="assets/post-example.jpg" width="320" alt="Post card">
</p>

*MIT*
