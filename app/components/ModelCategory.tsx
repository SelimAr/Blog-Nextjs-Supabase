import React from "react";
import NewsCategory from "./NewsCategory";
import categoriesArray from "../utils/categories";

export default async function ModelBanner() {
  return <NewsCategory categories={categoriesArray} />;
}
