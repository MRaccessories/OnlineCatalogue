import "./App.css";
import React, { useState } from "react";
import ModeSetter from "./MyComponents/descision";

function App() {
  const [SearchData, setSearchData] = useState({data: "",cond: false,});

  const SearchHandler = (e) => {
    var SearchValue = e.target.value;
    SearchValue = SearchValue.trimStart();
    if (SearchValue.length > 0) {
      setSearchData({ data: SearchValue, cond: true });
    } else {
      setSearchData({ data: "", cond: false });
    }
  };

  return (
        <>
          <div className="centermaker">
            <div className="NavBar"></div>
            <div className="spacer-col"></div>
            <input
              className="SearchBar"
              placeholder="Search.."
              value={SearchData.data}
              onChange={SearchHandler}
            ></input>
            <div className="spacer-col"></div>
          </div>
          <ModeSetter data={SearchData} />
    </>
  );
}

export default App;
