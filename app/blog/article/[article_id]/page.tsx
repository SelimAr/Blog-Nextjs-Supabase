import React from "react";
import Article from "@/app/components/Article";
import { NewsType } from "@/type";
import { createClient } from "@/app/utils/supabase/server";

type ArticleType = {
  params: {
    article_id: string;
  };
};

export default async function page({ params: { article_id } }: ArticleType) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const articlesNewsURL = `https://newsdata.io/api/1/latest?apikey=${process.env.NEWS_API_KEY}&id=${article_id}`;

  const Options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  async function fetchDataArticlesNews() {
    const res = await fetch(articlesNewsURL, Options);
    if (!res) {
      return console.log(Error);
    }
    return res.json();
  }

  const getDataArticlesNews = await fetchDataArticlesNews();
  //console.log(getDataArticlesNews.results);

  return (
    <div>
      {getDataArticlesNews.results.length > 0 &&
        getDataArticlesNews.results?.map((article: NewsType) => (
          <Article key={article.article_id} {...article} user={user} />
        ))}
    </div>
  );
}
