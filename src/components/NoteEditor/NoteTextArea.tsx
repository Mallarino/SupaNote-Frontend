import { forwardRef } from "react";

type Props = {
  value: string;
  placeholder: string;
  readOnly: boolean;
  onChange: (value: string) => void;
  noteColor: string;
  bold?: boolean;
};

const NoteTextarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ value, placeholder, readOnly, onChange, noteColor, bold }, ref) => {
    return (
      <textarea
        ref={ref}
        className="form-control"
        style={{
          resize: "none",
          overflow: "hidden",
          backgroundColor: noteColor,
          border: "none",
          width: "100%",
          minHeight: "50px",
          fontWeight: bold ? "bold" : "normal",
        }}
        placeholder={placeholder}
        readOnly={readOnly}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
);

export default NoteTextarea;
