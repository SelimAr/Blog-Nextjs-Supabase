import React from "react";
import Articles from "../components/Articles";
import { NewsType } from "@/type";

const globalNewsURL = `https://newsdata.io/api/1/latest?apikey=${process.env.NEWS_API_KEY}&country=fr&size=9`;

const Options: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

async function fetchDataGlobalNews() {
  const res = await fetch(globalNewsURL, Options);
  if (!res) {
    return console.log(Error);
  }
  return res.json();
}

export default async function page() {
  const getDataGlobalNews = await fetchDataGlobalNews();
  //console.log(getDataGlobalNews);

  return (
    <main className="w-full flex justify-center flex-wrap">
      {getDataGlobalNews.results.length > 0 &&
        getDataGlobalNews?.results?.map((news: NewsType) => (
          <Articles key={news.article_id} {...news} />
        ))}
    </main>
  );
}
