import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  FluentProvider,
  teamsDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";
import "./App.css";
import Header from "./components/Header/Header";
import FrontendRoutes from "./FrontendRoutes/Routes";

export default function App() {
  const [isThemeDark, setIsThemeDark] = useState<boolean>(false);

  // Theme beim Start aus LocalStorage wiederherstellen
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setIsThemeDark(true);
  }, []);

  // Body-Klasse immer synchron zum State halten (keine toggle-Rennen)
  useEffect(() => {
    if (isThemeDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isThemeDark]);

  const toggleTheme = () => {
    const newThemeIsDark = !isThemeDark;
    setIsThemeDark(newThemeIsDark);
    localStorage.setItem("theme", newThemeIsDark ? "dark" : "white");
  };

  return (
    <FluentProvider
      theme={isThemeDark ? teamsDarkTheme : webLightTheme}
      style={{ padding: "2rem", background: "#ffffff00" }}
    >
      <BrowserRouter>
        <Header onToggleTheme={toggleTheme} />
        <hr style={{ marginBottom: "50px" }} />
        <FrontendRoutes />
      </BrowserRouter>
    </FluentProvider>
  );
}
