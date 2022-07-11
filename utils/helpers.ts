import {IBeer, IFilterBrand} from 'src/pages/beersOld'

/**
 * It takes the array of beers and reduces it to an array of unique values
 * It works for 
 * 
 * @param beers as IBeer[]
 * @param valueToLookFor as string
 * @returns IFilterBrand[]
 */
export const uniqueValues = function (beers : IBeer[], valueToLookFor: keyof IBeer) : IFilterBrand[] {
  return beers.reduce((prev, curr) => {
      if (!prev.some((element) => element.value === curr[valueToLookFor])) {
        prev.push({
          value: String(curr[valueToLookFor]),
          label: String(curr[valueToLookFor]),
          src: "",
        });
      }
  
      return prev;
    }, []);
}