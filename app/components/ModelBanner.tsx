import React from "react";
import NewsBanner from "./NewsBanner";

const bannerNewsURL = `https://newsdata.io/api/1/latest?apikey=${process.env.NEWS_API_KEY}&country=fr&size=4`;

const Options: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

async function fetchDataBannerNews() {
  const res = await fetch(bannerNewsURL, Options);
  if (!res) {
    return console.log(Error);
  }
  return res.json();
}

export default async function ModelBanner() {
  const getDataBannerNews = await fetchDataBannerNews();
  //console.log(getDataGlobalNews);
  return <NewsBanner bannerInfo={getDataBannerNews.results} />;
}
