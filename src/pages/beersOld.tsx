import { GetServerSideProps } from "next";

import { endpoints } from '../../utils/constant'

import { Box } from "@chakra-ui/react";
import BeerCard from "src/components/BeerCard";



export default function BeersOld({ canillas }) {
  // console.log("canillas: ", canillas);
  const getHighestValue = (beers: Object[], prop: string) => {
    const highestValue = beers.reduce((max, beer) => {
      if (typeof beer[prop] === 'number'
          && beer[prop] > max) {
        return beer[prop];
      }
      return max;
    }, 0);

    return highestValue;
  }
  
  
  const highestValues = {
    ibu: getHighestValue(canillas, 'ibu'),
    abv: getHighestValue(canillas, 'abv'),
  }

  return (
      <Box
        backgroundImage={'radial-gradient(#cdd0ff 1px,transparent 0),radial-gradient(#cdd0ff 1px,#fefefe 0)'}
        //bg={'radial-gradient(#cdd0ff 1px,transparent 0),radial-gradient(#cdd0ff 1px,#fefefe 0)'}
        bg={'#fafafa'}
      >
        {canillas.map((beer) => {
          return <BeerCard 
            beer={beer} 
            tapNumber={canillas.indexOf(beer)+1} key={`${beer.id}_${canillas.indexOf(beer)}`}
            highestValues={highestValues}
            />
        })}
      </Box>
  )
}

// Get props to render the beer list
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    //const OLD_BEERS = endpoints.OLD_BEERS.value;
    //const canillas= await fetch(OLD_BEERS).then(res=>res.json())
    /**
     * Disclaimer: This is not the way to go in next.js for production,
     * but for the sake of this example and to test the logic,
     * I will use it this way.
     */
    const OLD_BEERS_MOCK = "http://localhost:3000/api/oldBeers"
    const canillas= await fetch(OLD_BEERS_MOCK).then(res=>res.json())
  
    return {
      props: {
        canillas
      }
    };
    
  } catch (err) {
    return {
      props: {
        statusCode: err?.status || err?.statusCode || 404,
      }
    }
  }
}