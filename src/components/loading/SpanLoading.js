import "./SpanLoading.css";

import React from "react";

function SpanLoading() {
  return (
    <div className="overlay">
      <div className="cv-spinner">
        <span className="loader"></span>
      </div>
    </div>
  );
}

export default SpanLoading;
