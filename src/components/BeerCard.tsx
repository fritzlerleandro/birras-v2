// Constants
import { colors } from 'utils/constant';

// Hooks
import { useBreakpointValue } from '@chakra-ui/react';

// Chakra components
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
  Stack,
  Grid,
  GridItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react';
import Image from 'next/image';

// Icons
import HopIcon from './icons/HopIcon';
import PercentageIcon from './icons/PercentageIcon';

export default function BeerCard({ beer, tapNumber, highestValues }) {
    const { isOpen, onToggle, onClose} = useDisclosure();
    const fallbackImage = "https://firebasestorage.googleapis.com/v0/b/menuvirtual-birras.appspot.com/o/logos-cervecerias%2FLaBirra-logo.png?alt=media&token=bda9b872-0eee-4b42-97a5-8ae32861626d";
    
    const underMaintenance = (beer) => {
        const maintenance = beer.id === 113 ? true : false;
        return maintenance;
    }

    const drawerPlacement = useBreakpointValue({base: 'bottom', lg: 'rigth'});
    const stackVariant = useBreakpointValue({base: '2xl', sm: 'xl'});
    
    return (
        <>
            <Stack 
                direction={'row'} 
                m={'1rem auto'}
                p={'1rem .25rem'} 
                bg={'white'}
                maxW= { stackVariant }
                onClick={ onToggle }
                borderRadius= {8}
                borderWidth={2}
                borderColor={"gray.100"}
                borderLeftWidth={8}
                borderLeftColor={colors[beer.category] || "gray.300"}
                _hover={{boxShadow: ".25rem .25rem 10px rgba(0, 0, 0, 0.1)"}}
            >
                <Grid
                    h='100%'
                    w='100%'
                    templateRows={ underMaintenance(beer) ? 'repeat(3, 1fr)' : 'masonry(1fr)'}
                    templateColumns='repeat(4, 1fr)'
                    gap={0}
                >
                    <GridItem 
                        rowSpan={3}
                        colSpan={1}
                        alignSelf={'center'}
                        justifySelf={'center'}
                        mr={2}
                    >
                        <Box
                            borderRadius={'full'}
                            overflow='hidden'
                            boxSize={'4rem'}
                            border={'1px solid #eaeaea'}
                        >
                            <Image
                                src={beer.imagen || fallbackImage}
                                alt={`Logo de la cerveza ${beer.name} de ${beer.brand}`}
                                width={'100%'}
                                height={'100%'}
                            />
                        </Box>
                    </GridItem>
                    <GridItem 
                        rowSpan={underMaintenance(beer) ? 2 : 1} 
                        colSpan={3}
                        pt={underMaintenance(beer) ? 2 : 4} 
                        ml={3}                   
                    >                     
                        <Heading as='h3' size='sm' mb={1}>
                            { `#${tapNumber} / ${beer.name}` }
                        </Heading>
                    </GridItem>
                    <GridItem 
                        rowSpan={1}
                        colSpan={3}
                        ml={3} 
                    >
                        <Text
                            fontSize='sm' 
                            color='gray.500'
                        >
                            { underMaintenance(beer) ? '¡Preparate para lo que se viene!' : beer.brand }
                        </Text>
                    </GridItem>
                    {/**Conditional rendering for under maintenance taps */}
                    { !underMaintenance(beer) && <>
                    <GridItem
                        rowSpan={2}
                        colSpan={1} 
                        alignSelf={'center'}
                        justifySelf={'center'}
                        pt={12}
                    >
                        <Text
                            fontSize='sm'
                            color='black'
                            fontWeight={'bold'}
                            align={'center'}
                        >
                            PRECIO
                        </Text>
                    </GridItem>
                    <GridItem
                        rowSpan={2} 
                        colSpan={1}
                        alignSelf={'center'}
                        justifySelf={'center'}
                        pt={12}
                    >
                        <Text fontSize='sm'
                        color='black' 
                        fontWeight={'bold'} 
                        align={'center'}
                        >
                            ABV
                        </Text>
                    </GridItem>
                    <GridItem
                        rowSpan={2} 
                        colSpan={1}
                        alignSelf={'center'}
                        justifySelf={'center'}
                        pt={12}
                    >
                        <Text
                            fontSize='sm'
                            color='black'
                            fontWeight={'bold'}
                            align={'center'}
                        >
                            IBU
                        </Text>
                    </ GridItem>
                    <GridItem
                        rowSpan={2} 
                        colSpan={1}
                        alignSelf={'center'}
                        justifySelf={'center'}
                        mr={2}
                    > 
                        <Text 
                            fontSize='lg'
                            color='black'
                            align={'center'}  
                        />
                    </ GridItem>
                        <GridItem
                        rowSpan={1}
                        colSpan={1}
                        justifySelf={'center'} 
                    >                          
                        <Text fontSize='md' color='black' align={'center'}>
                            {`$${beer.price}`}
                        </Text>
                    </ GridItem>
                    <GridItem
                        rowSpan={1} 
                        colSpan={1} 
                    >
                        <Text
                            fontSize='md'
                            color='black'
                            align={'center'}
                        >
                            {`${beer.abv}%`}
                        </Text>
                    </ GridItem>
                    <GridItem 
                        rowSpan={1}
                        colSpan={1}
                        justifySelf={'center'} 
                    >
                        <Text 
                            fontSize='md' 
                            color='black' 
                            align={'center'}
                        >
                            {beer.ibu}
                        </Text>
                    </ GridItem>
                    </>
                    }
                </Grid>
            </Stack>
            <Drawer
                placement= { drawerPlacement === 'bottom' ? 'bottom' : 'right' }
                onClose={onClose}
                isOpen={isOpen}
                size={'md'}
            >
                <DrawerOverlay />
                <DrawerContent
                    borderTopRadius={12}
                >
                    <Center
                        m={'2rem auto .5rem'}
                        borderRadius='full'
                        overflow={'hidden'}
                        border={'1px solid #eaeaea'}
                        boxSize='5rem'
                        boxShadow='lg'                    
                    >
                        <Image
                            src={beer.imagen || fallbackImage}
                            alt={`${beer.name} de ${beer.brand}`}
                            width={'100%'}
                            height={'100%'}
                        />
                    </Center>
                    <DrawerHeader
                        borderBottomWidth='.1rem'
                        mb={4}
                    >
                        <Text 
                            fontWeight={'bold'}
                        >
                            {beer.name}
                        </Text>
                        <Text
                            fontSize='sm'
                            color='gray.500'
                        >
                            { underMaintenance(beer) ? '' : beer.brand }
                        </Text>
                    </DrawerHeader>
                    <DrawerBody>
                        {!underMaintenance(beer) &&
                        <Text
                            fontWeight={'bold'}
                            fontSize='md'
                            mb={2}
                        >
                            DESCRIPCIÓN
                        </Text>
                        }
                        <Text
                            color='gray.500'
                            as={'cite'}
                        >
                            {beer.description}
                        </Text>
                        {(!underMaintenance(beer)
                        && typeof beer.ibu === 'number'
                        && typeof beer.abv === 'number') 
                        &&
                        <Text
                            fontWeight={'bold'}
                            fontSize='md'
                            mb={2}
                            mt={6}
                        >
                            CARACTERÍSTICAS 
                        </Text>
                        }
                        <Box
                            maxW={'sm'}
                            m={'.5rem auto .5rem'}
                        >
                            {
                                typeof beer.ibu === 'number' &&
                            <>
                                <Text
                                    color='gray.500'
                                    mb={10}
                                >
                                    Grado de amargor (IBU)
                                </Text>
                                <Slider
                                    aria-label='ibu-slider' 
                                    isReadOnly
                                    min={0}
                                    max={highestValues.ibu}
                                    mb={10}
                                    value={parseInt(beer.ibu)}
                                >
                                    <SliderMark value={0} mt='1' ml='-2.5' fontSize='sm'>
                                        0
                                    </SliderMark>
                                    <SliderMark value={highestValues.ibu / 2} mt='1' ml='-2.5' fontSize='sm'>
                                        {highestValues.ibu /2}
                                    </SliderMark>
                                    <SliderMark value={highestValues.ibu} mt='1' ml='-2.5' fontSize='sm'>
                                        {highestValues.ibu}
                                    </SliderMark>
                                    <SliderMark
                                        value={parseInt(beer.ibu)}
                                        textAlign='center'
                                        bg='green.700'
                                        color='white'
                                        mt='-10'
                                        ml='-5'
                                        w='12'
                                        borderRadius={4}
                                    >
                                        { parseInt(beer.ibu) }
                                    </SliderMark>
                                    <SliderTrack>
                                        <SliderFilledTrack bg='green.700'/>
                                    </SliderTrack>
                                    <SliderThumb boxSize={6}>
                                        <HopIcon fill={'green.700'}/>
                                    </SliderThumb>
                                </Slider>
                            </>
                            }
                            { typeof beer.abv === 'number' && 
                            <>
                                <Text
                                    color='gray.500'
                                    mb={10}
                                >
                                    Porcentaje de alcohol (ABV%)
                                </Text>
                                <Slider 
                                    aria-label='abv-slider'
                                    isReadOnly
                                    min={0}
                                    max={highestValues.abv}
                                    value={parseFloat(beer.abv)}
                                >
                                    <SliderMark value={0} mt='1' ml='-2.5' fontSize='sm'>
                                        0%
                                    </SliderMark>
                                    <SliderMark value={highestValues.abv / 2} mt='1' ml='-2.5' fontSize='sm'>
                                        {highestValues.abv / 2}%
                                    </SliderMark>
                                    <SliderMark value={highestValues.abv} mt='1' ml='-2.5' fontSize='sm'>
                                        { highestValues.abv }%
                                    </SliderMark>
                                    <SliderMark
                                        value={parseFloat(beer.abv)}
                                        textAlign='center'
                                        bg='yellow.500'
                                        color='white'
                                        mt='-10'
                                        ml='-5'
                                        w='12'
                                        borderRadius={4}
                                    >
                                        { `${parseFloat(beer.abv)} %` }
                                    </SliderMark>
                                    <SliderTrack>
                                        <SliderFilledTrack bg='yellow.500'/>
                                    </SliderTrack>
                                    <SliderThumb boxSize={6}>
                                        <PercentageIcon width={10} height={10} fill={'yellow.500'}/>
                                    </SliderThumb>
                                </Slider>
                            </>
                            }
                        </Box>
                    </DrawerBody>
                    <DrawerFooter>
                        <Text
                            size='xs'
                        >
                            {''}
                        </Text>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}