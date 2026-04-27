import type { ExpressLocaleLoader } from "#src/infrastructure/express/middleware/nunjucks/i18nLoader.js";

declare global {
  namespace Express {
    interface Request {
      locale: ExpressLocaleLoader;
    }
  }
}
