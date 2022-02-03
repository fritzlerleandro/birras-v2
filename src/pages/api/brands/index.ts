import { supabase } from  'utils/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { definitions } from 'types/supabase';

export default async function handler(req : NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  const getBrands = async () => {
    try {
      const { data: brands, error } = await supabase
      .from<definitions['beer_brands']>('beer_brands')
      .select('*')
  
      if (error) {
          res.status(500).json({ error })
          res.end()
      } else {
        res.status(200).json({ brands })
        res.end()
      }
    } catch (error) {
        res.status(500).json({ error })
        res.end()
    }
  }

  interface IBrand {
    brandName: string,
    logoUrl?: string | null,
  }

  const addBrand = async (brand: IBrand) => {
    console.log("Hitteado, alto POST", brand)
    console.log("Tipos de datos de lo que viene", typeof brand.brandName, typeof brand.logoUrl)


    let invalidData = typeof brand.brandName !== 'string' || (typeof brand.logoUrl !== 'string' && brand.logoUrl !== null);
    console.log("Invalid Data?", invalidData)
    if (invalidData) {
      res.status(400).json({ error: 'brandName and logoUrl must be a strings' })
      return
    } else {
      // res.status(200).json({ message: 'types are compatible' })
      const { data, error } = await supabase
      .from<definitions['beer_brands']>('beer_brands')
      .insert([
        { brand_name: brand.brandName,
          logo_url: brand.logoUrl }
      ])
      
      if (error) {
          res.status(500).json({ error })
        } else {
          res.status(201).json({ brand: data })
      }
    }
    

      // res.status(201).json({ brand: brand })

  }


  switch(method) {
    case 'GET': 
      try {
        // Get list of brands
        getBrands()
      } catch (error) {
        console.log(error)
      }
      break
    case 'POST':
      addBrand(<IBrand>req.body)
      // Create new brand
      break
    default:
      res.status(405).end() //Method Not Allowed
      break
  }
  

  

}