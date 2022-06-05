import classNames from "classnames";

const DetailSection = ({ header, bg, text, children }) => {
  return (
    <div className="flex aspect-square flex-col gap-2 overflow-y-auto bg-gold px-8 py-4">
      <h2 className="text-2xl">{header}</h2>
      {children}
    </div>
  );
};

export default DetailSection;
