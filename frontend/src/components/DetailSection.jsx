import classNames from "classnames";

const DetailSection = ({ header, order, children }) => {
  return (
    <section
      className={classNames(
        "flex aspect-square flex-col gap-2 overflow-auto p-8",
        { "bg-gold text-black": order === "odd" },
        { "bg-red text-white": order === "even" }
      )}
    >
      <h2 className="text-2xl">{header}</h2>
      <article className="box-border h-full overflow-auto">{children}</article>
    </section>
  );
};

export default DetailSection;
