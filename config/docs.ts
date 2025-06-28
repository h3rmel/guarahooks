import { DashboardConfig } from '@/types/docs';

export const docsConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Docs',
      href: '/docs',
    },
    {
      title: 'Hooks',
      href: '/hooks',
    },
    {
      title: 'Showcase',
      href: '/showcase',
    },
  ],
  sidebarNav: [
    {
      title: 'Get Started',
      items: [
        {
          title: 'Introduction',
          href: '/docs',
          items: [],
        },
        {
          title: 'Installation',
          href: '/docs/installation',
          items: [],
        },
        {
          title: 'CLI',
          href: '/docs/cli',
          items: [],
        },
        {
          title: 'Resources',
          href: '/docs/resources',
          items: [],
        },
        {
          title: 'Open in v0',
          href: '/docs/v0',
          items: [],
        },
        {
          title: 'Changelog',
          href: '/docs/changelog',
          items: [],
          label: 'New',
        },
      ],
    },
    {
      title: 'UI and DOM',
      icon: 'Pages',
      items: [
        {
          title: 'use-window-size',
          href: '/docs/hooks/use-window-size',
        },
        {
          title: 'use-keypress',
          href: '/docs/hooks/use-keypress',
        },
        {
          title: 'use-click-outside',
          href: '/docs/hooks/use-click-outside',
        },
        {
          title: 'use-media',
          href: '/docs/hooks/use-media',
        },
        {
          title: 'use-orientation',
          href: '/docs/hooks/use-orientation',
        },
        {
          title: 'use-mouse',
          href: '/docs/hooks/use-mouse',
        },
        {
          title: 'use-event-listener',
          href: '/docs/hooks/use-event-listener',
        },
        {
          title: 'use-fullscreen',
          href: '/docs/hooks/use-fullscreen',
        },
        {
          title: 'use-confirm',
          href: '/docs/hooks/use-confirm',
        },
        {
          title: 'use-notifications',
          href: '/docs/hooks/use-notifications',
        },
        {
          title: 'use-mutation-observer',
          href: '/docs/hooks/use-mutation-observer',
        },
        {
          title: 'use-resize-observer',
          href: '/docs/hooks/use-resize-observer',
        },
        {
          title: 'use-scroll-position',
          href: '/docs/hooks/use-scroll-position',
        },
        {
          title: 'use-intersection-observer',
          href: '/docs/hooks/use-intersection-observer',
        },
        {
          title: 'use-scroll-lock',
          href: '/docs/hooks/use-scroll-lock',
        },
      ],
    },
    {
      title: 'State Management',
      icon: 'Swap',
      items: [
        {
          title: 'use-toggle',
          href: '/docs/hooks/use-toggle',
        },
        {
          title: 'use-disclosure',
          href: '/docs/hooks/use-disclosure',
        },
        {
          title: 'use-set',
          href: '/docs/hooks/use-set',
        },
        {
          title: 'use-map',
          href: '/docs/hooks/use-map',
        },
        {
          title: 'use-debounce-callback',
          href: '/docs/hooks/use-debounce-callback',
        },
        {
          title: 'use-debounce-state',
          href: '/docs/hooks/use-debounce-state',
        },
        {
          title: 'use-local-storage',
          href: '/docs/hooks/use-local-storage',
        },
        {
          title: 'use-session-storage',
          href: '/docs/hooks/use-session-storage',
        },
        {
          title: 'use-pagination',
          href: '/docs/hooks/use-pagination',
        },
      ],
    },
    {
      title: 'Utilities',
      icon: 'Tools',
      items: [
        {
          title: 'use-abort-controller',
          href: '/docs/hooks/use-abort-controller',
        },
        {
          title: 'use-copy-to-clipboard',
          href: '/docs/hooks/use-copy-to-clipboard',
        },
        {
          title: 'use-os',
          href: '/docs/hooks/use-os',
        },
        {
          title: 'use-idle',
          href: '/docs/hooks/use-idle',
        },
        {
          title: 'use-page-leave',
          href: '/docs/hooks/use-page-leave',
        },
        {
          title: 'use-fetch',
          href: '/docs/hooks/use-fetch',
        },
        {
          title: 'use-axios',
          href: '/docs/hooks/use-axios',
        },
        {
          title: 'use-cookie',
          href: '/docs/hooks/use-cookie',
        },
        {
          title: 'use-page-title',
          href: '/docs/hooks/use-page-title',
        },
        {
          title: 'use-interval',
          href: '/docs/hooks/use-interval',
        },
        {
          title: 'use-timeout',
          href: '/docs/hooks/use-timeout',
        },
        {
          title: 'use-battery-status',
          href: '/docs/hooks/use-battery-status',
        },
        {
          title: 'use-geolocation',
          href: '/docs/hooks/use-geolocation',
        },
      ],
    },
    {
      title: 'Form',
      icon: 'Survey',
      items: [
        {
          title: 'use-react-hook-form',
          href: '/docs/hooks/use-react-hook-form',
          label: 'New',
        },
        {
          title: 'use-formik',
          href: '/docs/hooks/use-formik',
          label: 'New',
        },
      ],
    },
    {
      title: 'Auth',
      icon: 'Lock',
      items: [
        {
          title: 'use-better-auth',
          href: '/docs/hooks/use-better-auth',
          label: 'New',
        },
        {
          title: 'use-next-auth',
          href: '/docs/hooks/use-next-auth',
          label: 'New',
        },
      ],
    },
    {
      title: 'Payments',
      icon: 'Tools',
      items: [
        {
          title: 'use-stripe',
          href: '/docs/hooks/use-stripe',
          label: 'New',
        },
        {
          title: 'use-mercadopago',
          href: '/docs/hooks/use-mercadopago',
          label: 'New',
        },
        {
          title: 'use-abacate-pay',
          href: '/docs/hooks/use-abacate-pay',
          label: 'New',
        },
        {
          title: 'use-lemon-squeezy',
          href: '/docs/hooks/use-lemon-squeezy',
          label: 'New',
        },
        {
          title: 'use-paypal',
          href: '/docs/hooks/use-paypal',
          label: 'New',
        },
        {
          title: 'use-wide-pay',
          href: '/docs/hooks/use-wide-pay',
          label: 'New',
        },
        {
          title: 'use-vindi',
          href: '/docs/hooks/use-vindi',
          label: 'New',
        },
        {
          title: 'use-apple-pay',
          href: '/docs/hooks/use-apple-pay',
          label: 'New',
        },
        {
          title: 'use-amazon-pay',
          href: '/docs/hooks/use-amazon-pay',
          label: 'New',
        },
        {
          title: 'use-ali-pay',
          href: '/docs/hooks/use-ali-pay',
          label: 'New',
        },
        {
          title: 'use-two-checkout',
          href: '/docs/hooks/use-two-checkout',
          label: 'New',
        },
        {
          title: 'use-stax-pay',
          href: '/docs/hooks/use-stax-pay',
          label: 'New',
        },
        {
          title: 'use-square',
          href: '/docs/hooks/use-square',
          label: 'New',
        },
        {
          title: 'use-payoneer',
          href: '/docs/hooks/use-payoneer',
          label: 'New',
        },
        {
          title: 'use-pagseguro',
          href: '/docs/hooks/use-pagseguro',
          label: 'New',
        },
        {
          title: 'use-pagbank',
          href: '/docs/hooks/use-pagbank',
          label: 'New',
        },
        {
          title: 'use-iugu',
          href: '/docs/hooks/use-iugu',
          label: 'New',
        },
        {
          title: 'use-pagarme',
          href: '/docs/hooks/use-pagarme',
          label: 'New',
        },
        {
          title: 'use-transire',
          href: '/docs/hooks/use-transire',
          label: 'New',
        },
        {
          title: 'use-pag-brasil',
          href: '/docs/hooks/use-pag-brasil',
          label: 'New',
        },
        {
          title: 'use-stone',
          href: '/docs/hooks/use-stone',
          label: 'New',
        },
        {
          title: 'use-superlogica',
          href: '/docs/hooks/use-superlogica',
          label: 'New',
        },
        {
          title: 'use-yapay',
          href: '/docs/hooks/use-yapay',
          label: 'New',
        },
        {
          title: 'use-zigpay',
          href: '/docs/hooks/use-zigpay',
          label: 'New',
        },
        {
          title: 'use-boa-compra',
          href: '/docs/hooks/use-boa-compra',
          label: 'New',
        },
        {
          title: 'use-celcoin',
          href: '/docs/hooks/use-celcoin',
          label: 'New',
        },
        {
          title: 'use-acqio',
          href: '/docs/hooks/use-acqio',
          label: 'New',
        },
        {
          title: 'use-cappta',
          href: '/docs/hooks/use-cappta',
          label: 'New',
        },
        {
          title: 'use-ebanx',
          href: '/docs/hooks/use-ebanx',
          label: 'New',
        },
        {
          title: 'use-gerenciament',
          href: '/docs/hooks/use-gerenciament',
          label: 'New',
        },
        {
          title: 'use-juno',
          href: '/docs/hooks/use-juno',
          label: 'New',
        },
        {
          title: 'use-koin',
          href: '/docs/hooks/use-koin',
          label: 'New',
        },
        {
          title: 'use-mova',
          href: '/docs/hooks/use-mova',
          label: 'New',
        },
        {
          title: 'use-cloud-walk',
          href: '/docs/hooks/use-cloud-walk',
          label: 'New',
        },
        {
          title: 'use-efi-bank',
          href: '/docs/hooks/use-efi-bank',
          label: 'New',
        },
      ],
    },
    {
      title: 'Lifecycle',
      icon: 'Refresh',
      items: [
        {
          title: 'use-on-mount',
          href: '/docs/hooks/use-on-mount',
        },
        {
          title: 'use-on-unmount',
          href: '/docs/hooks/use-on-unmount',
        },
        {
          title: 'use-did-update',
          href: '/docs/hooks/use-did-update',
        },
        {
          title: 'use-isomorphic-layout-effect',
          href: '/docs/hooks/use-isomorphic-layout-effect',
        },
      ],
    },
  ],
};
