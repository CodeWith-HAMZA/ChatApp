import React from "react";

interface Props {
  readonly text: string;
  readonly position: "right" | "left";
}
const Message: React.FC<Props> = ({ text, position }: Props): JSX.Element => {
  return (
    <div
      className={`flex ${position === "right" ? "flex-row-reverse" : ""} m-1`}
    >
      <p className="bg-blue-500 text-white rounded-t-lg rounded-br-lg py-1.5 px-3 max-w-[15rem] text-xs break-all">
        {text}
      </p>
    </div>
  );
};

export default Message;
