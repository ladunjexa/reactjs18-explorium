import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";

import { useResultContext } from "../contexts/ResultContextProvider";
import { Loader } from "./Loader";
import notFoundIllustration from "../assets/images/unfound_illustration.svg";

/*
 * RESULTS
 */
export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  // Fetch Results
  useEffect(() => {
    if (searchTerm) {
      switch (location.pathname) {
        case "/videos":
        case "/images":
          getResults(
            `${location.pathname.substring(
              0,
              location.pathname.length - 1
            )}/q=${searchTerm}&num=50`
          );
          break;
        case "/products":
          getResults(
            `${location.pathname.substring(
              0,
              location.pathname.length - 1
            )}/search/q=${searchTerm}&num=50`
          );
          break;
        default: // handle search, news & crawl cases
          getResults(`${location.pathname}/q=${searchTerm}&num=50`);
          break;
      }
    }
    // eslint-disable-next-line
  }, [searchTerm, location.pathname]);

  // Loading
  if (isLoading) return <Loader />;

  // No Results Found
  if (!results?.length)
    return (
      <div className="flex justify-center items-center w-full h-full flex-col">
        <img src={notFoundIllustration} alt="No Results Found." className="w-5/6 md:w-3/6" />
        <h1 className="text-2xl">No Results Found.</h1>
      </div>
    );

  switch (location.pathname) {
    // Search Page
    case "/search":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.map(({ link, title, description }, i) => (
            <div key={i} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                {/* URL Address */}
                <p className="text-sm">
                  {link.length > 30 ? link.substring(0, 30) : link}
                </p>
                {/* Title */}
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
                {/* Description */}
                <p className="text-sm hover:underline dark:text-blue-300 text-blue-700">
                  {description}
                </p>
              </a>
            </div>
          ))}
        </div>
      );

    // News Page
    case "/news":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
          {results?.map(({ links, source, title, published }, i) => {
            return (
              <div key={i} className="md:w-2/5 w-full">
                <a
                  href={links?.[0].href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  {/* Title */}
                  <p className="text-lg dark:text-blue-300 text-blue-700">
                    {title}
                  </p>
                </a>
                {/* Source Link */}
                <div className="flex gap-4">
                  <a href={source?.href} target="_blank" rel="noreferrer">
                    {source?.href}
                  </a>
                </div>
                {/* Publish Date */}
                <p className="text-sm dark:text-blue-300 text-blue-700">
                  {published}
                </p>
              </div>
            );
          })}
        </div>
      );

    // Images Page
    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.map(({ image, link: { href, title } }, i) => (
            <a
              href={href}
              key={i}
              target="_blank"
              rel="noreferrer"
              className="sm:p-3 p-5"
            >
              {/* Image */}
              <img src={image?.src} alt={title} loading="lazy" />
              {/* Title */}
              <p className="w-36 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>
      );

    // Videos Page
    case "/videos":
      return (
        <div className="flex flex-wrap">
          {results?.map(({ link, title }, i) => (
            <div key={i} className="p-2">
              {/* Video Frame */}
              {typeof link === "string" && (
                <iframe
                  width="355px"
                  height="200px"
                  src={
                    link?.includes("/watch?v=")
                      ? link?.replace("/watch?v=", "/embed/")
                      : link
                  }
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={title}
                ></iframe>
              )}
            </div>
          ))}
        </div>
      );

    // Crawl Page
    case "/crawl":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.map(({ link, title, description }, i) => (
            <div key={i} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                {/* Title */}
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
                {/* Description */}
                <p className="text-sm hover:underline dark:text-blue-300 text-blue-700">
                  {description}
                </p>
              </a>
            </div>
          ))}
        </div>
      );

    // Products Page
    case "/products":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.map(({ img_url, link, title, price, asin }, i) => (
            <div className="max-w-sm rounded-lg shadow-xl m-2 p-4 drop-shadow-xl">
              {/* Image */}
              <img
                src={img_url}
                className="p-8 rounded-t-lg"
                alt={title}
                loading="lazy"
              />
              {/* Title */}
              <h5 className="text-base font-semibold tracking-tight w-56">
                {title.length > 60 ? title.substring(0, 60) : title}
              </h5>
              {/* Amazon Standard Identification Number */}
              <p className="w-36 break-words text-xs mt-2">{asin}</p>
              <div class="flex items-center justify-between mt-2">
              {/* Price */}
                <span class="text-xl font-bold">${price}</span>
                <a
                  href={link}
                  key={i}
                  target="_blank"
                  rel="noreferrer"
                  className="font-fredoka sm:p-3 p-5 text-base font-semibold rounded-lg bg-blue-500 hover:bg-blue-300 text-white dark:bg-gray-500 dark:text-gray-900 dark:hover:bg-gray-300"
                >
                  BUY NOW
                </a>
              </div>
            </div>
          ))}
        </div>
      );
      
    // Incorrect Route
    default:
      return <Navigate to="/search" />;
  }
};
