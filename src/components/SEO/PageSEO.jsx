import { Helmet } from "react-helmet-async";

function PageSEO({ title, description, noIndex = false }) {
  return (
    <Helmet>
      <title>{title} | NamlaTech Hotel Management</title>

      <meta name="description" content={description.slice(0, 160)} />

      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />

      <meta property="og:type" content="website" />

      <meta
        property="og:title"
        content={`${title} | NamlaTech Hotel Management`}
      />

      <meta property="og:description" content={description.slice(0, 160)} />
    </Helmet>
  );
}

export default PageSEO;
