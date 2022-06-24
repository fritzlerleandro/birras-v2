import {GetServerSideProps} from "next";
import {useState} from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalOverlay,
  VStack,
  HStack,
} from "@chakra-ui/react";
import {MdFilterList} from "react-icons/md";
import {useDisclosure} from "@chakra-ui/react";

import BeerCard from "src/components/BeerCard";
import SearchBar from "src/components/SearchBar";
import {endpoints} from "utils/constant";
import {oldBeers} from "utils/oldBeers";

export default function BeersOld({canillas}) {
  const {isOpen, onOpen, onClose} = useDisclosure();

  interface IBeer {
    id: number;
    name: string;
    brand: string;
    price: number;
    on_tap: number;
    category: string;
    subcategory: string;
    ibu: number | string;
    abv: number | string;
    description: string;
    imagen: string;
  }
  interface IMinMax {
    min: number;
    max: number;
  }

  type TbeerCategories = "COCTEL" | "GOLDEN" | "APA" | "IPA" | "RED" | "DARK";

  interface IFilterState {
    name: string;
    abv: IMinMax;
    ibu: IMinMax;
    category: TbeerCategories[];
    brand: string[];
  }

  const [filterState, setFilterState] = useState<IFilterState>({
    name: "",
    abv: {
      min: null,
      max: null,
    },
    ibu: {
      min: null,
      max: null,
    },
    category: [],
    brand: [],
  });

  interface IFilter {
    name: Function;
    abv: Function;
    ibu: Function;
    category: Function;
    brand: Function;
  }

  // Filter predicates for filtering beers
  const filters = {
    name: (name: string) => {
      if (filterState.name === "") {
        return name;
      }

      return name.toLowerCase().includes(filterState.name.toLocaleLowerCase());
    },
    abv: (abv: number) => {
      if (filterState.abv.min !== null && filterState.abv.max !== null) {
        return abv >= filterState.abv.min && abv <= filterState.abv.max;
      } else {
        return abv;
      }
    },
    ibu: (ibu: number) => {
      if (filterState.ibu.min !== null && filterState.ibu.max !== null) {
        return ibu >= filterState.ibu.min && ibu <= filterState.ibu.max;
      } else {
        return ibu;
      }
    },
    category: (category: TbeerCategories) => {
      if (filterState.category.length) {
        return filterState.category.includes(category); // case sensitive
      } else {
        return true;
      }
    },
    brand: (brand: string) => {
      if (filterState.brand.length) {
        return filterState.brand.includes(brand); // case sensitive;
      } else {
        return true;
      }
    },
  };

  /**
   * Filters an array of objects using custom predicates.
   *
   * @param  {Array}  array: the array to filter
   * @param  {Object} filters: an object with the filter criteria
   * @return {Array}
   *
   * TODO: define Beer Object Interface
   *
   */
  function filterArray(beersArray: Object[], filters: IFilter): Object[] {
    const filterKeys = Object.keys(filters);

    console.log("original beersArray:", beersArray, "Applied filters: ", filters);
    //console.log("filterKeys: ", filterKeys);

    return beersArray.filter((beer) => {
      // validates all filter criteria
      return filterKeys.every((key) => {
        // ignores non-function predicates
        if (typeof filters[key] !== "function") return true;
        console.log(
          "beer to evaluate: ",
          beer[key],
          "filterState: ",
          filterState[key],
          "applied evaluation: ",
          filters[key],
          "evaluations's result: ",
          filters[key](beer[key]),
        );

        return filters[key](beer[key]);
      });
    });
  }

  const handleChange = (e) => {
    setFilterState({
      ...filterState,
      name: e.target.value,
    });
  };

  // console.log("canillas: ", canillas);
  const getHighestValue = (beers: Object[], prop: string) => {
    const highestValue = beers.reduce((max, beer) => {
      if (typeof beer[prop] === "number" && beer[prop] > max) {
        return beer[prop];
      }

      return max;
    }, 0);

    return highestValue;
  };

  // Retrieve highestValue for IBU and ABV
  const highestValues = {
    ibu: getHighestValue(canillas, "ibu"),
    abv: getHighestValue(canillas, "abv"),
  };

  const handleSetFilters = (e) => {
    setFilterState({
      ...filterState,
      abv: {
        min: 2,
        max: 10,
      },
      ibu: {
        min: 1,
        max: 50,
      },
      category: ["RED", "DARK", "IPA"],
      //category : [beerCategories.Golden, beerCategories.Ipa, beerCategories.Apa, beerCategories.Red, beerCategories.Dark],
      brand: ["PALO Y HUESO", "OKCIDENTA", "FAUCARIA", "NOMADA"],
    });
  };

  const handleApplyFilters = (e) => {
    console.log("filterState: ", filterState);
    console.log("filteredBeers>>>", filterArray(canillas, filters));
  };

  return (
    <Box
      //backgroundImage={'radial-gradient(#cdd0ff 1px,transparent 0),radial-gradient(#cdd0ff 1px,#fefefe 0)'}
      //bg={'radial-gradient(#cdd0ff 1px,transparent 0),radial-gradient(#cdd0ff 1px,#fefefe 0)'}
      m={"0 auto"}
      minWidth={"95%"}
    >
      <Box bg={"#fefefe"} p={".1rem"} sx={{position: "sticky", top: "0"}} zIndex={"1"}>
        <HStack m={"2rem auto"} maxW={"90%"}>
          <SearchBar onChange={handleChange} />
          <Button
            colorScheme="facebok"
            leftIcon={<MdFilterList />}
            variant="outline"
            onClick={onOpen}
          >
            Filtros
          </Button>
        </HStack>
      </Box>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" bg="blackAlpha.300" />
        <ModalContent>
          <ModalHeader>Filtrar canillas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button
              colorScheme="facebok"
              leftIcon={<MdFilterList />}
              variant="outline"
              onClick={handleSetFilters}
            >
              Setear filtros
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cerrar</Button>
            <Button onClick={handleApplyFilters}>Ver filtros</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <VStack spacing={4}>
        {filterArray(canillas, filters).map((beer: IBeer) => {
          return (
            <BeerCard
              key={`${beer.id}_${canillas.indexOf(beer)}`}
              beer={beer}
              highestValues={highestValues}
              tapNumber={canillas.indexOf(beer) + 1}
            />
          );
        })}
      </VStack>
    </Box>
  );
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
    const canillas = oldBeers;

    return {
      props: {
        canillas,
      },
    };
  } catch (err) {
    return {
      props: {
        statusCode: err?.status || err?.statusCode || 404,
      },
    };
  }
};
