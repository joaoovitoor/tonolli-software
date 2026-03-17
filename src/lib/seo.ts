import siteData from '@/content/site.json';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteData.name,
    legalName: siteData.legalName,
    url: siteData.url,
    logo: `${siteData.url}/images/logo.svg`,
    description: siteData.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${siteData.contact.address.street}, ${siteData.contact.address.complement}`,
      addressLocality: siteData.contact.address.city,
      addressRegion: siteData.contact.address.state,
      postalCode: siteData.contact.address.zip,
      addressCountry: siteData.contact.address.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteData.contact.phone,
      contactType: 'sales',
      availableLanguage: ['Portuguese', 'English'],
    },
    sameAs: [siteData.social.linkedin, siteData.social.github],
    founder: {
      '@type': 'Person',
      name: siteData.founder.name,
      jobTitle: siteData.founder.role,
      url: siteData.founder.linkedin,
    },
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteData.name,
    url: siteData.url,
    description: siteData.description,
    publisher: {
      '@type': 'Organization',
      name: siteData.name,
    },
  };
}

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteData.name,
    url: siteData.url,
    telephone: siteData.contact.phone,
    email: siteData.contact.email,
    description: siteData.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${siteData.contact.address.street}, ${siteData.contact.address.complement}`,
      addressLocality: siteData.contact.address.city,
      addressRegion: siteData.contact.address.state,
      postalCode: siteData.contact.address.zip,
      addressCountry: siteData.contact.address.country,
    },
    priceRange: '$$$',
    areaServed: [
      { '@type': 'Country', name: 'Brazil' },
      { '@type': 'Country', name: 'United States' },
    ],
    serviceType: [
      'Custom Software Development',
      'Artificial Intelligence Solutions',
      'Legacy System Modernization',
      'Software Architecture Consulting',
    ],
  };
}

export function serviceJsonLd(service: {
  title: string;
  description: string;
  id: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: siteData.name,
      url: siteData.url,
    },
    url: `${siteData.url}/servicos#${service.id}`,
    areaServed: { '@type': 'Country', name: 'Brazil' },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
