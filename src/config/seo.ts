export const baseUrl = 'https://ama-prisma.vercel.app/'
export const baseEmail = 'norman@prisma.io'

export const defaultSEO = {
  title: 'Daniel Norman',
  description: 'Ask me anything',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    site_name: 'Daniel Norman',
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
