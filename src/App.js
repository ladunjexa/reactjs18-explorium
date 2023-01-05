import React, { useEffect, useState } from "react";

import { Navbar } from "./components/Navbar";
import { Router } from "./components/Router";
import { Footer } from "./components/Footer";

/*
 * APP
 */
const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  // Check themeMode cookie
  useEffect(() => {
    if (localStorage.getItem("darkTheme")) {
      const theme = localStorage.getItem("darkTheme");
      setDarkTheme(theme === "dark" ? true : false);
    }
  }, []);

  // Set themeMode
  useEffect(() => {
    localStorage.setItem("darkTheme", darkTheme ? "dark" : "light");
  }, [darkTheme]);

  return (
    <div className={darkTheme ? "dark" : ""}>
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
        {/* Navbar */}
        <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />

        {/* Main */}
        <Router />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default App;
