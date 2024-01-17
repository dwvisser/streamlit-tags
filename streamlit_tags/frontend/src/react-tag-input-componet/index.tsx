import { css, setup } from "goober";
import React, { useEffect, useState } from "react";

import cc from "./classnames";
import Tag from "./tag";
import { Hint } from "../react-autocomplete-hint";



export interface IHintOption {
  id: string | number;
  label: string;
}

export interface TagsInputProps {
  name?: string;
  placeHolder?: string;
  value: string[];
  onChange?: (tags: string[]) => void;
  suggestions: Array<string> | Array<IHintOption>;
  onBlur?: any;
  separators?: string[];
  onExisting?: (tag: string) => void;
  onRemoved?: (tag: string) => void;
  maxTags: number;
}

// initialize goober once
setup(React.createElement);

const RTIContainer = css({
  "--rti-bg": "#fff",
  "--rti-border": "#ccc",
  "--rti-main": "#3182ce",
  "--rti-radius": "0.375rem",
  "--rti-s": "0.5rem",
  "--rti-tag": "#edf2f7",
  "--rti-tag-remove": "#e53e3e",

  "*": {
    boxSizing: "border-box",
    transition: "all 0.2s ease",
  },

  alignItems: "center",
  bg: "var(--rti-bg)",
  border: "1px solid var(--rti-border)",
  borderRadius: "var(--rti-radius)",
  display: "flex",
  flexWrap: "wrap",
  gap: "var(--rti-s)",
  lineHeight: 1.4,
  padding: "var(--rti-s)",

  "&:focus-within": {
    borderColor: "var(--rti-main)",
    boxShadow: "var(--rti-main) 0px 0px 0px 1px",
  },
});

const RTIInput = css({
  border: 0,
  outline: 0,
  fontSize: "inherit",
  lineHeight: "inherit",
  width: "200%",
});

const defaultSeparators = ["Enter"];

export const TagsInput = ({
  name,
  placeHolder,
  value,
  onChange,
  onBlur,
  separators,
  onExisting,
  onRemoved,
  suggestions,
  maxTags
}: TagsInputProps) => {
  let [tags, setTags] = useState(value || []);

  // Call the provided onChange (from keywords.tsx) whenever tags state changes.
  useEffect(() => {
    onChange && onChange(tags);
  }, [tags]);  // tags is really the only dep to cause this effect

  if (maxTags >= 0) {
    let remainingLimit = Math.max(maxTags, 0)
    tags = tags.slice(0, remainingLimit)
  }

  const addTag = (text: string) => {
    if (tags.includes(text)) {
      // onExisting not provided by keywords.tsx, so always returns
      onExisting && onExisting(text);
      return;
    }
    // If text is a new tag, add it
    setTags([...tags, text]);
  }

  const handleOnKeyUp = (e) => {
    e.stopPropagation();
    const text = e.target.value;

    // Remove most recent tag if input is empty and backspace was pressed
    if (e.key === "Backspace" && tags.length && !text) {
      setTags(tags.slice(0, -1));
    }

    // If ENTER was pressed after some tag text (separators prop not passed in
    // by keywords.tsx)
    if (text && (separators || defaultSeparators).includes(e.key)) {
      addTag(text);
      e.target.value = "";
      e.preventDefault();
    }
  };

  const onTagRemove = (text: string) => {
    // Replace tags with all but the removed tag
    setTags(tags.filter(tag => tag !== text));
    // next line does nothing since onRemoved no provided by keywords.tsx
    onRemoved && onRemoved(text);
  };

  return (
    <div>
      <div aria-labelledby={name} className={cc("rti--container", RTIContainer)}>
        {tags.map(tag => (
          <Tag key={tag} text={tag} remove={onTagRemove} />
        ))}
      </div>
      <Hint options={suggestions} allowTabFill={true} addTag={addTag}>
        <input
          className={cc("rti--input", RTIInput)}
          type="text"
          name={name}
          placeholder={placeHolder}
          onKeyDown={handleOnKeyUp}
          onBlur={onBlur}
        />
      </Hint>
    </div>
  );
};