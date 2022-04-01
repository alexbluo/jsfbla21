export default function ButtonLink(props) {
  return (
    <a
      className="flex h-full w-full items-center justify-center"
      href={props.link}
    >
      <button className="h-full w-full whitespace-nowrap rounded-md bg-red text-white shadow-md duration-200 hover:brightness-75">
        {props.children}
      </button>
    </a>
  );
}
