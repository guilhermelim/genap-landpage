import { NextApiRequest, NextApiResponse } from "next";

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export default function initMiddleware(
  middleware: (
    req: NextApiRequest,
    res: NextApiResponse,
    callback: (result: unknown) => void
  ) => void
) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise<void>((resolve, reject) => {
      middleware(req, res, (result: unknown) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve();
      });
    });
}
