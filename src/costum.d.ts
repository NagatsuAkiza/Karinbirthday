declare module "*.mp3" {
  const src: string;
  export default src;
}

declare module "*.wav" {
  const src: string;
  export default src;
}

declare module "bootstrap/dist/js/bootstrap.bundle.js" {
  const bootstrap: unknown = undefined;
  export default bootstrap;
}
