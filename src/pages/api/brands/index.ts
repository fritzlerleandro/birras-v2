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
        /**
         * In case of error with Supase, we return the error message
         * Example of Supabase Error Object sent to client:
         * {
         *   "error": {
         *     "message": "new row violates row-level security policy for table \"beer_brands\"",
         *     "code": "42501", [ POSTGRESQL ERROR CODE, see https://www.postgresql.org/docs/9.6/errcodes-appendix.html ]
         *     "details": null,
         *     "hint": null
         *     }
         *   }
        **/
        res.status(500).json({ error })
        res.end()
      } else {
        res.status(200).json({ brands })
        res.end()
      }
    } catch (error) {
      // In case of Internal Error, it is retrieved 
      res.status(500).json({ error })
      res.end()
    }
  }

  // Interface for Brand Object
  interface IBrand {
    brandName: string,
    logoUrl?: string | null,
  }

  const addBrand = async (brand: IBrand) => {
    /**
     * TODO: replace with express-validator middleware to validate the request body in all endpoints
     * TODO: validate the shape of the body object. 
     * Check out https://github.com/altostra/type-validations
     * Article about it: https://www.altostra.com/blog/data-validation
     **/ 
    let invalidData = typeof brand.brandName !== 'string' || (typeof brand.logoUrl !== 'string' && brand.logoUrl !== null);
    if (invalidData) {
      return res.status(400).json({ error: 'brandName and logoUrl must be strings' })
    } else {
      try {
        const { data, error } = await supabase
        .from<definitions['beer_brands']>('beer_brands')
        .insert([
          { brand_name: brand.brandName,
            logo_url: brand.logoUrl }
        ])

        if (error) {
        /**
         * In case of error with Supase, it returns the error message
         * Example of Supabase Error Object sent by its API:
         * {
         *   "error": {
         *     "message": "new row violates row-level security policy for table \"beer_brands\"",
         *     "code": "42501", [ POSTGRESQL ERROR CODE, see https://www.postgresql.org/docs/9.6/errcodes-appendix.html ]
         *     "details": null,
         *     "hint": null
         *     }
         *   }
        **/
          return res.status(400).json({ error })
        } else {
          return res.status(201).json({ brand: data })
        }
    } catch (error) {
        // In case something went wrong with request
        return res.status(555).json({ error })
      }
    }
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