import { Registry } from 'shadcn/registry';

export const examples: Registry['items'] = [
  {
    name: 'use-window-size-demo',
    type: 'registry:example',
    title: 'UseWindowSizeDemo',
    description: "use-window-size's hook in action.",
    registryDependencies: [
      'card',
      'https://guarahooks.com/r/use-window-size.json',
    ],
    files: [
      {
        path: 'registry/example/use-window-size-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-window-size-demo.tsx',
      },
    ],
  },
  {
    name: 'use-media-demo',
    type: 'registry:example',
    title: 'UseMediaDemo',
    description: "use-media's hook in action.",
    registryDependencies: ['card', 'https://guarahooks.com/r/use-media.json'],
    files: [
      {
        path: 'registry/example/use-media-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-media-demo.tsx',
      },
    ],
  },
  {
    name: 'use-mouse-demo',
    type: 'registry:example',
    title: 'UseMouseDemo',
    description: "use-mouse's hook in action.",
    registryDependencies: [
      'checkbox',
      'card',
      'https://guarahooks.com/r/use-mouse.json',
    ],
    files: [
      {
        path: 'registry/example/use-mouse-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-mouse-demo.tsx',
      },
    ],
  },
  {
    name: 'use-click-outside-demo',
    type: 'registry:example',
    title: 'UseClickOutsideDemo',
    description: "use-click-outside's hook in action.",
    registryDependencies: [
      'card',
      'https://guarahooks.com/r/use-click-outside.json',
    ],
    files: [
      {
        path: 'registry/example/use-click-outside-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-click-outside-demo.tsx',
      },
    ],
  },
  {
    name: 'use-keypress-demo',
    type: 'registry:example',
    title: 'UseKeypressDemo',
    description: "use-keypress's hook in action.",
    registryDependencies: [
      'card',
      'https://guarahooks.com/r/use-keypress.json',
    ],
    files: [
      {
        path: 'registry/example/use-keypress-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-keypress-demo.tsx',
      },
    ],
  },
  {
    name: 'use-orientation-demo',
    type: 'registry:example',
    title: 'UseOrientationDemo',
    description: "use-orientation's hook in action.",
    registryDependencies: [
      'card',
      'https://guarahooks.com/r/use-orientation.json',
    ],
    files: [
      {
        path: 'registry/example/use-orientation-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-orientation-demo.tsx',
      },
    ],
  },
  {
    name: 'use-toggle-demo',
    type: 'registry:example',
    title: 'UseToggleDemo',
    description: "use-toggle's hook in action.",
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-toggle.json',
    ],
    files: [
      {
        path: 'registry/example/use-toggle-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-toggle-demo.tsx',
      },
    ],
  },
  {
    name: 'use-set-demo',
    type: 'registry:example',
    title: 'UseSetDemo',
    description: "use-set's hook in action.",
    registryDependencies: [
      'card',
      'button',
      'input',
      'https://guarahooks.com/r/use-set.json',
    ],
    files: [
      {
        path: 'registry/example/use-set-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-set-demo.tsx',
      },
    ],
  },
  {
    name: 'use-map-demo',
    type: 'registry:example',
    title: 'UseMapDemo',
    description: "use-map's hook in action.",
    registryDependencies: [
      'card',
      'button',
      'input',
      'https://guarahooks.com/r/use-map.json',
    ],
    files: [
      {
        path: 'registry/example/use-map-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-map-demo.tsx',
      },
    ],
  },
  {
    name: 'use-local-storage-demo',
    type: 'registry:example',
    title: 'UseLocalStorageDemo',
    description: "use-local-storage's hook in action.",
    registryDependencies: [
      'card',
      'input',
      'label',
      'https://guarahooks.com/r/use-local-storage.json',
    ],
    files: [
      {
        path: 'registry/example/use-local-storage-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-local-storage-demo.tsx',
      },
    ],
  },
  {
    name: 'use-session-storage-demo',
    type: 'registry:example',
    title: 'UseSessionStorageDemo',
    description: "use-session-storage's hook in action.",
    registryDependencies: [
      'card',
      'button',
      'input',
      'label',
      'https://guarahooks.com/r/use-session-storage.json',
    ],
    files: [
      {
        path: 'registry/example/use-session-storage-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-session-storage-demo.tsx',
      },
    ],
  },
  {
    name: 'use-cookie-demo',
    type: 'registry:example',
    title: 'UseCookieDemo',
    description: "use-cookie's hook in action.",
    registryDependencies: [
      'card',
      'input',
      'button',
      'https://guarahooks.com/r/use-cookie.json',
    ],
    files: [
      {
        path: 'registry/example/use-cookie-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-cookie-demo.tsx',
      },
    ],
  },
  {
    name: 'use-copy-to-clipboard-demo',
    type: 'registry:example',
    title: 'UseCopyToClipboardDemo',
    description: "use-copy-to-clipboard's hook in action.",
    registryDependencies: [
      'card',
      'button',
      'input',
      'https://guarahooks.com/r/use-copy-to-clipboard.json',
    ],
    files: [
      {
        path: 'registry/example/use-copy-to-clipboard-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-copy-to-clipboard-demo.tsx',
      },
    ],
  },
  {
    name: 'use-debounce-callback-demo',
    type: 'registry:example',
    title: 'UseDebounceCallbackDemo',
    description: "use-debounce-callback's hook in action.",
    registryDependencies: [
      'card',
      'input',
      'https://guarahooks.com/r/use-debounce-callback.json',
    ],
    files: [
      {
        path: 'registry/example/use-debounce-callback-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-debounce-callback-demo.tsx',
      },
    ],
  },
  {
    name: 'use-debounce-state-demo',
    type: 'registry:example',
    title: 'UseDebounceStateDemo',
    description: "use-debounce-state's hook in action.",
    registryDependencies: [
      'card',
      'input',
      'https://guarahooks.com/r/use-debounce-state.json',
    ],
    files: [
      {
        path: 'registry/example/use-debounce-state-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-debounce-state-demo.tsx',
      },
    ],
  },
  {
    name: 'use-on-mount-demo',
    type: 'registry:example',
    title: 'UseOnMountDemo',
    description: "use-on-mount's hook in action.",
    registryDependencies: [
      'card',
      'https://guarahooks.com/r/use-on-mount.json',
    ],
    files: [
      {
        path: 'registry/example/use-on-mount-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-on-mount-demo.tsx',
      },
    ],
  },
  {
    name: 'use-on-unmount-demo',
    type: 'registry:example',
    title: 'UseOnUnmountDemo',
    description: "use-on-unmount's hook in action.",
    registryDependencies: [
      'card',
      'button',
      'sonner',
      'https://guarahooks.com/r/use-on-unmount.json',
    ],
    files: [
      {
        path: 'registry/example/use-on-unmount-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-on-unmount-demo.tsx',
      },
    ],
  },
  {
    name: 'use-did-update-demo',
    type: 'registry:example',
    title: 'UseDidUpdateDemo',
    description: "use-did-update's hook in action.",
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-did-update.json',
    ],
    files: [
      {
        path: 'registry/example/use-did-update-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-did-update-demo.tsx',
      },
    ],
  },
  {
    name: 'use-os-demo',
    type: 'registry:example',
    title: 'UseOSDemo',
    description: "use-os's hook in action.",
    registryDependencies: ['card', 'https://guarahooks.com/r/use-os.json'],
    files: [
      {
        path: 'registry/example/use-os-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-os-demo.tsx',
      },
    ],
  },
  {
    name: 'use-idle-demo',
    type: 'registry:example',
    title: 'UseIdleDemo',
    description: "use-idle's hook in action.",
    registryDependencies: [
      'card',
      'badge',
      'button',
      'https://guarahooks.com/r/use-idle.json',
    ],
    files: [
      {
        path: 'registry/example/use-idle-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-idle-demo.tsx',
      },
    ],
  },
  {
    name: 'use-fullscreen-demo',
    type: 'registry:example',
    title: 'UseFullscreenDemo',
    description: "use-fullscreen's hook in action.",
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-fullscreen.json',
    ],
    files: [
      {
        path: 'registry/example/use-fullscreen-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-fullscreen-demo.tsx',
      },
    ],
  },
  {
    name: 'use-confirm-demo',
    type: 'registry:example',
    title: 'UseConfirmDemo',
    description: "use-confirm's hook in action.",
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-confirm.json',
    ],
    files: [
      {
        path: 'registry/example/use-confirm-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-confirm-demo.tsx',
      },
    ],
  },
  {
    name: 'use-notifications-demo',
    type: 'registry:example',
    title: 'UseNotificationsDemo',
    description: "use-notifications's hook in action.",
    registryDependencies: [
      'card',
      'alert',
      'button',
      'badge',
      'lucide-react',
      'https://guarahooks.com/r/use-notifications.json',
    ],
    files: [
      {
        path: 'registry/example/use-notifications-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-notifications-demo.tsx',
      },
    ],
  },
  {
    name: 'use-page-leave-demo',
    type: 'registry:example',
    title: 'UsePageLeaveDemo',
    description: "use-page-leave's hook in action.",
    registryDependencies: [
      'card',
      'button',
      'badge',
      'https://guarahooks.com/r/use-page-leave.json',
    ],
    files: [
      {
        path: 'registry/example/use-page-leave-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-page-leave-demo.tsx',
      },
    ],
  },
  {
    name: 'use-disclosure-demo',
    type: 'registry:example',
    title: 'UseDisclosureDemo',
    description: "use-disclosure's hook in action.",
    registryDependencies: [
      'card',
      'button',
      'dialog',
      'https://guarahooks.com/r/use-disclosure.json',
    ],
    files: [
      {
        path: 'registry/example/use-disclosure-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-disclosure-demo.tsx',
      },
    ],
  },
  {
    name: 'use-mutation-observer-demo',
    type: 'registry:example',
    title: 'UseMutationObserverDemo',
    description: "use-mutation-observer's hook in action.",
    registryDependencies: [
      'button',
      'card',
      'https://guarahooks.com/r/use-mutation-observer.json',
    ],
    files: [
      {
        path: 'registry/example/use-mutation-observer-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-mutation-observer-demo.tsx',
      },
    ],
  },
  {
    name: 'use-resize-observer-demo',
    type: 'registry:example',
    title: 'UseResizeObserverDemo',
    description: "use-resize-observer's hook in action.",
    registryDependencies: [
      'button',
      'card',
      'https://guarahooks.com/r/use-resize-observer.json',
    ],
    files: [
      {
        path: 'registry/example/use-resize-observer-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-resize-observer-demo.tsx',
      },
    ],
  },
  {
    name: 'use-intersection-observer-demo',
    type: 'registry:example',
    title: 'UseIntersectionObserverDemo',
    description: "use-intersection-observer's hook in action.",
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-intersection-observer.json',
    ],
    files: [
      {
        path: 'registry/example/use-intersection-observer-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-intersection-observer-demo.tsx',
      },
    ],
  },
  {
    name: 'use-fetch-demo',
    type: 'registry:example',
    title: 'UseFetchDemo',
    description: "use-fetch's hook in action.",
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-fetch.json',
    ],
    files: [
      {
        path: 'registry/example/use-fetch-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-fetch-demo.tsx',
      },
    ],
  },
  {
    name: 'use-pagination-demo',
    type: 'registry:example',
    title: 'UsePaginationDemo',
    description: "use-pagination's hook in action.",
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-pagination.json',
    ],
    files: [
      {
        path: 'registry/example/use-pagination-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-pagination-demo.tsx',
      },
    ],
  },
  {
    name: 'use-event-listener-demo',
    type: 'registry:example',
    title: 'UseEventListenerDemo',
    description: "use-event-listener's hook in action.",
    registryDependencies: [
      'card',
      'badge',
      'button',
      'https://guarahooks.com/r/use-event-listener.json',
    ],
    files: [
      {
        path: 'registry/example/use-event-listener-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-event-listener-demo.tsx',
      },
    ],
  },
  {
    name: 'use-axios-demo',
    type: 'registry:example',
    title: 'UseAxiosDemo',
    description: "use-axios's hook in action.",
    registryDependencies: [
      'card',
      'input',
      'button',
      'label',
      'alert',
      'lucide-react',
      'https://guarahooks.com/r/use-axios.json',
    ],
    files: [
      {
        path: 'registry/example/use-axios-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-axios-demo.tsx',
      },
    ],
  },
  {
    name: 'use-page-title-demo',
    type: 'registry:example',
    title: 'UsePageTitleDemo',
    description: "use-page-title's hook in action.",
    registryDependencies: [
      'card',
      'button',
      'input',
      'label',
      'https://guarahooks.com/r/use-page-title.json',
    ],
    files: [
      {
        path: 'registry/example/use-page-title-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-page-title-demo.tsx',
      },
    ],
  },
  {
    name: 'use-interval-demo',
    type: 'registry:example',
    title: 'UseIntervalDemo',
    description: "use-interval's hook in action.",
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-interval.json',
    ],
    files: [
      {
        path: 'registry/example/use-interval-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-interval-demo.tsx',
      },
    ],
  },
  {
    name: 'use-timeout-demo',
    type: 'registry:example',
    title: 'UseTimeoutDemo',
    description: "use-timeout's hook in action.",
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-timeout.json',
    ],
    files: [
      {
        path: 'registry/example/use-timeout-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-timeout-demo.tsx',
      },
    ],
  },
  {
    name: 'use-battery-status-demo',
    type: 'registry:example',
    title: 'UseBatteryStatusDemo',
    description: "use-battery-status's hook in action.",
    registryDependencies: [
      'card',
      'badge',
      'https://guarahooks.com/r/use-battery-status.json',
    ],
    files: [
      {
        path: 'registry/example/use-battery-status-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-battery-status-demo.tsx',
      },
    ],
  },
  {
    name: 'use-geolocation-demo',
    type: 'registry:example',
    title: 'UseGeolocationDemo',
    description: "use-geolocation's hook in action.",
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-geolocation.json',
    ],
    files: [
      {
        path: 'registry/example/use-geolocation-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-geolocation-demo.tsx',
      },
    ],
  },
  {
    name: 'use-isomorphic-layout-effect-demo',
    type: 'registry:example',
    title: 'UseIsomorphicLayoutEffectDemo',
    description: "use-isomorphic-layout-effect's hook in action.",
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-isomorphic-layout-effect.json',
    ],
    files: [
      {
        path: 'registry/example/use-isomorphic-layout-effect-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-isomorphic-layout-effect-demo.tsx',
      },
    ],
  },
  {
    name: 'use-scroll-position-demo',
    type: 'registry:example',
    title: 'UseScrollPositionDemo',
    description: "use-scroll-position's hook in action.",
    registryDependencies: [
      'card',
      'https://guarahooks.com/r/use-scroll-position.json',
    ],
    files: [
      {
        path: 'registry/example/use-scroll-position-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-scroll-position-demo.tsx',
      },
    ],
  },
  {
    name: 'use-scroll-lock-demo',
    type: 'registry:example',
    title: 'UseScrollLockDemo',
    description: 'Demonstrates useScrollLock hook',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-scroll-lock.json',
    ],
    files: [
      {
        path: 'registry/example/use-scroll-lock-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-scroll-lock-demo.tsx',
      },
    ],
  },
  {
    name: 'use-abort-controller-demo',
    type: 'registry:example',
    title: 'UseAbortControllerDemo',
    description: "use-abort-controller's hook in action.",
    registryDependencies: [
      'button',
      'card',
      'badge',
      'https://guarahooks.com/r/use-abort-controller.json',
    ],
    files: [
      {
        path: 'registry/example/use-abort-controller-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-abort-controller-demo.tsx',
      },
    ],
  },
  {
    name: 'use-react-hook-form-demo',
    type: 'registry:example',
    title: 'UseReactHookFormDemo',
    description: "use-react-hook-form's hook in action.",
    registryDependencies: [
      'card',
      'label',
      'input',
      'button',
      'https://guarahooks.com/r/use-react-hook-form.json',
    ],
    files: [
      {
        path: 'registry/example/use-react-hook-form-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-react-hook-form-demo.tsx',
      },
    ],
  },
  {
    name: 'use-formik-demo',
    type: 'registry:example',
    title: 'UseFormikDemo',
    description: "use-formik's hook in action.",
    registryDependencies: [
      'card',
      'label',
      'input',
      'button',
      'sonner',
      'https://guarahooks.com/r/use-formik.json',
    ],
    files: [
      {
        path: 'registry/example/use-formik-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-formik-demo.tsx',
      },
    ],
  },
  {
    name: 'use-next-auth-demo',
    type: 'registry:example',
    title: 'UseNextAuthDemo',
    description: "use-next-auth's hook in action.",
    registryDependencies: [
      'card',
      'button',
      'badge',
      'sonner',
      'https://guarahooks.com/r/use-next-auth.json',
    ],
    files: [
      {
        path: 'registry/example/use-next-auth-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-next-auth-demo.tsx',
      },
    ],
  },
  {
    name: 'use-better-auth-demo',
    type: 'registry:example',
    title: 'UseBetterAuthDemo',
    description: "use-better-auth's hook in action.",
    registryDependencies: [
      'card',
      'button',
      'badge',
      'input',
      'label',
      'tabs',
      'sonner',
      'https://guarahooks.com/r/use-better-auth.json',
    ],
    files: [
      {
        path: 'registry/example/use-better-auth-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-better-auth-demo.tsx',
      },
    ],
  },
  {
    name: 'use-stripe-demo',
    type: 'registry:example',
    title: 'UseStripe Demo',
    description: 'use-stripe in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-stripe.json',
    ],
    files: [
      {
        path: 'registry/example/use-stripe-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-stripe-demo.tsx',
      },
    ],
  },
  {
    name: 'use-mercadopago-demo',
    type: 'registry:example',
    title: 'UseMercadoPago Demo',
    description: 'use-mercadopago in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-mercadopago.json',
    ],
    files: [
      {
        path: 'registry/example/use-mercadopago-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-mercadopago-demo.tsx',
      },
    ],
  },
  {
    name: 'use-abacate-pay-demo',
    type: 'registry:example',
    title: 'UseAbacatePay Demo',
    description: 'use-abacate-pay in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-abacate-pay.json',
    ],
    files: [
      {
        path: 'registry/example/use-abacate-pay-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-abacate-pay-demo.tsx',
      },
    ],
  },
  {
    name: 'use-lemon-squeezy-demo',
    type: 'registry:example',
    title: 'UseLemonSqueezy Demo',
    description: 'use-lemon-squeezy in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-lemon-squeezy.json',
    ],
    files: [
      {
        path: 'registry/example/use-lemon-squeezy-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-lemon-squeezy-demo.tsx',
      },
    ],
  },
  {
    name: 'use-paypal-demo',
    type: 'registry:example',
    title: 'UsePayPal Demo',
    description: 'use-paypal in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-paypal.json',
    ],
    files: [
      {
        path: 'registry/example/use-paypal-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-paypal-demo.tsx',
      },
    ],
  },
  {
    name: 'use-wide-pay-demo',
    type: 'registry:example',
    title: 'UseWidePay Demo',
    description: 'use-wide-pay in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-wide-pay.json',
    ],
    files: [
      {
        path: 'registry/example/use-wide-pay-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-wide-pay-demo.tsx',
      },
    ],
  },
  {
    name: 'use-vindi-demo',
    type: 'registry:example',
    title: 'UseVindi Demo',
    description: 'use-vindi in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-vindi.json',
    ],
    files: [
      {
        path: 'registry/example/use-vindi-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-vindi-demo.tsx',
      },
    ],
  },
  {
    name: 'use-apple-pay-demo',
    type: 'registry:example',
    title: 'UseApplePay Demo',
    description: 'use-apple-pay in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-apple-pay.json',
    ],
    files: [
      {
        path: 'registry/example/use-apple-pay-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-apple-pay-demo.tsx',
      },
    ],
  },
  {
    name: 'use-amazon-pay-demo',
    type: 'registry:example',
    title: 'UseAmazonPay Demo',
    description: 'use-amazon-pay in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-amazon-pay.json',
    ],
    files: [
      {
        path: 'registry/example/use-amazon-pay-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-amazon-pay-demo.tsx',
      },
    ],
  },
  {
    name: 'use-ali-pay-demo',
    type: 'registry:example',
    title: 'UseAliPay Demo',
    description: 'use-ali-pay in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-ali-pay.json',
    ],
    files: [
      {
        path: 'registry/example/use-ali-pay-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-ali-pay-demo.tsx',
      },
    ],
  },
  {
    name: 'use-two-checkout-demo',
    type: 'registry:example',
    title: 'UseTwoCheckout Demo',
    description: 'use-two-checkout in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-two-checkout.json',
    ],
    files: [
      {
        path: 'registry/example/use-two-checkout-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-two-checkout-demo.tsx',
      },
    ],
  },
  {
    name: 'use-stax-pay-demo',
    type: 'registry:example',
    title: 'UseStaxPay Demo',
    description: 'use-stax-pay in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-stax-pay.json',
    ],
    files: [
      {
        path: 'registry/example/use-stax-pay-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-stax-pay-demo.tsx',
      },
    ],
  },
  {
    name: 'use-square-demo',
    type: 'registry:example',
    title: 'UseSquare Demo',
    description: 'use-square in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-square.json',
    ],
    files: [
      {
        path: 'registry/example/use-square-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-square-demo.tsx',
      },
    ],
  },
  {
    name: 'use-payoneer-demo',
    type: 'registry:example',
    title: 'UsePayoneer Demo',
    description: 'use-payoneer in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-payoneer.json',
    ],
    files: [
      {
        path: 'registry/example/use-payoneer-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-payoneer-demo.tsx',
      },
    ],
  },
  {
    name: 'use-pagseguro-demo',
    type: 'registry:example',
    title: 'UsePagSeguro Demo',
    description: 'use-pagseguro in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-pagseguro.json',
    ],
    files: [
      {
        path: 'registry/example/use-pagseguro-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-pagseguro-demo.tsx',
      },
    ],
  },
  {
    name: 'use-pagbank-demo',
    type: 'registry:example',
    title: 'UsePagBank Demo',
    description: 'use-pagbank in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-pagbank.json',
    ],
    files: [
      {
        path: 'registry/example/use-pagbank-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-pagbank-demo.tsx',
      },
    ],
  },
  {
    name: 'use-iugu-demo',
    type: 'registry:example',
    title: 'UseIugu Demo',
    description: 'use-iugu in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-iugu.json',
    ],
    files: [
      {
        path: 'registry/example/use-iugu-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-iugu-demo.tsx',
      },
    ],
  },
  {
    name: 'use-pagarme-demo',
    type: 'registry:example',
    title: 'UsePagarme Demo',
    description: 'use-pagarme in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-pagarme.json',
    ],
    files: [
      {
        path: 'registry/example/use-pagarme-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-pagarme-demo.tsx',
      },
    ],
  },
  {
    name: 'use-drip-demo',
    type: 'registry:example',
    title: 'UseDrip Demo',
    description: 'use-drip in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-drip.json',
    ],
    files: [
      {
        path: 'registry/example/use-drip-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-drip-demo.tsx',
      },
    ],
  },
  {
    name: 'use-clearsale-demo',
    type: 'registry:example',
    title: 'UseClearSale Demo',
    description: 'use-clearsale in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-clearsale.json',
    ],
    files: [
      {
        path: 'registry/example/use-clearsale-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-clearsale-demo.tsx',
      },
    ],
  },
  {
    name: 'use-zoop-demo',
    type: 'registry:example',
    title: 'UseZoop Demo',
    description: 'use-zoop in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-zoop.json',
    ],
    files: [
      {
        path: 'registry/example/use-zoop-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-zoop-demo.tsx',
      },
    ],
  },
  {
    name: 'use-picpay-demo',
    type: 'registry:example',
    title: 'UsePicPay Demo',
    description: 'use-picpay in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-picpay.json',
    ],
    files: [
      {
        path: 'registry/example/use-picpay-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-picpay-demo.tsx',
      },
    ],
  },
  {
    name: 'use-adyen-demo',
    type: 'registry:example',
    title: 'UseAdyen Demo',
    description: 'use-adyen in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-adyen.json',
    ],
    files: [
      {
        path: 'registry/example/use-adyen-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-adyen-demo.tsx',
      },
    ],
  },
  {
    name: 'use-barte-demo',
    type: 'registry:example',
    title: 'UseBarte Demo',
    description: 'use-barte in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-barte.json',
    ],
    files: [
      {
        path: 'registry/example/use-barte-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-barte-demo.tsx',
      },
    ],
  },
  {
    name: 'use-braintree-demo',
    type: 'registry:example',
    title: 'UseBraintree Demo',
    description: 'use-braintree in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-braintree.json',
    ],
    files: [
      {
        path: 'registry/example/use-braintree-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-braintree-demo.tsx',
      },
    ],
  },
  {
    name: 'use-braspag-demo',
    type: 'registry:example',
    title: 'UseBraspag Demo',
    description: 'use-braspag in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-braspag.json',
    ],
    files: [
      {
        path: 'registry/example/use-braspag-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-braspag-demo.tsx',
      },
    ],
  },
  {
    name: 'use-cielo-demo',
    type: 'registry:example',
    title: 'UseCielo Demo',
    description: 'use-cielo in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-cielo.json',
    ],
    files: [
      {
        path: 'registry/example/use-cielo-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-cielo-demo.tsx',
      },
    ],
  },
  {
    name: 'use-chargebee-demo',
    type: 'registry:example',
    title: 'UseChargebee Demo',
    description: 'use-chargebee in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-chargebee.json',
    ],
    files: [
      {
        path: 'registry/example/use-chargebee-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-chargebee-demo.tsx',
      },
    ],
  },
  {
    name: 'use-getnet-demo',
    type: 'registry:example',
    title: 'UseGetnet Demo',
    description: 'use-getnet in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-getnet.json',
    ],
    files: [
      {
        path: 'registry/example/use-getnet-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-getnet-demo.tsx',
      },
    ],
  },
  {
    name: 'use-equals-demo',
    type: 'registry:example',
    title: 'UseEquals Demo',
    description: 'use-equals in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-equals.json',
    ],
    files: [
      {
        path: 'registry/example/use-equals-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-equals-demo.tsx',
      },
    ],
  },
  {
    name: 'use-klap-demo',
    type: 'registry:example',
    title: 'UseKlap Demo',
    description: 'use-klap in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-klap.json',
    ],
    files: [
      {
        path: 'registry/example/use-klap-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-klap-demo.tsx',
      },
    ],
  },
  {
    name: 'use-nu-pay-demo',
    type: 'registry:example',
    title: 'UseNuPay Demo',
    description: 'use-nu-pay in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-nu-pay.json',
    ],
    files: [
      {
        path: 'registry/example/use-nu-pay-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-nu-pay-demo.tsx',
      },
    ],
  },
  {
    name: 'use-safrapay-demo',
    type: 'registry:example',
    title: 'UseSafraPay Demo',
    description: 'use-safrapay in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-safrapay.json',
    ],
    files: [
      {
        path: 'registry/example/use-safrapay-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-safrapay-demo.tsx',
      },
    ],
  },
  {
    name: 'use-vr-demo',
    type: 'registry:example',
    title: 'UseVRPay Demo',
    description: 'use-vr in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-vr.json',
    ],
    files: [
      {
        path: 'registry/example/use-vr-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-vr-demo.tsx',
      },
    ],
  },
  {
    name: 'use-worldpay-demo',
    type: 'registry:example',
    title: 'UseWorldPay Demo',
    description: 'use-worldpay in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-worldpay.json',
    ],
    files: [
      {
        path: 'registry/example/use-worldpay-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-worldpay-demo.tsx',
      },
    ],
  },
  {
    name: 'use-transire-demo',
    type: 'registry:example',
    title: 'UseTransire Demo',
    description: 'use-transire in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-transire.json',
    ],
    files: [
      {
        path: 'registry/example/use-transire-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-transire-demo.tsx',
      },
    ],
  },
  {
    name: 'use-pag-brasil-demo',
    type: 'registry:example',
    title: 'UsePagBrasil Demo',
    description: 'use-pag-brasil in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-pag-brasil.json',
    ],
    files: [
      {
        path: 'registry/example/use-pag-brasil-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-pag-brasil-demo.tsx',
      },
    ],
  },
  {
    name: 'use-stone-demo',
    type: 'registry:example',
    title: 'UseStone Demo',
    description: 'use-stone in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-stone.json',
    ],
    files: [
      {
        path: 'registry/example/use-stone-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-stone-demo.tsx',
      },
    ],
  },
  {
    name: 'use-superlogica-demo',
    type: 'registry:example',
    title: 'UseSuperlogica Demo',
    description: 'use-superlogica in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-superlogica.json',
    ],
    files: [
      {
        path: 'registry/example/use-superlogica-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-superlogica-demo.tsx',
      },
    ],
  },
  {
    name: 'use-yapay-demo',
    type: 'registry:example',
    title: 'UseYapay Demo',
    description: 'use-yapay in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-yapay.json',
    ],
    files: [
      {
        path: 'registry/example/use-yapay-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-yapay-demo.tsx',
      },
    ],
  },
  {
    name: 'use-zigpay-demo',
    type: 'registry:example',
    title: 'UseZigpay Demo',
    description: 'use-zigpay in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-zigpay.json',
    ],
    files: [
      {
        path: 'registry/example/use-zigpay-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-zigpay-demo.tsx',
      },
    ],
  },
  {
    name: 'use-boa-compra-demo',
    type: 'registry:example',
    title: 'UseBoaCompra Demo',
    description: 'use-boa-compra in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-boa-compra.json',
    ],
    files: [
      {
        path: 'registry/example/use-boa-compra-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-boa-compra-demo.tsx',
      },
    ],
  },
  {
    name: 'use-celcoin-demo',
    type: 'registry:example',
    title: 'UseCelcoin Demo',
    description: 'use-celcoin in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-celcoin.json',
    ],
    files: [
      {
        path: 'registry/example/use-celcoin-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-celcoin-demo.tsx',
      },
    ],
  },
  {
    name: 'use-acqio-demo',
    type: 'registry:example',
    title: 'UseAcqio Demo',
    description: 'use-acqio in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-acqio.json',
    ],
    files: [
      {
        path: 'registry/example/use-acqio-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-acqio-demo.tsx',
      },
    ],
  },
  {
    name: 'use-cappta-demo',
    type: 'registry:example',
    title: 'UseCappta Demo',
    description: 'use-cappta in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-cappta.json',
    ],
    files: [
      {
        path: 'registry/example/use-cappta-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-cappta-demo.tsx',
      },
    ],
  },
  {
    name: 'use-ebanx-demo',
    type: 'registry:example',
    title: 'UseEbanx Demo',
    description: 'use-ebanx in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-ebanx.json',
    ],
    files: [
      {
        path: 'registry/example/use-ebanx-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-ebanx-demo.tsx',
      },
    ],
  },
  {
    name: 'use-gerenciament-demo',
    type: 'registry:example',
    title: 'UseGerenciament Demo',
    description: 'use-gerenciament in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-gerenciament.json',
    ],
    files: [
      {
        path: 'registry/example/use-gerenciament-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-gerenciament-demo.tsx',
      },
    ],
  },
  {
    name: 'use-juno-demo',
    type: 'registry:example',
    title: 'UseJuno Demo',
    description: 'use-juno in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-juno.json',
    ],
    files: [
      {
        path: 'registry/example/use-juno-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-juno-demo.tsx',
      },
    ],
  },
  {
    name: 'use-koin-demo',
    type: 'registry:example',
    title: 'UseKoin Demo',
    description: 'use-koin in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-koin.json',
    ],
    files: [
      {
        path: 'registry/example/use-koin-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-koin-demo.tsx',
      },
    ],
  },
  {
    name: 'use-mova-demo',
    type: 'registry:example',
    title: 'UseMova Demo',
    description: 'use-mova in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-mova.json',
    ],
    files: [
      {
        path: 'registry/example/use-mova-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-mova-demo.tsx',
      },
    ],
  },
  {
    name: 'use-cloud-walk-demo',
    type: 'registry:example',
    title: 'UseCloudWalk Demo',
    description: 'use-cloud-walk in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-cloud-walk.json',
    ],
    files: [
      {
        path: 'registry/example/use-cloud-walk-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-cloud-walk-demo.tsx',
      },
    ],
  },
  {
    name: 'use-efi-bank-demo',
    type: 'registry:example',
    title: 'UseEfiBank Demo',
    description: 'use-efi-bank in action.',
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-efi-bank.json',
    ],
    files: [
      {
        path: 'registry/example/use-efi-bank-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-efi-bank-demo.tsx',
      },
    ],
  },
];
