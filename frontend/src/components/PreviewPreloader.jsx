import ContentLoader from "react-content-loader";

export default function PreviewPreloader(props) {
  // !props CAN be passed like that: they will be automatically separated and stuff
  // https://stackoverflow.com/questions/49081549/passing-object-as-props-to-jsx
  // 333
  return (
    <ContentLoader viewBox="0 0 280 280" {...props}>
      <rect x="3" y="3" rx="10" ry="10" width="300" height="180" />
      <rect x="6" y="190" rx="0" ry="0" width="300" height="20" />
      <rect x="4" y="215" rx="0" ry="0" width="300" height="20" />
    </ContentLoader>
  );
}
