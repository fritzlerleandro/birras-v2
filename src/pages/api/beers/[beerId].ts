import { supabase } from  'utils/supabaseClient'

export default async function handler(req, res) {
// Beer id is passed in as a parameter
const { beerId } = req.query;

const { data, error } = await supabase
  .from('beer_list')
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
  .eq('id', beerId)

  if (error) {
      res.status(500).json({ error })
    } else {
        res.status(200).json({ beers: data })
  }
}