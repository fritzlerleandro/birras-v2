import {supabase} from "utils/supabaseClient";

export default async function handler(req, res) {
  let {brandId} = req.query;

  const {data, error} = await supabase.from("beer_brands").select("*").eq("id", brandId);

  if (error) {
    res.status(500).json({error});
  } else {
    res.status(200).json({beer_brand: data});
  }
}
