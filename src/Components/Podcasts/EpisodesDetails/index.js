import React from "react";
import Button from "../../common/Button";
import "./style.css";
const Episodes = ({ index, title, description, audioFile, onClick }) => {
  return (
    <div style={{ width: "100%" }}>
      <h2 style={{ textAlign: "left", marginBottom: 0 }} className="ep-title">
        {index}.{title}
      </h2>
      <p style={{ marginLeft: "1.5rem" }} className="podcast-description ">
        {description}
      </p>
      <Button
        text={"play"}
        onClick={() => onClick(audioFile)}
        style={{ width: "100px" }}
      />
    </div>
  );
};

export default Episodes;
