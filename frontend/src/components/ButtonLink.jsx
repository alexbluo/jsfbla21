import Button from "./Button";

function ButtonLink({ link, tel, children }) {
  // render nothing if there is no link
  if (!link) return null;

  return (
    <a href={tel ? `tel:${link}` : link}>
      <Button>{children}</Button>
    </a>
  );
}

export default ButtonLink;
