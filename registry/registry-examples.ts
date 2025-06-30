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
    name: 'use-eye-dropper-demo',
    type: 'registry:example',
    title: 'UseEyeDropperDemo',
    description: "use-eye-dropper's hook in action.",
    registryDependencies: [
      'card',
      'button',
      'https://guarahooks.com/r/use-eye-dropper.json',
    ],
    files: [
      {
        path: 'registry/example/use-eye-dropper-demo.tsx',
        type: 'registry:example',
        target: 'components/example/use-eye-dropper-demo.tsx',
      },
    ],
  },
];
