import React, { useState } from "react";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
import { Redirect } from "react-router-dom";
import syllable from "syllable";

import {
  Mutation as HaikuMutation,
  MutationCreatePoemArgs,
  Poem,
} from "../../generated/graphql";
import { Colors } from "../../utils/constants";
import Button from "../library/Button";

const DEFAULT_LINE = ["", 0];

const GENERATE_LINES = (content: string) =>
  content.split("\n").map((line: string) => [line, syllable(line)]);

const HAIKU_MUTATION = gql`
  mutation SaveHaiku(
    $title: String!
    $content: String!
    $isPrivate: Boolean!
    $id: ID
  ) {
    createPoem(
      title: $title
      content: $content
      isPrivate: $isPrivate
      id: $id
    ) {
      _id
    }
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 10px;
`;

const Title = styled.input`
  width: 400px;
  padding: 5px;
  border: 2px solid ${Colors.blue};

  &:focus {
    outline: none;
  }
`;

const PrivateLabel = styled.label`
  position: absolute;
  top: -22px;
  right: 0;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PrivateCheckbox = styled.input`
  height: 16px;
  width: 16px;
`;

const HaikuAreaWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const HaikuArea = styled.textarea`
  text-align: center;
  padding: 40px 20px;
  width: 356px;
  resize: none;
  caret-color: ${Colors.blue};
  color: ${Colors.blue};
  border: 2px solid ${Colors.blue};

  &:focus {
    outline: none;
  }
`;

const HaikuCount = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  margin-top: 40px;
  margin-left: -32px;
`;

type LineSyllablesCountProps = {
  filled: boolean;
  over: boolean;
};
const LineSyllablesCount = styled.span<LineSyllablesCountProps>`
  color: ${({ filled }) => (filled ? Colors.blue : "#c1c1c1")};
  color: ${({ over }) => (over ? Colors.red : "")};
`;

interface LineSyllablesProps {
  current: number;
  total: number;
}

const LineSyllables: React.FC<LineSyllablesProps> = ({ current, total }) => (
  <LineSyllablesCount
    filled={current === total}
    over={current > total}
  >{`(${current}/${total})`}</LineSyllablesCount>
);

type HaikuEditViewProps = {
  poem?: Poem;
};

const HaikuEditView: React.FC<HaikuEditViewProps> = ({ poem }) => {
  const [lines, updateLines] = useState(
    poem ? GENERATE_LINES(poem.content) : [DEFAULT_LINE]
  );
  const [title, updateTitle] = useState(poem ? poem.title : "");
  const [isPrivate, updateIsPrivate] = useState(poem ? poem.isPrivate : false);
  const [fireSaveHaiku, { data }] = useMutation<
    HaikuMutation,
    MutationCreatePoemArgs
  >(HAIKU_MUTATION);

  if (data?.createPoem?._id) {
    return <Redirect to={`/haiku/${data?.createPoem?._id}`} />;
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateLines(
      event.currentTarget.value
        .split("\n")
        .map((line) =>
          line[0]?.length ? [line, syllable(line)] : DEFAULT_LINE
        )
    );
  };

  const handleKeys = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && lines.length === 3) {
      event.preventDefault();
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateTitle(event?.currentTarget.value);
  };

  const handlePrivateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateIsPrivate(event.currentTarget.checked);
  };

  const handleSave = () => {
    const content = lines.reduce((acc, curr, index) => {
      return `${acc}${index !== 0 ? "\n" : ""}${curr[0]}`;
    }, "");
    const variables = {
      title,
      content,
      isPrivate,
      ...(poem && { id: poem._id }),
    };
    fireSaveHaiku({ variables });
  };

  return (
    <>
      <TitleWrapper>
        <Title
          type="text"
          onChange={handleTitleChange}
          value={title}
          placeholder="Title"
        />
        <PrivateLabel htmlFor="private">
          Private
          <PrivateCheckbox
            type="checkbox"
            id="private"
            name="private"
            checked={isPrivate}
            onChange={handlePrivateChange}
          />
        </PrivateLabel>
      </TitleWrapper>
      <HaikuAreaWrapper>
        <HaikuArea
          onChange={handleChange}
          onKeyPress={handleKeys}
          defaultValue={poem?.content}
          rows={3}
        />
        <HaikuCount>
          {lines.map((line, index) => (
            <LineSyllables
              key={index}
              current={+line[1]}
              total={(index + 1) % 2 === 0 ? 7 : 5}
            />
          ))}
        </HaikuCount>
      </HaikuAreaWrapper>
      <Button clickHandler={handleSave}>{`${
        poem ? "Update" : "Save"
      } Haiku`}</Button>
    </>
  );
};

export default HaikuEditView;
