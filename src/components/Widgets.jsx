import React from "react";

// mui

// utils
import SearchComp from "../utils/SearchComp";

const Widgets = () => {
  return (
    <div>
      <div className="widgets mt-2">
        {/* <div className="widgets__input mb-4">
          <SearchIcon className="widgets__searchIcon" />
          <input placeholder="Search Twitter" type="text" />
        </div> */}
        <SearchComp />
      </div>
    </div>
  );
};

export default Widgets;
