import ContentLoader from "react-content-loader";

function PreviewPreloader(props) {
  return (
    <ContentLoader viewBox="0 0 300 300" {...props}>
      <rect x="0" y="0" rx="10" ry="10" width="300" height="240" />
      <rect x="0" y="250" rx="5" ry="5" width="300" height="20" />
      <rect x="0" y="280" rx="5" ry="5" width="300" height="20" />
    </ContentLoader>
  );
}

export default PreviewPreloader;
