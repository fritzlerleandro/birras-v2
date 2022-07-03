import {useBreakpointValue} from "@chakra-ui/react";
import {Box, Heading, Text, useDisclosure, Grid, GridItem, Flex} from "@chakra-ui/react";
import Image from "next/image";

import {colors} from "utils/constant";

import BeerDrawer from "./BeerDrawer";

export default function BeerCard({beer, tapNumber, highestValues}) {
  const {isOpen, onToggle, onClose} = useDisclosure();
  const fallbackImage =
    "https://firebasestorage.googleapis.com/v0/b/menuvirtual-birras.appspot.com/o/logos-cervecerias%2FLaBirra-logo.png?alt=media&token=bda9b872-0eee-4b42-97a5-8ae32861626d";

  const underMaintenance = (beer) => {
    const maintenance = beer.id === 113;

    return maintenance;
  };

  const maxWVariant = useBreakpointValue({base: "90%", sm: "xl"});
  const minWVariant = useBreakpointValue({base: "90%", sm: "md", md: "2xl"});

  return (
    <>
      <Flex
        _hover={{boxShadow: ".25rem .25rem 10px rgba(0, 0, 0, 0.1)"}}
        bg={"white"}
        borderColor={"gray.100"}
        borderLeftColor={colors[beer.category] || "gray.300"}
        borderLeftWidth={8}
        borderRadius={8}
        borderWidth={2}
        maxW={maxWVariant}
        minW={minWVariant}
        p={"1rem .25rem"}
        onClick={onToggle}
      >
        <Grid
          gap={0}
          h="100%"
          templateColumns="repeat(4, 1fr)"
          templateRows={underMaintenance(beer) ? "repeat(3, 1fr)" : "masonry(1fr)"}
          w="100%"
        >
          <GridItem alignSelf={"center"} colSpan={1} justifySelf={"center"} mr={2} rowSpan={3}>
            <Box
              border={"1px solid #eaeaea"}
              borderRadius={"full"}
              boxSize={"4rem"}
              overflow="hidden"
            >
              <Image
                alt={`Logo de la cerveza ${beer.name} de ${beer.brand}`}
                height={"100%"}
                objectFit={"cover"}
                src={beer.imagen || fallbackImage}
                width={"100%"}
              />
            </Box>
          </GridItem>
          <GridItem
            colSpan={3}
            ml={3}
            pt={underMaintenance(beer) ? 2 : 4}
            rowSpan={underMaintenance(beer) ? 2 : 1}
          >
            <Heading isTruncated as="h3" mb={1} size="sm">
              {`#${tapNumber} / ${beer.name}`}
            </Heading>
          </GridItem>
          <GridItem colSpan={3} ml={3} rowSpan={1}>
            <Text color="gray.500" fontSize="sm">
              {underMaintenance(beer) ? "¡Preparate para lo que se viene!" : beer.brand}
            </Text>
          </GridItem>
          {/**Conditional rendering for under maintenance taps */}
          {!underMaintenance(beer) && (
            <>
              <GridItem alignSelf={"center"} colSpan={1} justifySelf={"center"} pt={12} rowSpan={2}>
                <Text align={"center"} color="black" fontSize="sm" fontWeight={"bold"}>
                  PRECIO
                </Text>
              </GridItem>
              <GridItem alignSelf={"center"} colSpan={1} justifySelf={"center"} pt={12} rowSpan={2}>
                <Text align={"center"} color="black" fontSize="sm" fontWeight={"bold"}>
                  ABV
                </Text>
              </GridItem>
              <GridItem alignSelf={"center"} colSpan={1} justifySelf={"center"} pt={12} rowSpan={2}>
                <Text align={"center"} color="black" fontSize="sm" fontWeight={"bold"}>
                  IBU
                </Text>
              </GridItem>
              <GridItem alignSelf={"center"} colSpan={1} justifySelf={"center"} mr={2} rowSpan={2}>
                <Text align={"center"} color="black" fontSize="lg" />
              </GridItem>
              <GridItem colSpan={1} justifySelf={"center"} rowSpan={1}>
                <Text align={"center"} color="black" fontSize="md">
                  {`$${beer.price}`}
                </Text>
              </GridItem>
              <GridItem colSpan={1} rowSpan={1}>
                <Text align={"center"} color="black" fontSize="md">
                  {`${beer.abv}%`}
                </Text>
              </GridItem>
              <GridItem colSpan={1} justifySelf={"center"} rowSpan={1}>
                <Text align={"center"} color="black" fontSize="md">
                  {beer.ibu}
                </Text>
              </GridItem>
            </>
          )}
        </Grid>
      </Flex>
      <BeerDrawer
        beer={beer}
        fallbackImage={fallbackImage}
        highestValues={highestValues}
        isOpen={isOpen}
        underMaintenance={underMaintenance}
        onClose={onClose}
      />
    </>
  );
}
