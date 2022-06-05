const ButtonLink = ({ link, tel, children }) => {
  // render nothing if there is no link
  if (!link) return null;

  return (
    <a href={tel ? "tel:" + link : link}>
      <button className="h-full w-full whitespace-nowrap rounded-md border border-white text-[80%] text-white duration-200 hover:bg-white hover:text-red">
        {children}
      </button>
    </a>
  );
};

export default ButtonLink;
