import classNames from "classnames";

const Button = ({ handleClick, inverted, children }) => {
  return (
    <button
      className={classNames(
        "h-full w-full truncate rounded-md border p-4 duration-200 ease-in-out",
        { "border-red text-red hover:bg-red hover:text-white": inverted },
        { "border-white text-white hover:bg-white hover:text-red": !inverted }
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
