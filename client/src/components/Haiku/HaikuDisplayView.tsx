import React from "react";
import styled from "styled-components";

import { Poem } from "../../generated/graphql";
import Button from "../library/Button";

const TitleDisplayWrapper = styled.div`
  position: relative;
  margin-bottom: 10px;
  font-style: italic;
`;

const HaikuDisplayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  text-align: center;
`;

type HaikuDisplayViewProps = {
  id: string;
  poem: Poem;
};

const HaikuDisplayView: React.FC<HaikuDisplayViewProps> = ({ poem, id }) => (
  <>
    <TitleDisplayWrapper>
      {`${poem.title} - by ${poem.author}`}
    </TitleDisplayWrapper>
    <HaikuDisplayWrapper>
      {poem.content.split("\n").map((line, index) => (
        <pre key={index}>{line}</pre>
      ))}
    </HaikuDisplayWrapper>
    <Button href={`/haiku/${id}/edit`}>Edit Haiku</Button>
  </>
);

export default HaikuDisplayView;
