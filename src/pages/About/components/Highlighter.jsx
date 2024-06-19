import { Fragment } from "react";

const Highlighter = ({ children, highlight }) => {
  if (!highlight.trim()) return <>{children}</>;

  const regex = new RegExp(`(${highlight.trim()})`, 'gi');
  const parts = children.split(regex);

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
