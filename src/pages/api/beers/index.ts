import { supabase } from  'utils/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { definitions } from 'types/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  const getBeers = async () => {
    const beerColumns = `id,beer_name, beer_brands (id,brand_name), beer_categories (category_name), on_tap, abv, ibu, price, description`
    const { data, error } = await supabase
    .from<definitions['beers']>('beers')
    .select(beerColumns)

  
    if (error) {
        res.status(500).json({ error })
      } else {
        res.status(200).json({ beers: data })
    }
  }


  switch(method) {
    case 'GET':
      // Get list of beers
      getBeers();
      break
    case 'POST':
      // Create new beer
      break
    default:
      res.status(405).end() //Method Not Allowed
      break
  }


}