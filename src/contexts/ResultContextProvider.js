import React, { createContext, useContext, useState } from "react";

// Create Context
const ResultContext = createContext();

// SEO-API Base URL
const baseURL = "https://seo-api.p.rapidapi.com/v1";

/*
 * RESULT CONTEXT PROVIDER
 */
export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("ladunjexa");

  // Youtube URL Validator
  const validYoutubeURL = (url) => {
    var p =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (url?.match(p)) ? true : false;
  };

  // Fetch Results from API
  const getResults = async (type) => {
    setIsLoading(true);

    const response = await fetch(`${baseURL}${type}`, {
      method: "GET",
      headers: {
        "X-User-Agent": "desktop",
        "X-Proxy-Location": "EU",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_SEO_KEY,
        "X-RapidAPI-Host": "seo-api.p.rapidapi.com",
      },
    });

    const data = await response.json();
    console.log(data);

    // Check Data Types
    if(type.includes("/video")) {
      const filteredResults = [];
      data.results?.map((result) => {
        if(validYoutubeURL(result.link)) filteredResults.push(result);
      });
      setResults(filteredResults);
    } else setResults(
      (type.includes("/news") ? data.entries : type.includes("/image") ? data.image_results : type.includes("/product") ? data.products : data.results)
    );

    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
