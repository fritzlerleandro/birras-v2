import { supabase } from  'utils/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { definitions } from 'types/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch(method) {
    case 'GET':
      //...
      break
    case 'POST':
      //...
      break
    default:
      res.status(405).end() //Method Not Allowed
      break
  }



  const { data, error } = await supabase
  .from<definitions['beers']>('beers')
  .select(`
  id,  
  beer_name,
    beer_brands (
      id,  
      brand_name
    ),
    beer_categories (
      category_name
    ),
    on_tap,
    abv,
    ibu,
    price,
    description
  `)

  
  if (error) {
      res.status(500).json({ error })
    } else {
      res.status(200).json({ beers: data })
  }
}