import ContentLoader from "react-content-loader";

function AccordionPreloader(props) {
  return (
    <ContentLoader viewBox="0 0 400 288" preserveAspectRatio="none" {...props}>
      <rect x="0" y="0" width="400" height="69" />
      <rect x="0" y="73" width="400" height="69" />
      <rect x="0" y="146" width="400" height="69" />
      <rect x="0" y="219" width="400" height="69" />
    </ContentLoader>
  );
}

export default AccordionPreloader;
