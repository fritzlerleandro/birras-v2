import {IBeer, IFilterBrand} from 'src/pages/index'
import { colors } from "utils/constant";

/**
 * It takes the array of beers and reduces it to an array of unique values with IFIlterBrand object shape
 * It works for 
 * 
 * @param beers as IBeer[]
 * @param valueToLookFor as string
 * @returns IFilterBrand[]
 */
export const uniqueValues = function (beers : IBeer[], valueToLookFor: keyof IBeer) : IFilterBrand[] {
  return beers.reduce((prev, curr) => {
      if (curr[valueToLookFor] && !prev.some((element) => element.value === curr[valueToLookFor])) {
        prev.push({
          value: String(curr[valueToLookFor]),
          label: String(curr[valueToLookFor]),
          src: valueToLookFor === "brand" ? String(curr.imagen) : "",
        });
      }
  
      return prev;
    }, []);
}