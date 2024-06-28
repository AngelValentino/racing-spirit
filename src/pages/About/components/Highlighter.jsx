import { Fragment } from "react";

const Highlighter = ({ children, highlight }) => {
  // If highlight is empty or only whitespace, return the original children
  if (!highlight.trim()) return <>{children}</>;

  /* Creates a regular expression object to match occurrences of the 'highlight' string,
  ignoring case and trimming any leading or trailing whitespace. */
  const regex = new RegExp(`(${highlight.trim()})`, 'gi');
  /* The parentheses creates a capturing group for the regular expression, allowing the matched
  substring to be also included in the split array, if not it would be ignored. */
  const parts = children.split(regex); // Splits children text into parts based on the regular expression

  // Return a fragment containing the highlighted span and non-highlighted fragments
  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) 
          ? <span key={index} className="highlighted">{part}</span>
          : <Fragment key={index}>{part}</Fragment>
      )}
    </>
  );
};

export default Highlighter;