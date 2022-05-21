const ButtonLink = ({ link, children }) => {
  return (
    <a href={link}>
      <button className="h-full w-full whitespace-nowrap rounded-md border border-white text-[80%] text-white duration-200 hover:bg-white hover:text-red">
        {children}
      </button>
    </a>
  );
};

export default ButtonLink;
