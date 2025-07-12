import { Registry } from 'shadcn/registry';

export const hooks: Registry['items'] = [
  {
    name: 'use-window-size',
    type: 'registry:hook',
    title: 'UseWindowSize',
    description: "Tracks the current window's dimensions.",
    files: [
      {
        path: 'registry/hooks/use-window-size.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-window-size.tsx',
      },
    ],
    categories: ['ui-and-dom'],
  },
  {
    name: 'use-previous',
    type: 'registry:hook',
    title: 'UsePrevious',
    description: 'Tracks the previous value of a state.',
    files: [
      {
        path: 'registry/hooks/use-previous.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-previous.tsx',
      },
    ],
    categories: ['ui-and-dom'],
  },
  {
    name: 'use-media',
    type: 'registry:hook',
    title: 'UseMedia',
    description: 'Checks if the current window matches a media query.',
    files: [
      {
        path: 'registry/hooks/use-media.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-media.tsx',
      },
    ],
    categories: ['ui-and-dom'],
  },
  {
    name: 'use-mouse',
    type: 'registry:hook',
    title: 'UseMouse',
    description: 'Tracks the mouse position in the element and document.',
    files: [
      {
        path: 'registry/hooks/use-mouse.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-mouse.tsx',
      },
    ],
    categories: ['ui-and-dom'],
  },
  {
    name: 'use-keypress',
    type: 'registry:hook',
    title: 'UseKeypress',
    description: 'Tracks keyboard combinations and key presses.',
    files: [
      {
        path: 'registry/hooks/use-keypress.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-keypress.tsx',
      },
    ],
    categories: ['ui-and-dom'],
  },
  {
    name: 'use-orientation',
    type: 'registry:hook',
    title: 'UseOrientation',
    description: 'Tracks the current orientation of the device.',
    files: [
      {
        path: 'registry/hooks/use-orientation.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-orientation.tsx',
      },
    ],
    categories: ['ui-and-dom'],
  },
  {
    name: 'use-intersection-observer',
    type: 'registry:hook',
    title: 'UseIntersectionObserver',
    description:
      'Observes when an element intersects the viewport or a root element.',
    files: [
      {
        path: 'registry/hooks/use-intersection-observer.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-intersection-observer.tsx',
      },
    ],
    categories: ['ui-and-dom'],
  },
  {
    name: 'use-toggle',
    type: 'registry:hook',
    title: 'UseToggle',
    description: 'Controls a boolean state with a toggler.',
    files: [
      {
        path: 'registry/hooks/use-toggle.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-toggle.tsx',
      },
    ],
    categories: ['state-management'],
  },
  {
    name: 'use-set',
    type: 'registry:hook',
    title: 'UseSet',
    description: 'Manages a Set of items with ease.',
    files: [
      {
        path: 'registry/hooks/use-set.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-set.tsx',
      },
    ],
    categories: ['state-management'],
  },
  {
    name: 'use-map',
    type: 'registry:hook',
    title: 'UseMap',
    description: 'Manages a Map of key/value pairs with ease.',
    files: [
      {
        path: 'registry/hooks/use-map.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-map.tsx',
      },
    ],
    categories: ['state-management'],
  },
  {
    name: 'use-local-storage',
    type: 'registry:hook',
    title: 'UseLocalStorage',
    description: 'Synchronizes a value with localStorage.',
    files: [
      {
        path: 'registry/hooks/use-local-storage.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-local-storage.tsx',
      },
    ],
    categories: ['state-management'],
  },
  {
    name: 'use-session-storage',
    type: 'registry:hook',
    title: 'UseSessionStorage',
    description: 'Synchronizes a value with sessionStorage.',
    files: [
      {
        path: 'registry/hooks/use-session-storage.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-session-storage.tsx',
      },
    ],
    categories: ['state-management'],
  },
  {
    name: 'use-cookie',
    type: 'registry:hook',
    title: 'UseCookie',
    description: 'Synchronizes a value with cookies.',
    files: [
      {
        path: 'registry/hooks/use-cookie.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-cookie.tsx',
      },
    ],
    categories: ['utilities'],
  },
  {
    name: 'use-copy-to-clipboard',
    type: 'registry:hook',
    title: 'UseCopyToClipboard',
    description: 'Copies text to the clipboard.',
    files: [
      {
        path: 'registry/hooks/use-copy-to-clipboard.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-copy-to-clipboard.tsx',
      },
    ],
    categories: ['utilities'],
  },
  {
    name: 'use-debounce-callback',
    type: 'registry:hook',
    title: 'UseDebounceCallback',
    description: 'Debounce the call of a function.',
    files: [
      {
        path: 'registry/hooks/use-debounce-callback.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-debounce-callback.tsx',
      },
    ],
    categories: ['state-management'],
  },
  {
    name: 'use-debounce-state',
    type: 'registry:hook',
    title: 'UseDebounceState',
    description: 'Debounce the state update.',
    files: [
      {
        path: 'registry/hooks/use-debounce-state.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-debounce-state.tsx',
      },
    ],
    categories: ['state-management'],
  },
  {
    name: 'use-click-outside',
    type: 'registry:hook',
    title: 'UseClickOutside',
    description: 'Detects clicks outside of a referenced element.',
    files: [
      {
        path: 'registry/hooks/use-click-outside.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-click-outside.tsx',
      },
    ],
    categories: ['ui-and-dom'],
  },
  {
    name: 'use-on-mount',
    type: 'registry:hook',
    title: 'UseOnMount',
    description: 'Executes a function only once when the component is mounted.',
    files: [
      {
        path: 'registry/hooks/use-on-mount.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-on-mount.tsx',
      },
    ],
    categories: ['lifecycle'],
  },
  {
    name: 'use-on-unmount',
    type: 'registry:hook',
    title: 'UseOnUnmount',
    description:
      'Executes a function only once when the component is unmounted.',
    files: [
      {
        path: 'registry/hooks/use-on-unmount.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-on-unmount.tsx',
      },
    ],
    categories: ['lifecycle'],
  },
  {
    name: 'use-did-update',
    type: 'registry:hook',
    title: 'UseDidUpdate',
    description:
      'Executes a function when the component is updated, but not when it is mounted.',
    files: [
      {
        path: 'registry/hooks/use-did-update.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-did-update.tsx',
      },
    ],
    categories: ['lifecycle'],
  },
  {
    name: 'use-os',
    type: 'registry:hook',
    title: 'UseOS',
    description: "Detects the user's operating system.",
    files: [
      {
        path: 'registry/hooks/use-os.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-os.tsx',
      },
    ],
    categories: ['utilities'],
  },
  {
    name: 'use-idle',
    type: 'registry:hook',
    title: 'UseIdle',
    description: 'Detects if the user is idle.',
    files: [
      {
        path: 'registry/hooks/use-idle.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-idle.tsx',
      },
    ],
    categories: ['utilities'],
  },
  {
    name: 'use-fullscreen',
    type: 'registry:hook',
    title: 'UseFullscreen',
    description: 'Enters and exits fullscreen mode.',
    files: [
      {
        path: 'registry/hooks/use-fullscreen.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-fullscreen.tsx',
      },
    ],
    categories: ['ui-and-dom'],
  },
  {
    name: 'use-confirm',
    type: 'registry:hook',
    title: 'UseConfirm',
    description: 'Manages a confirmation dialog.',
    files: [
      {
        path: 'registry/hooks/use-confirm.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-confirm.tsx',
      },
    ],
    categories: ['ui-and-dom'],
  },
  {
    name: 'use-notifications',
    type: 'registry:hook',
    title: 'UseNotifications',
    description: 'Manages browser notifications.',
    files: [
      {
        path: 'registry/hooks/use-notifications.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-notifications.tsx',
      },
    ],
    categories: ['ui-and-dom'],
  },
  {
    name: 'use-page-leave',
    type: 'registry:hook',
    title: 'UsePageLeave',
    description: 'Detects when the user tries to leave the page.',
    files: [
      {
        path: 'registry/hooks/use-page-leave.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-page-leave.tsx',
      },
    ],
    categories: ['utilities'],
  },
  {
    name: 'use-disclosure',
    type: 'registry:hook',
    title: 'UseDisclosure',
    description:
      'Manages boolean state for UI components like dialogs, modals, and popovers.',
    files: [
      {
        path: 'registry/hooks/use-disclosure.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-disclosure.tsx',
      },
    ],
    categories: ['state-management'],
  },
  {
    name: 'use-mutation-observer',
    type: 'registry:hook',
    title: 'UseMutationObserver',
    description: 'Observes changes to the DOM using the Mutation Observer API',
    files: [
      {
        path: 'registry/hooks/use-mutation-observer.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-mutation-observer.tsx',
      },
    ],
    categories: ['ui-and-dom'],
  },
  {
    name: 'use-resize-observer',
    type: 'registry:hook',
    title: 'UseResizeObserver',
    description:
      'Observes size changes of an element using the Resize Observer API',
    files: [
      {
        path: 'registry/hooks/use-resize-observer.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-resize-observer.tsx',
      },
    ],
    categories: ['ui-and-dom'],
  },
  {
    name: 'use-fetch',
    type: 'registry:hook',
    title: 'UseFetch',
    description:
      'Abstracts the Fetch API with loading, error, and data state management.',
    files: [
      {
        path: 'registry/hooks/use-fetch.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-fetch.tsx',
      },
    ],
    categories: ['utilities'],
  },
  {
    name: 'use-pagination',
    type: 'registry:hook',
    title: 'UsePagination',
    description: 'Hook for controlling list pagination.',
    files: [
      {
        path: 'registry/hooks/use-pagination.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-pagination.tsx',
      },
    ],
    categories: ['state-management'],
  },
  {
    name: 'use-event-listener',
    type: 'registry:hook',
    title: 'UseEventListener',
    description: 'Manages DOM event listeners with proper cleanup.',
    files: [
      {
        path: 'registry/hooks/use-event-listener.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-event-listener.tsx',
      },
    ],
    categories: ['ui-and-dom'],
  },
  {
    name: 'use-axios',
    type: 'registry:hook',
    title: 'UseAxios',
    description: 'A customizable hook for making HTTP requests with Axios',
    files: [
      {
        path: 'registry/hooks/use-axios.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-axios.tsx',
      },
    ],
    categories: ['utilities'],
  },
  {
    name: 'use-page-title',
    type: 'registry:hook',
    title: 'UsePageTitle',
    description: 'Modifies the page title dynamically.',
    files: [
      {
        path: 'registry/hooks/use-page-title.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-page-title.tsx',
      },
    ],
    categories: ['utilities'],
  },
  {
    name: 'use-interval',
    type: 'registry:hook',
    title: 'UseInterval',
    description: 'Runs a callback at specified intervals.',
    files: [
      {
        path: 'registry/hooks/use-interval.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-interval.tsx',
      },
    ],
    categories: ['utilities'],
  },
  {
    name: 'use-timeout',
    type: 'registry:hook',
    title: 'UseTimeout',
    description: 'Executes a callback after a specified delay.',
    files: [
      {
        path: 'registry/hooks/use-timeout.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-timeout.tsx',
      },
    ],
    categories: ['utilities'],
  },
  {
    name: 'use-battery-status',
    type: 'registry:hook',
    title: 'UseBatteryStatus',
    description: 'Access system Battery Status via the Battery Status API.',
    files: [
      {
        path: 'registry/hooks/use-battery-status.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-battery-status.tsx',
      },
    ],
    categories: ['utilities'],
  },
  {
    name: 'use-geolocation',
    type: 'registry:hook',
    title: 'UseGeolocation',
    description: 'Declarative wrapper for the Geolocation API.',
    files: [
      {
        path: 'registry/hooks/use-geolocation.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-geolocation.tsx',
      },
    ],
    categories: ['utilities'],
  },
  {
    name: 'use-isomorphic-layout-effect',
    type: 'registry:hook',
    title: 'UseIsomorphicLayoutEffect',
    description:
      'A hook that uses useLayoutEffect on the client and falls back to useEffect on the server to avoid SSR warnings.',
    files: [
      {
        path: 'registry/hooks/use-isomorphic-layout-effect.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-isomorphic-layout-effect.tsx',
      },
    ],
    categories: ['lifecycle'],
  },
  {
    name: 'use-scroll-position',
    type: 'registry:hook',
    title: 'UseScrollPosition',
    description: 'Tracks the current scroll position of the page.',
    files: [
      {
        path: 'registry/hooks/use-scroll-position.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-scroll-position.tsx',
      },
    ],
    categories: ['ui-and-dom'],
  },
  {
    name: 'use-scroll-lock',
    type: 'registry:hook',
    title: 'UseScrollLock',
    description: 'Lock and unlock scrolling on an element or the page',
    files: [
      {
        path: 'registry/hooks/use-scroll-lock.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-scroll-lock.tsx',
      },
    ],
    categories: ['ui-and-dom'],
  },
  {
    name: 'use-abort-controller',
    type: 'registry:hook',
    title: 'UseAbortController',
    description:
      'Provides AbortController functionality for canceling asynchronous operations.',
    files: [
      {
        path: 'registry/hooks/use-abort-controller.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-abort-controller.tsx',
      },
    ],
    categories: ['utilities'],
  },
  {
    name: 'use-next-auth',
    type: 'registry:hook',
    title: 'UseNextAuth',
    description: 'Enhanced wrapper for NextAuth.js session management.',
    files: [
      {
        path: 'registry/hooks/use-next-auth.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-next-auth.tsx',
      },
    ],
    categories: ['auth'],
  },
  {
    name: 'use-react-hook-form',
    type: 'registry:hook',
    title: 'UseReactHookForm',
    description: 'Custom wrapper for React Hook Form.',
    files: [
      {
        path: 'registry/hooks/use-react-hook-form.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-react-hook-form.tsx',
      },
    ],
    categories: ['forms'],
  },
  {
    name: 'use-better-auth',
    type: 'registry:hook',
    title: 'UseBetterAuth',
    description: 'Flexible authentication hook.',
    files: [
      {
        path: 'registry/hooks/use-better-auth.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-better-auth.tsx',
      },
    ],
    categories: ['auth'],
  },
  {
    name: 'use-formik',
    type: 'registry:hook',
    title: 'UseFormik',
    description: 'Custom wrapper for Formik.',
    files: [
      {
        path: 'registry/hooks/use-formik.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-formik.tsx',
      },
    ],
    categories: ['forms'],
  },
  {
    name: 'use-eye-dropper',
    type: 'registry:hook',
    title: 'UseEyeDropper',
    description:
      'Pick colors from anywhere on the screen using the EyeDropper API.',
    files: [
      {
        path: 'registry/hooks/use-eye-dropper.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-eye-dropper.tsx',
      },
    ],
    categories: ['ui-and-dom'],
  },
];
