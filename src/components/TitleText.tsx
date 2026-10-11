import { Fragment } from "react";

/** Renders a title so hyphenated words (e.g. "E-commerce") never break across lines. */
export function TitleText({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          {word.includes("-") ? <span className="whitespace-nowrap">{word}</span> : word}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
