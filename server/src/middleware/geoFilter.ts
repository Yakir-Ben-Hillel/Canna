import { Request, Response, NextFunction } from 'express';

const allowedRegions = ['US', 'CA', 'IL'];

export default function geoFilter(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const regionHeader = req.headers['x-region'];
  const region = Array.isArray(regionHeader)
    ? regionHeader[0]
    : regionHeader;

  if (region && allowedRegions.includes(region.toUpperCase())) {
    next();
  } else {
    res.status(403).send('Region not supported');
  }
}
