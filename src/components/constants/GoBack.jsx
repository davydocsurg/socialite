import React from "react";

export default function GoBack() {
  const goBack = () => {
    history.back();
  };

  return (
    <>
      <div className="go-back-div">
        <h3 className="fas fa-arrow-left mt-2 go-back" onClick={goBack}></h3>
      </div>
    </>
  );
}
