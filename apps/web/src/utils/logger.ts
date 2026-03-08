const isDev = import.meta.env.VITE_ENV === "development";
console.log(import.meta.env.VITE_ENV);

const logger = {
  log: (...args: unknown[]) => isDev && console.log("[LOG]", ...args),
  info: (...args: unknown[]) => isDev && console.info("[INFO]", ...args),
  warn: (...args: unknown[]) => isDev && console.warn("[WARN]", ...args),
  error: (...args: unknown[]) => console.error("[ERROR]", ...args), // always log errors
};

export default logger;
