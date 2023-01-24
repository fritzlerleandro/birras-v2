import {definitions} from "types/supabase";
import {supabase} from "utils/supabaseClient";

export async function getServerSideProps() {
  const {data: brands, error} = await supabase
    .from<definitions["beer_brands"]>("beer_brands")
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return {
    props: {
      brands,
    },
  };
}

export default function Brands({brands}) {
  // console.log("brands.lenght and itself", brands.length, brands)

  return (
    <div className="container" style={{padding: "50px 0 100px 0"}}>
      {brands ? (
        brands.map((brand) => {
          return (
            <div key={brand.id} style={{height: "10px"}}>
              <h2>{brand.brand_name}</h2>
              <p>{brand.logo_url}</p>
            </div>
          );
        })
      ) : (
        <div className="loader">Loading...</div>
      )}
    </div>
  );
}
