import { useState } from 'react';
import { Text, RangeSlider, RangeSliderFilledTrack, RangeSliderMark, RangeSliderThumb, RangeSliderTrack, Box} from '@chakra-ui/react';
import { IFilterState } from 'src/pages/index';
import PercentageIcon from 'src/components/icons/PercentageIcon';
import HopIcon from 'src/components/icons/HopIcon';
import { IHighestValues } from 'src/pages/index';

function RangeFilter({highestValues, filterState, setFilterState, rangeType}) {
  // Initial state for ranges
  // rangeType can be 'ibu' or 'abv'
  const initialState = () => {
      if(filterState[rangeType].min && filterState[rangeType].max) {
        return [filterState[rangeType].min, filterState[rangeType].max]
      }
      return [0, Math.ceil(highestValues[rangeType] * 2) / 2]
    }

  // RangeSlider State
  const [rangeSliderValue, setRangeSliderValue] = useState(initialState)
  // console.log("highest values >>>", highestValues)
  // console.log("FilterState on ABVFilter >>>", filterState)

  // Default values to keep the thumbs always updated between renders
  const defaultValues = (filterState: IFilterState, highestValues: IHighestValues) : number[] => {
    if(filterState[rangeType].min && filterState[rangeType].max) {
      return [filterState[rangeType].min, filterState[rangeType].max]
    }

    return [0, highestValues[rangeType]]
  }

  // Filter Title
  const filterTitle = rangeType === 'abv' ? 'Elige el rango de % de alcohol' : 'Elige el rango de amargor'
  return (
    <>
    <Text color="gray.500" mb={10}>{filterTitle}</Text>
      <Box w={'90%'} m={'0 auto'}>
        <RangeSlider
          aria-label={['min', 'max']}
          defaultValue={defaultValues(filterState, highestValues)}
          min={0}
          max={Math.ceil(highestValues[rangeType] * 2) / 2}
          step={.5}
          onChange={(val) => {
            setRangeSliderValue([val[0], val[1]])
            if(rangeType === 'abv'){
              setFilterState({...filterState, abv: {
                min: val[0],
                max: val[1]
              }})
            } else {
              setFilterState({...filterState, ibu: {
                min: val[0],
                max: val[1]
              }})
            }
          }}
          onChangeEnd={(val) => {
            if(rangeType === 'abv'){
              setFilterState({...filterState, abv: {
                min: val[0],
                max: val[1]
              }})
            } else {
              setFilterState({...filterState, ibu: {
                min: val[0],
                max: val[1]
              }})
            }
          }
        }
        >
          {/* Static Reference SliderMarks for the bottom of the graphic: min, half and max */}
          {/* Min, usually starting at 0 */}
          <RangeSliderMark fontSize="sm" ml="-2.5" mt="1" value={0}>
            0{rangeType === 'abv' ? '%' : ''}
          </RangeSliderMark>

          {/* Half: the highestValue / 2  */}
          <RangeSliderMark fontSize="sm" ml="-2.5" mt="1" value={highestValues[rangeType] / 2}>
          {/* <RangeSliderMark fontSize="sm" ml="-2.5" mt="1" value={28 / 2}> */}
            {highestValues[rangeType] / 2} {rangeType === 'abv' ? '%' : ''}
          </RangeSliderMark>

          {/* Highest ABV value */}
          <RangeSliderMark fontSize="sm" ml="-2.5" mt="1" value={highestValues[rangeType]}>
            {highestValues[rangeType]}{rangeType === 'abv' ? '%' : ''}
          </RangeSliderMark>

          {/* RangeSliderMark index 0: above the thumb, in yellow */}
          <RangeSliderMark
            bg={rangeType === 'abv' ? 'yellow.500' : 'green.500'}
            borderRadius={4}
            color="white"
            ml="-5"
            mt="-10"
            textAlign="center"
            value={rangeSliderValue[0]}
            w="12"
          >
            {`${rangeSliderValue[0]} ${rangeType === 'abv' ? '%' : ''}`}
          </RangeSliderMark>

          {/* RangeSliderMark index 1: above the thumb, in yellow */}
          <RangeSliderMark
            bg={rangeType === 'abv' ? 'yellow.500' : 'green.500'}
            borderRadius={4}
            color="white"
            ml="-5"
            mt="-10"
            textAlign="center"
            value={rangeSliderValue[1]}
            w="12"
          >
            {`${rangeSliderValue[1]} ${rangeType === 'abv' ? '%' : ''}`}
          </RangeSliderMark>

          {/* SliderTrack: the yellow part between thumbs */}
          <RangeSliderTrack>
            <RangeSliderFilledTrack bg={rangeType === 'abv' ? 'yellow.500' : 'green.500'} />
          </RangeSliderTrack>
          {/* End of SliderTrack */}

          {/*Handlers for range */}
          {/* SliderThumb (handler) index 0 */}
          <RangeSliderThumb boxSize={6} index={0}>
            {rangeType === 'abv'
              ? <PercentageIcon fill={"yellow.500"} height={10} width={10} />
              : <HopIcon fill={'green.500'} height={10} width={10}/>
            }
          </RangeSliderThumb>

          {/* SliderThumb (handler) 1 */}
          <RangeSliderThumb boxSize={6} index={1}>
            {rangeType === 'abv'
              ? <PercentageIcon fill={"yellow.500"} height={10} width={10} />
              : <HopIcon fill={'green.500'} height={10} width={10}/>
            }
          </RangeSliderThumb>
        </RangeSlider>
      </Box>
    </>)
}

export default RangeFilter