/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_HCAPTCHA_SITE_KEY: string;
  readonly PUBLIC_COOKIEYES_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// GLightbox ships no TypeScript types
declare module 'glightbox';

interface Window {
  GLightboxInstance?: { reload: () => void };
}
