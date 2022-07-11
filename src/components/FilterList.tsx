import { useState } from "react";
import { Avatar, Box, Flex, IconButton, Spacer, Text, useBoolean } from "@chakra-ui/react"
import {ChevronRightIcon} from "@chakra-ui/icons";
import { IFilterState, IBeer } from 'src/pages/beersOld';
import { uniqueValues } from "utils/helpers";
import StyleFilter from "./StyleFilter";

interface IFilterListProps {
    beers: IBeer[];
    filterState: IFilterState;
    setFilterState: (filterState: IFilterState) => void;
    sortState?: string;
}
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
  
function IndividualFilter({uniqueBrands, uniqueCategories, filterType, filterState, setFilterState}) {
    if (filterType) {
        switch (filterType) {
            case "category": return (<StyleFilter uniqueCategories={uniqueCategories} customRender={customRender} customCreateItemRender={customCreateItemRender} handleCreateItem={() => {}}/>)
            case "brand": return <Text>Marcas</Text>;
            case "ibu": return <Text>IBU</Text>;
            case "abv": return <Text>% Alcohol</Text>;
        }
    }
}

function FilterList({beers, filterState, setFilterState, sortState}: IFilterListProps): JSX.Element {
    console.log("filterState", filterState)
    const uniqueCategories = uniqueValues(beers, 'category');
    const uniqueBrands = uniqueValues(beers, 'brand');

    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [filterType, setFilterType] = useState<string>("");

    const openFilter = (filterType: string) => {
        setShowFilter(!showFilter);
        setFilterType(filterType);
    }

    const closeFilter = (filterType: string) => {
        setShowFilter(!showFilter);
        setFilterType(filterType);
    }

    if (showFilter) {
        return <IndividualFilter uniqueBrands={uniqueBrands} uniqueCategories={uniqueCategories} filterType={filterType} filterState={filterState} setFilterState={setFilterState}/>
    } else {
        return (<>
            {/* Sort by */}
            <Flex alignItems={"center"} mb={3}>
                <Box p='2'>
                <Text>Ordernar por</Text>
                </Box>
                <Spacer />
                <Text>{sortState ? sortState : "Canilla"}</Text>
                <IconButton
                    variant={"none"}
                    aria-label="Ordenar por canillas"
                    icon={<ChevronRightIcon />}
                />
            </Flex>
            {/* Filter by style */}
            <Flex alignItems={"center"}>
                <Box p='2'>
                <Text>Estilos</Text>
                </Box>
                <Spacer />
                <Text>{filterState.category.length ? "Modificar" : "Cualquier estilo"}</Text>
                <IconButton
                    variant={"none"}
                    aria-label="Filtrar por estilo"
                    icon={<ChevronRightIcon />}
                    onClick={() => openFilter("category")}
                />
            </Flex>
            {/* Filter by brand */}
            <Flex alignItems={"center"}>
                <Box p='2'>
                <Text>Marca</Text>
                </Box>
                <Spacer />
                <Text>{filterState.brand.length ? "Modificar" : "Cualquier marca"}</Text>
                <IconButton
                    variant={"none"}
                    aria-label="Filtrar por marca"
                    icon={<ChevronRightIcon />}
                    onClick={() => openFilter("brand")}
                />
            </Flex>
            {/* Filter by IBU */}
            <Flex alignItems={"center"}>
                <Box p='2'>
                <Text>Amargor (IBU)</Text>
                </Box>
                <Spacer />
                <Text>{(filterState.ibu.min && filterState.ibu.max) ? `${filterState.ibu.min}-${filterState.ibu.max} IBU` : "Cualquier IBU"}</Text>
                <IconButton
                    variant={"none"}
                    aria-label="Filtrar por amargor (IBU)"
                    icon={<ChevronRightIcon />}
                    onClick={() => openFilter("ibu")}
                />
            </Flex>
            {/* Filter by ABV */}
            <Flex alignItems={"center"}>
                <Box p='2'>
                <Text>% Alcohol</Text>
                </Box>
                <Spacer />
                <Text>{(filterState.abv.min && filterState.abv.max) ? `${filterState.abv.min}-${filterState.abv.max}% ABV` : "Cualquier %"}</Text>
                <IconButton
                    variant={"none"}
                    aria-label="Filtrar por porcentaje de alcohol"
                    icon={<ChevronRightIcon />}
                    onClick={() => openFilter("abv")}
                />
            </Flex>
        </>)
    }
}

export default FilterList
