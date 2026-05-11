export const SITE_URL = "https://tenxtalent.ai";
export const SITE_NAME = "tenX";
export const DEFAULT_DESCRIPTION =
  "tenX is the AI-verified engineering network for teams hiring model-fluent builders across Claude, OpenAI, Google, RAG, agents, evals, and MLOps.";

export type SchemaObject = Record<string, unknown>;

export type Breadcrumb = {
  name: string;
  path: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

export function organizationSchema(): SchemaObject {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/tenx-logo.svg"),
    foundingDate: "2026",
    areaServed: ["New Zealand", "Australia"],
    sameAs: []
  };
}

export function websiteSchema(): SchemaObject {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      "@id": `${SITE_URL}/#organization`
    },
    inLanguage: "en-NZ"
  };
}

export function breadcrumbSchema(items: Breadcrumb[]): SchemaObject {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function faqPageSchema(items: FaqItem[]): SchemaObject {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}): SchemaObject {
  return {
    "@type": "Article",
    headline: input.title,
    description: input.description,
    author: {
      "@type": "Person",
      name: input.author ?? "tenX editorial"
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`
    },
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    mainEntityOfPage: absoluteUrl(input.path),
    inLanguage: "en-NZ"
  };
}

export function jobPostingSchema(input: {
  title: string;
  description: string;
  path: string;
  datePosted?: string;
  locationName?: string;
  country?: string;
}): SchemaObject {
  return {
    "@type": "JobPosting",
    title: input.title,
    description: input.description,
    datePosted: input.datePosted ?? "2026-05-11",
    employmentType: ["FULL_TIME", "CONTRACTOR"],
    hiringOrganization: {
      "@id": `${SITE_URL}/#organization`
    },
    applicantLocationRequirements: {
      "@type": "Country",
      name: input.country ?? "New Zealand"
    },
    jobLocationType: "TELECOMMUTE",
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: input.locationName ?? "New Zealand",
        addressCountry: input.country ?? "NZ"
      }
    },
    url: absoluteUrl(input.path)
  };
}

export function collectionPageSchema(input: {
  title: string;
  description: string;
  path: string;
}): SchemaObject {
  return {
    "@type": "CollectionPage",
    name: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    inLanguage: "en-NZ"
  };
}
