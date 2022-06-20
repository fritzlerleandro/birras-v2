import {useBreakpointValue} from "@chakra-ui/react";
import {
  Box,
  Heading,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  Center,
  Grid,
  GridItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Flex,
} from "@chakra-ui/react";
import Image from "next/image";

import {colors} from "utils/constant";

import HopIcon from "./icons/HopIcon";
import PercentageIcon from "./icons/PercentageIcon";

export default function BeerCard({beer, tapNumber, highestValues}) {
  const {isOpen, onToggle, onClose} = useDisclosure();
  const fallbackImage =
    "https://firebasestorage.googleapis.com/v0/b/menuvirtual-birras.appspot.com/o/logos-cervecerias%2FLaBirra-logo.png?alt=media&token=bda9b872-0eee-4b42-97a5-8ae32861626d";

  const underMaintenance = (beer) => {
    const maintenance = beer.id === 113 ? true : false;

    return maintenance;
  };

  const drawerPlacement = useBreakpointValue({base: "bottom", lg: "rigth"});
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
      <Drawer
        isOpen={isOpen}
        placement={drawerPlacement === "bottom" ? "bottom" : "right"}
        size={"md"}
        onClose={onClose}
      >
        <DrawerOverlay
          //bg='blackAlpha.300'
          backdropBlur="2px"
          backdropFilter="auto"
          backdropInvert="20%"
          bg="none"
        />
        <DrawerContent borderTopRadius={12} maxH={drawerPlacement === "bottom" ? "80vh" : "100vh"}>
          <Center
            border={"1px solid #eaeaea"}
            borderRadius="full"
            boxShadow="lg"
            boxSize="5rem"
            m={"2rem auto .5rem"}
            minH={"5rem"}
            minW={"5rem"}
            overflow={"hidden"}
          >
            <Image
              alt={`${beer.name} de ${beer.brand}`}
              height={"100%"}
              objectFit={"cover"}
              src={beer.imagen || fallbackImage}
              width={"100%"}
            />
          </Center>
          <DrawerHeader borderBottomWidth=".1rem" mb={4}>
            <Text fontWeight={"bold"}>{beer.name}</Text>
            <Text color="gray.500" fontSize="sm">
              {underMaintenance(beer) ? "" : beer.brand}
            </Text>
          </DrawerHeader>
          <DrawerBody>
            {!underMaintenance(beer) && (
              <Text fontSize="md" fontWeight={"bold"} mb={2}>
                DESCRIPCIÓN
              </Text>
            )}
            <Text as={"cite"} color="gray.500">
              {beer.description}
            </Text>
            {!underMaintenance(beer) &&
              typeof beer.ibu === "number" &&
              typeof beer.abv === "number" && (
                <Text fontSize="md" fontWeight={"bold"} mb={2} mt={6}>
                  CARACTERÍSTICAS
                </Text>
              )}
            <Box
              // maxW={'sm'}
              m={"1.5rem 0.5rem 0.5rem 0.5rem"}
            >
              {typeof beer.ibu === "number" && (
                <>
                  <Text color="gray.500" mb={10}>
                    Grado de amargor (IBU)
                  </Text>
                  <Slider
                    isReadOnly
                    aria-label="ibu-slider"
                    max={highestValues.ibu}
                    mb={10}
                    min={0}
                    value={parseInt(beer.ibu)}
                  >
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
                      value={parseInt(beer.ibu)}
                      w="12"
                    >
                      {parseInt(beer.ibu)}
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack bg="green.700" />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                      <HopIcon fill={"green.700"} />
                    </SliderThumb>
                  </Slider>
                </>
              )}
              {typeof beer.abv === "number" && (
                <>
                  <Text color="gray.500" mb={10}>
                    Porcentaje de alcohol (ABV%)
                  </Text>
                  <Slider
                    isReadOnly
                    aria-label="abv-slider"
                    max={highestValues.abv}
                    min={0}
                    value={parseFloat(beer.abv)}
                  >
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
                      value={parseFloat(beer.abv)}
                      w="12"
                    >
                      {`${parseFloat(beer.abv)} %`}
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack bg="yellow.500" />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                      <PercentageIcon fill={"yellow.500"} height={10} width={10} />
                    </SliderThumb>
                  </Slider>
                </>
              )}
            </Box>
          </DrawerBody>
          <DrawerFooter>
            <Text size="xs">{""}</Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
