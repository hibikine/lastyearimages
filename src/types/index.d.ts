declare module '*.woff';
declare module '*.woff2';
declare module '*.eot';
declare module '*.ttf';
declare module '*.png';
type Omit <T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
