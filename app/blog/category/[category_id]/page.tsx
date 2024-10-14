import React from "react";
import { NewsType } from "@/type";
import Articles from "@/app/components/Articles";

type CategoryType = {
  searchParams: {
    category: string;
  };
};

export default async function page({
  searchParams: { category },
}: CategoryType) {
  const categoryNewsURL = `https://newsdata.io/api/1/latest?apikey=${process.env.NEWS_API_KEY}&category=${category}`;

  const Options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  async function fetchDataCategoryNews() {
    const res = await fetch(categoryNewsURL, Options);
    if (!res) {
      return console.log(Error);
    }
    return res.json();
  }

  const getDataCategoryNews = await fetchDataCategoryNews();
  //console.log(getDateCategoryNews.results);

  return (
    <div className="w-full flex justify-center flex-wrap">
      {getDataCategoryNews.results > 0 &&
        getDataCategoryNews.results?.map((article: NewsType) => (
          <Articles key={article.article_id} {...article} />
        ))}
    </div>
  );
}
