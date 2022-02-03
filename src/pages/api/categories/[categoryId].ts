import { supabase } from  'utils/supabaseClient'

export default async function handler(req, res) {
  let { categoryId } = req.query;
  
  const { data, error } = await supabase
  .from('beer_categories')
  .select('*')
  .eq('id', categoryId)

  if (error) {
      res.status(500).json({ error })
    } else {
        res.status(200).json({ beer_category: data })
  }
}