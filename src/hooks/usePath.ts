import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

// TODO(daxiongya): consider the back-end processing of docs prefix
const usePath = () => {
  const { i18n } = useDocusaurusContext();

  return {
    generateDocPath: (docId: string): string => {
      if (i18n.currentLocale !== i18n.defaultLocale) {
        return `/${i18n.currentLocale}/docs/${docId}`;
      }
      return `/docs/${docId}`;
    },
  };
};

export default usePath;
