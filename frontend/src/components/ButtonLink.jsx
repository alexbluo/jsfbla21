export default function ButtonLink(props) {
  return (
    <a
      href={props.link}
    >
      <button className="h-full w-full whitespace-nowrap text-[80%] rounded-md border border-white text-white duration-200 hover:bg-white hover:text-red">
        {props.children}
      </button>
    </a>
  );
}
