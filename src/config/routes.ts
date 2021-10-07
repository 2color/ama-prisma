import { extendSEO, defaultSEO } from './seo'

const routes = {
  home: {
    label: 'Home',
    path: '/',
    seo: defaultSEO,
  },
  ama: {
    label: 'Ask Me Anything',
    path: '/',
    seo: extendSEO({
      title: 'Ask Me Anything',
      description: 'Answering questions, just for fun.',
      image: 'meta/ama.png',
      url: 'ama',
    }),
  },
  login: {
    label: 'Login',
    path: '/login',
    seo: extendSEO({
      title: 'Login',
      description: 'What do you think you’re doing?',
      url: 'login',
    }),
  },
}

export default routes
