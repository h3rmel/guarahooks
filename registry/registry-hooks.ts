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
    name: 'use-stripe',
    type: 'registry:hook',
    title: 'UseStripe',
    description: 'Stripe.js wrapper for payments.',
    files: [
      {
        path: 'registry/hooks/use-stripe.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-stripe.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-mercadopago',
    type: 'registry:hook',
    title: 'UseMercadoPago',
    description: 'MercadoPago checkout helper.',
    files: [
      {
        path: 'registry/hooks/use-mercadopago.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-mercadopago.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-abacate-pay',
    type: 'registry:hook',
    title: 'UseAbacatePay',
    description: 'Hook for the AbacatePay gateway.',
    files: [
      {
        path: 'registry/hooks/use-abacate-pay.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-abacate-pay.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-lemon-squeezy',
    type: 'registry:hook',
    title: 'UseLemonSqueezy',
    description: 'LemonSqueezy checkout integration.',
    files: [
      {
        path: 'registry/hooks/use-lemon-squeezy.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-lemon-squeezy.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-paypal',
    type: 'registry:hook',
    title: 'UsePayPal',
    description: 'PayPal JS SDK wrapper.',
    files: [
      {
        path: 'registry/hooks/use-paypal.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-paypal.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-wide-pay',
    type: 'registry:hook',
    title: 'UseWidePay',
    description: 'Wide Pay checkout integration.',
    files: [
      {
        path: 'registry/hooks/use-wide-pay.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-wide-pay.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-vindi',
    type: 'registry:hook',
    title: 'UseVindi',
    description: 'Vindi checkout integration.',
    files: [
      {
        path: 'registry/hooks/use-vindi.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-vindi.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-apple-pay',
    type: 'registry:hook',
    title: 'UseApplePay',
    description: 'Apple Pay helper.',
    files: [
      {
        path: 'registry/hooks/use-apple-pay.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-apple-pay.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-amazon-pay',
    type: 'registry:hook',
    title: 'UseAmazonPay',
    description: 'Amazon Pay integration.',
    files: [
      {
        path: 'registry/hooks/use-amazon-pay.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-amazon-pay.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-ali-pay',
    type: 'registry:hook',
    title: 'UseAliPay',
    description: 'AliPay integration.',
    files: [
      {
        path: 'registry/hooks/use-ali-pay.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-ali-pay.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-two-checkout',
    type: 'registry:hook',
    title: 'UseTwoCheckout',
    description: '2Checkout integration.',
    files: [
      {
        path: 'registry/hooks/use-two-checkout.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-two-checkout.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-stax-pay',
    type: 'registry:hook',
    title: 'UseStaxPay',
    description: 'Stax Pay integration.',
    files: [
      {
        path: 'registry/hooks/use-stax-pay.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-stax-pay.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-square',
    type: 'registry:hook',
    title: 'UseSquare',
    description: 'Square payments integration.',
    files: [
      {
        path: 'registry/hooks/use-square.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-square.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-payoneer',
    type: 'registry:hook',
    title: 'UsePayoneer',
    description: 'Payoneer checkout helper.',
    files: [
      {
        path: 'registry/hooks/use-payoneer.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-payoneer.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-pagseguro',
    type: 'registry:hook',
    title: 'UsePagSeguro',
    description: 'PagSeguro checkout lightbox.',
    files: [
      {
        path: 'registry/hooks/use-pagseguro.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-pagseguro.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-pagbank',
    type: 'registry:hook',
    title: 'UsePagBank',
    description: 'PagBank widget integration.',
    files: [
      {
        path: 'registry/hooks/use-pagbank.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-pagbank.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-iugu',
    type: 'registry:hook',
    title: 'UseIugu',
    description: 'Iugu checkout helper.',
    files: [
      {
        path: 'registry/hooks/use-iugu.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-iugu.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-pagarme',
    type: 'registry:hook',
    title: 'UsePagarme',
    description: 'Pagar.me payments helper.',
    files: [
      {
        path: 'registry/hooks/use-pagarme.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-pagarme.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-drip',
    type: 'registry:hook',
    title: 'UseDrip',
    description: 'Drip payment integration.',
    files: [
      {
        path: 'registry/hooks/use-drip.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-drip.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-clearsale',
    type: 'registry:hook',
    title: 'UseClearSale',
    description: 'ClearSale anti-fraud helper.',
    files: [
      {
        path: 'registry/hooks/use-clearsale.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-clearsale.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-zoop',
    type: 'registry:hook',
    title: 'UseZoop',
    description: 'Zoop payments integration.',
    files: [
      {
        path: 'registry/hooks/use-zoop.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-zoop.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-picpay',
    type: 'registry:hook',
    title: 'UsePicPay',
    description: 'PicPay checkout helper.',
    files: [
      {
        path: 'registry/hooks/use-picpay.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-picpay.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-adyen',
    type: 'registry:hook',
    title: 'UseAdyen',
    description: 'Adyen checkout integration.',
    files: [
      {
        path: 'registry/hooks/use-adyen.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-adyen.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-barte',
    type: 'registry:hook',
    title: 'UseBarte',
    description: 'Barte payments helper.',
    files: [
      {
        path: 'registry/hooks/use-barte.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-barte.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-braintree',
    type: 'registry:hook',
    title: 'UseBraintree',
    description: 'Braintree drop-in wrapper.',
    files: [
      {
        path: 'registry/hooks/use-braintree.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-braintree.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-braspag',
    type: 'registry:hook',
    title: 'UseBraspag',
    description: 'Braspag payments helper.',
    files: [
      {
        path: 'registry/hooks/use-braspag.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-braspag.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-cielo',
    type: 'registry:hook',
    title: 'UseCielo',
    description: 'Cielo payments integration.',
    files: [
      {
        path: 'registry/hooks/use-cielo.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-cielo.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-chargebee',
    type: 'registry:hook',
    title: 'UseChargebee',
    description: 'Chargebee integration.',
    files: [
      {
        path: 'registry/hooks/use-chargebee.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-chargebee.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-getnet',
    type: 'registry:hook',
    title: 'UseGetnet',
    description: 'Getnet payment SDK.',
    files: [
      {
        path: 'registry/hooks/use-getnet.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-getnet.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-equals',
    type: 'registry:hook',
    title: 'UseEquals',
    description: 'Equals pay integration.',
    files: [
      {
        path: 'registry/hooks/use-equals.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-equals.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-klap',
    type: 'registry:hook',
    title: 'UseKlap',
    description: 'Klap payments integration.',
    files: [
      {
        path: 'registry/hooks/use-klap.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-klap.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-nu-pay',
    type: 'registry:hook',
    title: 'UseNuPay',
    description: 'Nu Pay helper.',
    files: [
      {
        path: 'registry/hooks/use-nu-pay.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-nu-pay.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-safrapay',
    type: 'registry:hook',
    title: 'UseSafraPay',
    description: 'SafraPay integration.',
    files: [
      {
        path: 'registry/hooks/use-safrapay.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-safrapay.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-vr',
    type: 'registry:hook',
    title: 'UseVRPay',
    description: 'VR Pay integration.',
    files: [
      {
        path: 'registry/hooks/use-vr.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-vr.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-worldpay',
    type: 'registry:hook',
    title: 'UseWorldPay',
    description: 'WorldPay SDK wrapper.',
    files: [
      {
        path: 'registry/hooks/use-worldpay.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-worldpay.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-transire',
    type: 'registry:hook',
    title: 'UseTransire',
    description: 'Transire payment integration.',
    files: [
      {
        path: 'registry/hooks/use-transire.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-transire.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-pag-brasil',
    type: 'registry:hook',
    title: 'UsePagBrasil',
    description: 'PagBrasil payment integration.',
    files: [
      {
        path: 'registry/hooks/use-pag-brasil.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-pag-brasil.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-stone',
    type: 'registry:hook',
    title: 'UseStone',
    description: 'Stone payment integration.',
    files: [
      {
        path: 'registry/hooks/use-stone.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-stone.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-superlogica',
    type: 'registry:hook',
    title: 'UseSuperlogica',
    description: 'Superlogica payment integration.',
    files: [
      {
        path: 'registry/hooks/use-superlogica.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-superlogica.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-yapay',
    type: 'registry:hook',
    title: 'UseYapay',
    description: 'Yapay payment integration.',
    files: [
      {
        path: 'registry/hooks/use-yapay.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-yapay.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-zigpay',
    type: 'registry:hook',
    title: 'UseZigpay',
    description: 'Zigpay payment integration.',
    files: [
      {
        path: 'registry/hooks/use-zigpay.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-zigpay.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-boa-compra',
    type: 'registry:hook',
    title: 'UseBoaCompra',
    description: 'Boa Compra payment integration.',
    files: [
      {
        path: 'registry/hooks/use-boa-compra.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-boa-compra.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-celcoin',
    type: 'registry:hook',
    title: 'UseCelcoin',
    description: 'Celcoin payment integration.',
    files: [
      {
        path: 'registry/hooks/use-celcoin.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-celcoin.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-acqio',
    type: 'registry:hook',
    title: 'UseAcqio',
    description: 'Acqio payment integration.',
    files: [
      {
        path: 'registry/hooks/use-acqio.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-acqio.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-cappta',
    type: 'registry:hook',
    title: 'UseCappta',
    description: 'Cappta payment integration.',
    files: [
      {
        path: 'registry/hooks/use-cappta.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-cappta.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-ebanx',
    type: 'registry:hook',
    title: 'UseEbanx',
    description: 'Ebanx payment integration.',
    files: [
      {
        path: 'registry/hooks/use-ebanx.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-ebanx.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-gerenciament',
    type: 'registry:hook',
    title: 'UseGerenciament',
    description: 'Gerenciament payment integration.',
    files: [
      {
        path: 'registry/hooks/use-gerenciament.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-gerenciament.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-juno',
    type: 'registry:hook',
    title: 'UseJuno',
    description: 'Juno payment integration.',
    files: [
      {
        path: 'registry/hooks/use-juno.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-juno.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-koin',
    type: 'registry:hook',
    title: 'UseKoin',
    description: 'Koin payment integration.',
    files: [
      {
        path: 'registry/hooks/use-koin.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-koin.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-mova',
    type: 'registry:hook',
    title: 'UseMova',
    description: 'Mova payment integration.',
    files: [
      {
        path: 'registry/hooks/use-mova.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-mova.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-cloud-walk',
    type: 'registry:hook',
    title: 'UseCloudWalk',
    description: 'CloudWalk payment integration.',
    files: [
      {
        path: 'registry/hooks/use-cloud-walk.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-cloud-walk.tsx',
      },
    ],
    categories: ['payments'],
  },
  {
    name: 'use-efi-bank',
    type: 'registry:hook',
    title: 'UseEfiBank',
    description: 'Efi Bank payment integration.',
    files: [
      {
        path: 'registry/hooks/use-efi-bank.tsx',
        type: 'registry:hook',
        target: 'hooks/guarahooks/use-efi-bank.tsx',
      },
    ],
    categories: ['payments'],
  },
];
