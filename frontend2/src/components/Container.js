import React from "react";

import "./container.css";

export const Container = () =>{
  return (
    <div className="main" id="botForm">
      <div className="inputfield">
        <p>Bot Name:</p>
        <input type="text" />
      </div>
      <div className="inputfield">
        <p>Bot Description:</p>
        <input type="text" className="desc" />
      </div>
      <button>Go!</button>
    </div>
  );
}
