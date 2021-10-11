export const baseUrl = 'https://brianlovin.com'
export const baseEmail = 'hi@brianlovin.com'

export const defaultSEO = {
  title: 'Steve McQueen',
  description:
    'Ask me anything',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    site_name: 'Steve McQueen',
    images: [
      {
        url: `${baseUrl}/static/meta/og-image.png`,
        alt: '',
      },
    ],
  },
  twitter: {
    handle: '@prisma',
    site: '@prisma',
    cardType: 'summary_large_image',
  },
}

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export function extendSEO(options: SEOProps) {
  const images = options.image
    ? [{ url: `${baseUrl}/static/${options.image}` }]
    : defaultSEO.openGraph.images

  return {
    ...defaultSEO,
    ...options,
    url: `${baseUrl}/${options.url}`,
    openGraph: {
      ...defaultSEO.openGraph,
      images,
      url: `${baseUrl}/${options.url}`,
    },
  }
}
