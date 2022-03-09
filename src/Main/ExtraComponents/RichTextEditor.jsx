import React from "react";
import JoditEditor from "jodit-react";
import { useRef } from "react";

const RichTextEditor = ({ ivalue, setDetails }) => {
  const ref = useRef(null);
  return (
    <>
      <div className="card card-body">
        <JoditEditor
          ref={ref}
          onChange={(content) => setDetails(content)}
          value={ivalue}
        />
      </div>
    </>
  );
};

export default RichTextEditor;
