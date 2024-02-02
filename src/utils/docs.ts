import { I18n } from "@docusaurus/types";

export const generateDocPath = (docId: string, i18n: I18n): string => {
  if (i18n.currentLocale !== i18n.defaultLocale) {
    return `/${i18n.currentLocale}/docs/${docId}`;
  }
  return `/docs/${docId}`;
};
