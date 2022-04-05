import React from "react";

export const GoBack = () => {
  const goBack = () => {
    history.back();
  };

  return (
    <>
      <div className="col-1">
        <button className="go-back-button btn p-3" onClick={goBack}>
          <svg
            viewBox="0 0 24 24"
            className="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi customIcon go-back"
          >
            <g>
              <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            </g>
          </svg>
        </button>
      </div>
    </>
  );
};
