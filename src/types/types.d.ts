import 'firebase/auth';

/** Type for window object (Firebase Auth) */
declare module '@firebase/auth/dist/auth-public' {
  export type Window = {
    firebase: { auth: Auth };
  };

  export type HTMLElement = {
    id: number;
    recaptcha: Recaptcha;
  };

  export type Recaptcha = {
    render: (container: HTMLElement, parameters: RecaptchaParameters) => number;
    getResponse: (id: number) => string;
    execute: (id: number) => unknown;
    reset: (id: number) => unknown;
  };
}
/** Type for service worker registration (Firebase Messaging FCM) */
declare module '@firebase/messaging/dist/index-public' {
  export type ServiceWorkerRegistration = unknown;
}