import { useState } from "react";
import { Avatar, Box, Flex, IconButton, Spacer, Text } from "@chakra-ui/react"
import {ChevronRightIcon} from "@chakra-ui/icons";
import { IFilterTypes, IFilterState, IBeer } from 'src/pages/index';
import { uniqueValues } from "utils/helpers";

interface IFilterListProps {
    beers: IBeer[];
    filterState: IFilterState;
    filterType: IFilterTypes;
    setFilterType: (filterType: IFilterTypes) => void;
    setOnShowFilter: () => void;
    sortState?: string;
}


function FilterList({beers, filterState, filterType, sortState, setFilterType, setOnShowFilter}: IFilterListProps): JSX.Element {
    console.log("filterState", filterState)
    console.log("filterType", filterType)

    const openFilter = (filterType) =>{
        setOnShowFilter();
        setFilterType(filterType)
    }

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
                aria-label={"Ordenar por " + sortState}
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

export default FilterList
