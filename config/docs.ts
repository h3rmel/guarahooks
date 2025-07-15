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
    // UI and DOM
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
        {
          title: 'use-eye-dropper',
          href: '/docs/hooks/use-eye-dropper',
          label: 'New',
        },
      ],
    },
    // State Management
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
    // Utilities
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
    // Data Fetching
    {
      title: 'Data Fetching',
      icon: 'Download',
      items: [
        {
          title: 'use-fetch',
          href: '/docs/hooks/use-fetch',
        },
        {
          title: 'use-axios',
          href: '/docs/hooks/use-axios',
        },
        {
          title: 'use-ky',
          href: '/docs/hooks/use-ky',
          label: 'New',
        },
      ],
    },
    // Form
    {
      title: 'Form',
      icon: 'Survey',
      items: [
        {
          title: 'use-react-hook-form',
          href: '/docs/hooks/use-react-hook-form',
        },
        {
          title: 'use-formik',
          href: '/docs/hooks/use-formik',
        },
      ],
    },
    // Auth
    {
      title: 'Auth',
      icon: 'Lock',
      items: [
        {
          title: 'use-better-auth',
          href: '/docs/hooks/use-better-auth',
        },
        {
          title: 'use-next-auth',
          href: '/docs/hooks/use-next-auth',
        },
      ],
    },
    // Lifecycle
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
