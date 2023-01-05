import React from "react";

/*
 * FOOTER
 */
export const Footer = () => {
  return (
    <div className="text-center pt-10 mt-10 pb-2 border-t dark:border-gray-700 border-gray-200">
      {/* Copyrights */}
      <h1>{new Date().getFullYear()} Explorium, Inc.</h1>
      <h2 className="text-xs"><a href="https://github.com/ladunjexa">ladunjexa</a> ➼ <a href="https://bio.iwebdev.tech/">WEBDEV</a></h2>
    </div>
  );
};