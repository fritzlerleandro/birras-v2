import { IFilterBrand, IFilterTypes, IFilterState, TbeerCategories, IHighestValues } from "src/pages/index";
import { Flex, Avatar, Text, Box,  } from "@chakra-ui/react";
import StyleFilter from "./individual-filters/StyleFilter";
import BrandFilter from "./individual-filters/BrandFilter";
import RangeFilter from './individual-filters/rangeFilter';
import {colors} from "utils/constant";
import HopIcon from "src/components/icons/HopIcon";


export interface IIndividualFilterProps {
  highestValues: IHighestValues;  
  uniqueBrands: IFilterBrand[]; // TODO: add generic types for brands
  uniqueCategories: IFilterBrand[];
  setOnHideFilter: () => void;
  filterType: IFilterTypes;
  filterState: IFilterState;
  setFilterState: (filterState: IFilterState) => void;
}

  const customRender = (selected) => {
    return (
      <Flex alignItems="center" flexDir="row">
        <Avatar loading="eager" mr={2} name={selected.label} size="sm" src={selected.src} />
        <Text>{selected.label}</Text>
      </Flex>
    );
  };

    const customRenderCategories = (selected) => {
    return (
      <Flex alignItems="center" flexDir="row">
        <Avatar bg={colors[selected.label]} loading="eager" mr={2} icon={<HopIcon fill={"white"} width={16} Height={16}/>} size="sm" />
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

function IndividualFilter({highestValues, uniqueBrands, uniqueCategories, setOnHideFilter, filterType, filterState, setFilterState}: IIndividualFilterProps): JSX.Element {
  console.log("filterState on Individual Filter>>>", filterState)  
  console.log("highestValues on Individual Filter>>>", highestValues)  
  if (filterType) {
        switch (filterType) {
            case "category": return (
              <StyleFilter 
                uniqueCategories={uniqueCategories} 
                customRender={customRenderCategories} 
                customCreateItemRender={customCreateItemRender} 
                handleCreateItem={() => {}} 
                filterState={filterState} 
                setFilterState={setFilterState}
              />)
            case "brand": return (
              <BrandFilter uniqueBrands={uniqueBrands} 
                customRender={customRender} 
                customCreateItemRender={customCreateItemRender} 
                handleCreateItem={() => {}} filterState={filterState} 
                setFilterState={setFilterState}
              />);
            case "ibu": return <RangeFilter rangeType={'ibu'} highestValues={highestValues} filterState={filterState} setFilterState={setFilterState}></RangeFilter>;
            case "abv": return <RangeFilter rangeType={'abv'} highestValues={highestValues} filterState={filterState} setFilterState={setFilterState}></RangeFilter>;
        }
    }
}

export default IndividualFilter;