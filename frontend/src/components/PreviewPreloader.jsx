import ContentLoader from "react-content-loader";

export default function PreviewPreloader(props) {
  return (
    // div required for safari
    <div>
      <ContentLoader viewBox="0 0 300 300" {...props}>
        <rect x="0" y="0" rx="10" ry="10" width="300" height="240" />
        <rect x="0" y="250" rx="5" ry="5" width="300" height="20" />
        <rect x="0" y="280" rx="5" ry="5" width="300" height="20" />
      </ContentLoader>
    </div>
  );
}
