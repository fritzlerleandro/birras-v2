import { useState } from 'react';
import { Text } from '@chakra-ui/react';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import { IFilterBrand } from 'src/pages/index';

function BrandFilter({uniqueBrands, customRender, customCreateItemRender, handleCreateItem, filterState, setFilterState}) {
  // State for UI brand selection
  const [pickerBrands, setPickerBrands] = useState(uniqueBrands);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleSelectedBrandsChange = (selectedBrand) => {
    if (selectedBrand) {
      setSelectedBrands(selectedBrand);
    }
  };

  return (
    <>
        <Text color="gray.500">Elige tus marcas favoritas</Text>
        <CUIAutoComplete
            createItemRenderer={customCreateItemRender}
            disableCreateItem
            itemRenderer={customRender}
            items={pickerBrands}
            label={null}
            inputStyleProps={{
              maxWidth: '100%',
            }}
            listStyleProps={{
            maxHeight: "8rem",
            overflowY: "scroll",
            }}
            tagStyleProps={{
            rounded: "full",
            padding: "0.5rem",
            }}
            placeholder="Elige las marcas que quieras"
            selectedItems={selectedBrands}
            onCreateItem={handleCreateItem}
            onSelectedItemsChange={(changes) => {
              handleSelectedBrandsChange(changes.selectedItems)
              console.log("Filter state>>>", filterState)
              console.log("Selected styles >>>", changes.selectedItems)
              changes.selectedItems.map(item => console.log("El estilo es>>>", item.label))
              //console.log("Selected styles >>>", changes.selectedItems)
              //changes.selectedItems.map(item => item.label)
              setFilterState({...filterState, brand: changes.selectedItems.map(item => item.label)})
              console.log("New filter state>>>", filterState)
            }
            }
        />
    </>)
}

export default BrandFilter