import React from "react";

function Languagecomponent(props) {
  return (
    <>
      <img
        src={
          props.image ||
          "https://cdn.blankstyle.com/files/imagefield_default_images/notfound_0.png"
        }
        alt={props.languageNameEnglish}
        className="image"
      />
      <p className="title">{props.languageNameNative}</p>
    </>
  );
}

export default Languagecomponent;
