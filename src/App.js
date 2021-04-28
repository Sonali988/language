import React, { useCallback, useEffect, useState } from "react";
import "./assets/style.css";
import axios from "axios";
import _ from "lodash";
import Languagecomponent from "./components/LanguageComponent";
import { LanguageButtonText, SearchPlaceholder } from "./utility/Constants";

function App() {
  const [languageData, setLanguageData] = useState([]);
  const [search, setSearch] = useState("");

  const getLanguage = async () => {
    const response = await axios.get("https://www.mist-one.com/pub/languages");
    setLanguageData(response.status === 200 && response.data.data.rows);
  };

  useEffect(() => {
    getLanguage();
  }, []);

  const searchResult = useCallback(
    (value) => {
      setSearch(value);
      const filterData = languageData.filter((lang) => {
        const langName = lang.languageNameEnglish.toLowerCase();
        return langName.includes(value);
      });
      setLanguageData(filterData);
    },
    [languageData]
  );

  return (
    <div className="page-wrap">
      <div className="heading">
        <input
          onChange={(e) => searchResult(e.target.value)}
          value={search}
          placeholder={SearchPlaceholder}
          className="search-bar"
        />
        <button
          className="all-language-btn"
          onClick={() => {
            getLanguage();
            setSearch("");
          }}
        >
          {LanguageButtonText}
        </button>
      </div>
      <div className="container">
        {_.map(languageData, (lang) => {
          return (
            <div key={lang.id} className="container-items">
              <Languagecomponent
                id={lang.id}
                image={lang.image}
                languageNameEnglish={lang.languageNameEnglish}
                languageNameNative={lang.languageNameNative}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
