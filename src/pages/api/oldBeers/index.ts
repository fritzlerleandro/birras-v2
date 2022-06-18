import {NextApiRequest, NextApiResponse} from "next";

import {oldBeers} from "utils/oldBeers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {method} = req;

  const getOldBeers = async () => {
    try {
      return res.status(200).json(oldBeers);
    } catch (error) {
      return res.status(error.status).json({error});
    }
  };

  switch (method) {
    case "GET":
      // Get list of beers
      getOldBeers();
      break;
    case "POST":
      // Create new beer
      break;
    default: //Method Not Allowed
      res.status(405).end();
      break;
  }
}
