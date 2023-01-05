import React from "react";
import { NavLink } from "react-router-dom";

// Classifier Links
const classifierLinks = [
  { url: "/search", text: "🔎 All" },
  { url: "/news", text: "📰 News" },
  { url: "/images", text: "📸 Images" },
  { url: "/videos", text: "📺 Videos" },
  { url: "/crawl", text: "🕷 Crawl" },
  { url: "/products", text: "🛒 Products" },
];

/*
 * CLASSIFIER
 */
export const Classifier = () => {
  return (
    <div className="flex sm:justify-around justify-between items-center mt-4">
      {/* Display classifications links */}
      {classifierLinks.map(({ url, text }, i) => (
        <NavLink
          className={({ isActive }) => {
            const linkClasses = ["m-2 mb-0"];
            if (isActive)
              linkClasses?.push(
                "text-blue-700 border-b-2 dark:text-blue-300 border-blue-700 pb-2"
              );

            return linkClasses?.join(" ");
          }}
          key={i}
          to={url}
        >
          {text}
        </NavLink>
      ))}
    </div>
  );
};
