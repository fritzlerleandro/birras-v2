import {GetServerSideProps} from "next";
import {useState} from "react";
import {
  Avatar,
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
  Slider,
  SliderMark,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Flex,
} from "@chakra-ui/react";
import {MdFilterList} from "react-icons/md";
import {useDisclosure} from "@chakra-ui/react";
import {CUIAutoComplete} from "chakra-ui-autocomplete";

import BeerCard from "src/components/BeerCard";
import SearchBar from "src/components/SearchBar";
import {endpoints} from "utils/constant";
import {oldBeers} from "utils/oldBeers";
import HopIcon from "src/components/icons/HopIcon";
import PercentageIcon from "src/components/icons/PercentageIcon";

export interface IBeer {
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
export interface IMinMax {
  min: number;
  max: number;
}

export type TbeerCategories = "COCTEL" | "GOLDEN" | "APA" | "IPA" | "RED" | "DARK";

export interface IFilterState {
  name: string;
  abv: IMinMax;
  ibu: IMinMax;
  category: TbeerCategories[];
  brand: string[];
}

export interface IFilter {
  name: Function;
  abv: Function;
  ibu: Function;
  category: Function;
  brand: Function;
}

export interface IFilterBrand {
  value: string;
  label: string;
  src: string;
}

export default function BeersOld({canillas}) {
  const uniqueBrands: IFilterBrand[] = canillas.reduce((prev, curr) => {
    if (!prev.some((brand) => brand.value === curr.brand)) {
      prev.push({
        value: String(curr.brand),
        label: String(curr.brand),
        src: curr.imagen,
      });
    }

    return prev;
  }, []);

  const uniqueCategories: IFilterBrand[] = canillas.reduce((prev, curr) => {
    if (!prev.some((category) => category.value === curr.category)) {
      prev.push({
        value: String(curr.category),
        label: String(curr.category),
        src: "",
      });
    }

    return prev;
  }, []);

  console.log("marcas unicas: ", uniqueBrands);
  console.log("categorias unicas: ", uniqueCategories);

  const {isOpen, onOpen, onClose} = useDisclosure();
  // State for UI brand selection
  const [pickerBrands, setPickerBrands] = useState(uniqueBrands);
  const [selectedBrands, setSelectedBrands] = useState([]);
  // State for UI category selection
  const [pickerCategories, setPickerCategories] = useState(uniqueCategories);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCreateItem = (item) => {
    setPickerBrands((curr) => [...curr, item]);
    setSelectedBrands((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedBrands(selectedItems);
    }
  };

  const handleSelectedCategoriesChange = (selectedCategory) => {
    if (selectedCategory) {
      setSelectedCategories(selectedCategory);
    }
  };

  const customRender = (selected) => {
    return (
      <Flex alignItems="center" flexDir="row">
        <Avatar mr={2} name={selected.label} size="sm" src={selected.src} />
        <Text>{selected.label}</Text>
      </Flex>
    );
  };

  const customCreateItemRender = (value) => {
    return (
      <Text>
        <Box as="span">Create</Box>{" "}
        <Box as="span" bg="red.300" fontWeight="bold">
          {value}
        </Box>
      </Text>
    );
  };

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
  const getHighestValue = (beers: IBeer[], prop: string): number => {
    const highestValue = beers.reduce((max, beer) => {
      if (typeof beer[prop] === "number" && beer[prop] > max) {
        return beer[prop];
      }

      return max;
    }, 0);

    return highestValue;
  };

  // Retrieve highestValue for IBU and ABV
  const highestValues: {
    abv: number;
    ibu: number;
  } = {
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

      <Modal isCentered isOpen={isOpen} size="sm" onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" bg="blackAlpha.300" />
        <ModalContent>
          <ModalHeader>Filtros</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Filter by style */}
            <Text color="gray.500">Elige el estilo</Text>
            <CUIAutoComplete
              createItemRenderer={customCreateItemRender}
              disableCreateItem={true}
              itemRenderer={customRender}
              items={pickerCategories}
              label={null}
              listStyleProps={{
                maxHeight: "8rem",
                overflow: "scroll",
              }}
              placeholder="Escribe los estilos que quieres"
              selectedItems={selectedCategories}
              tagStyleProps={{
                rounded: ".25rem",
              }}
              onCreateItem={handleCreateItem}
              onSelectedItemsChange={(changes) =>
                handleSelectedCategoriesChange(changes.selectedItems)
              }
            />
            {/* Filter by brand */}
            <Text color="gray.500">Elige tus marcas</Text>
            <CUIAutoComplete
              createItemRenderer={customCreateItemRender}
              disableCreateItem={true}
              itemRenderer={customRender}
              items={pickerBrands}
              label={null}
              listStyleProps={{
                maxHeight: "8rem",
                overflow: "scroll",
              }}
              placeholder="Escribe una marca"
              selectedItems={selectedBrands}
              tagStyleProps={{
                rounded: ".25rem",
              }}
              onCreateItem={handleCreateItem}
              onSelectedItemsChange={(changes) => handleSelectedItemsChange(changes.selectedItems)}
            />
            {/* Filter by IBU */}
            <Text color="gray.500" mb={10}>
              Grado de amargor (IBU)
            </Text>
            <Slider aria-label="ibu-slider" max={highestValues.ibu} mb={10} min={0} value={50}>
              <SliderMark fontSize="sm" ml="-2.5" mt="1" value={0}>
                0
              </SliderMark>
              <SliderMark fontSize="sm" ml="-2.5" mt="1" value={highestValues.ibu / 2}>
                {highestValues.ibu / 2}
              </SliderMark>
              <SliderMark fontSize="sm" ml="-2.5" mt="1" value={highestValues.ibu}>
                {highestValues.ibu}
              </SliderMark>
              <SliderMark
                bg="green.700"
                borderRadius={4}
                color="white"
                ml="-5"
                mt="-10"
                textAlign="center"
                value={50}
                w="12"
              >
                {50}
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack bg="green.700" />
              </SliderTrack>
              <SliderThumb boxSize={6}>
                <HopIcon fill={"green.700"} />
              </SliderThumb>
            </Slider>
            {/* Filter by ABV */}
            <Text color="gray.500" mb={10}>
              Porcentaje de alcohol (ABV%)
            </Text>
            <Slider isReadOnly aria-label="abv-slider" max={highestValues.abv} min={0} value={3}>
              <SliderMark fontSize="sm" ml="-2.5" mt="1" value={0}>
                0%
              </SliderMark>
              <SliderMark fontSize="sm" ml="-2.5" mt="1" value={highestValues.abv / 2}>
                {highestValues.abv / 2}%
              </SliderMark>
              <SliderMark fontSize="sm" ml="-2.5" mt="1" value={highestValues.abv}>
                {highestValues.abv}%
              </SliderMark>
              <SliderMark
                bg="yellow.500"
                borderRadius={4}
                color="white"
                ml="-5"
                mt="-10"
                textAlign="center"
                value={3}
                w="12"
              >
                {`${3} %`}
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack bg="yellow.500" />
              </SliderTrack>
              <SliderThumb boxSize={6}>
                <PercentageIcon fill={"yellow.500"} height={10} width={10} />
              </SliderThumb>
            </Slider>
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
