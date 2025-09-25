import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  Button,
  createLightTheme,
  FluentProvider,
  teamsDarkTheme,
  webLightTheme,
  type BrandVariants,
  type Theme,
} from "@fluentui/react-components";
import "./App.css";
import Header from "./components/Header/Header";
import FrontendRoutes from "./FrontendRoutes/Routes";
import "./frogtheme.css";

export default function App() {
  const frogBrand: BrandVariants = {
    10: "#052e16", // sehr dunkelgrün (Hintergrund)
    20: "#064e3b",
    30: "#065f46",
    40: "#047857",
    50: "#059669",
    60: "#10b981", // sattes grün (Primärfarbe)
    70: "#34d399",
    80: "#6ee7b7",
    90: "#a7f3d0",
    100: "#d1fae5", // sehr helles mint
    110: "#ecfdf5",
    120: "#f0fdfa",
    130: "#ffffff",
    140: "#ffffff",
    150: "#ffffff",
    160: "#ffffff",
  };

  const frogTheme: Theme = {
    ...createLightTheme(frogBrand),

    // Primäre Brandfarben
    colorBrandBackground: "#22c55e",
    colorBrandBackgroundHover: "#16a34a",
    colorBrandForeground1: "#ecfdf5",
    colorBrandForeground2: "#d1fae5",

    // Ecken abgerundet
    borderRadiusMedium: "12px",
    borderRadiusLarge: "16px",

    // Oberflächenfarben
    colorNeutralBackground1: "#153d26",
    colorNeutralBackground2: "#064e3b",
    colorNeutralBackground3: "#065f46",

    // Schriftfarben
    colorNeutralForeground1: "#ecfdf5", // Standard-Text (weiß/grünlich)
    colorNeutralForeground2: "#a7f3d0", // Sekundärer Text
    colorNeutralForeground3: "#6ee7b7", // Noch schwächerer Text
  };

  return (
    <FluentProvider theme={frogTheme} style={{ minHeight: "100%", padding: "0px 20px 0px 20px" }}>
      <BrowserRouter>
        <Header />
        <div style={{ marginLeft: "75px" }}>
          <FrontendRoutes />
        </div>
      </BrowserRouter>
    </FluentProvider>
  );
}
