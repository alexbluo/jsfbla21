const ButtonLink = (props) => {
  return (
    <a href={props.link}>
      <button className="h-full w-full whitespace-nowrap rounded-md border border-white text-[80%] text-white duration-200 hover:bg-white hover:text-red">
        {props.children}
      </button>
    </a>
  );
};

export default ButtonLink;
