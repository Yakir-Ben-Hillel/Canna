import { Request, Response, NextFunction } from 'express';

export interface MCPInfo {
  ip: string;
  country: string;
  language: string;
  compliance: {
    isLegal: boolean;
  };
}

declare module 'express-serve-static-core' {
  interface Request {
    mcp?: MCPInfo;
  }
}

const LEGAL_COUNTRIES = ['IL', 'CA', 'US-CO'];

export function mcp(req: Request, _res: Response, next: NextFunction) {
  const languageHeader = req.headers['accept-language'];
  const language = Array.isArray(languageHeader)
    ? languageHeader[0]
    : (languageHeader || 'en').split(',')[0];

  const country =
    (req.headers['x-country'] as string | undefined) || 'unknown';

  const isLegal = LEGAL_COUNTRIES.includes(country);

  req.mcp = {
    ip: req.ip || '',
    country,
    language,
    compliance: { isLegal },
  };

  next();
}
