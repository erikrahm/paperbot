import React, { useState } from "react";

import { parseHaiku } from "../utils/parsers";

const DEFAULT_LINE = ["", 0];

const Haiku: React.FC = () => {
  const [lines, updateLines] = useState([DEFAULT_LINE]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateLines(
      event.currentTarget.value
        .split("\n")
        .map((line) =>
          line[0]?.length ? [line, parseHaiku(line)] : DEFAULT_LINE
        )
    );
  };

  const handleKeys = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && lines.length === 3) {
      event.preventDefault();
    }
  };

  return (
    <div>
      <div>Hi</div>
      <textarea onChange={handleChange} onKeyPress={handleKeys} />
      {lines.map((line, index) => (
        <p key={index}>{`${line[0]}: ${line[1]}/${
          (index + 1) % 2 === 0 ? "7" : "5"
        }`}</p>
      ))}
    </div>
  );
};

export default Haiku;
