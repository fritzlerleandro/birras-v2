import {
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  Center,
  Image,
  Text,
  DrawerBody,
  Box,
  Slider,
  SliderMark,
  DrawerFooter,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  useBreakpointValue,
} from "@chakra-ui/react";

import HopIcon from "./icons/HopIcon";
import PercentageIcon from "./icons/PercentageIcon";
import {IBeer} from "./../pages/beersOld";

interface IBeerDraweProps {
  beer: IBeer;
  isOpen: boolean;
  onClose: () => void;
  fallbackImage: string;
  underMaintenance: (beer: IBeer) => boolean;
  highestValues: {ibu: number; abv: number};
}
function BeerDrawer({
  beer,
  isOpen,
  onClose,
  fallbackImage,
  underMaintenance,
  highestValues,
}: IBeerDraweProps): JSX.Element {
  const drawerPlacement = useBreakpointValue({base: "bottom", lg: "rigth"});

  return (
    <Drawer
      isOpen={isOpen}
      placement={drawerPlacement === "bottom" ? "bottom" : "right"}
      size={"md"}
      onClose={onClose}
    >
      <DrawerOverlay
        backdropFilter="blur(10px) hue-rotate(90deg)"
        bg="blackAlpha.300"
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
          {!underMaintenance(beer) && typeof beer.ibu === "number" && typeof beer.abv === "number" && (
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
                  value={typeof beer.ibu === "string" ? parseInt(beer.ibu) : beer.ibu}
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
                    value={typeof beer.ibu === "string" ? parseInt(beer.ibu) : beer.ibu}
                    w="12"
                  >
                    {typeof beer.ibu === "string" ? parseInt(beer.ibu) : beer.ibu}
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
                  value={typeof beer.abv === "string" ? parseFloat(beer.abv) : beer.abv}
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
                    value={typeof beer.abv === "string" ? parseFloat(beer.abv) : beer.abv}
                    w="12"
                  >
                    {`${typeof beer.abv === "string" ? parseFloat(beer.abv) : beer.abv} %`}
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
  );
}

export default BeerDrawer;
