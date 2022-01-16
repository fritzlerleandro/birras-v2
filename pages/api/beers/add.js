import { supabase } from  'utils/supabaseClient'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  console.log("req.body is: ", req.body)
  try {
    // console.log("body is: ", body)
    res.status(200).json({ message: 'success', newBeer : req.body })
  } catch (error) {
    console.log("entró al error", error)
    res.status(500).json({ error })
  }

  // the rest of your code

// console.log("request body is: ", body);

  // const { data, error } = await supabase
  // .from('beer_list')
  // .select(`
  // id,  
  // beer_name,
  //   beer_brands (
  //     id,  
  //     brand_name
  //   ),
  //   beer_categories (
  //     category_name
  //   ),
  //   on_tap,
  //   abv,
  //   ibu,
  //   price,
  //   description
  // `)

  
  // if (error) {
  //     res.status(500).json({ error })
  //   } else {
  //       res.status(200).json({ beers: data })
  // }
}