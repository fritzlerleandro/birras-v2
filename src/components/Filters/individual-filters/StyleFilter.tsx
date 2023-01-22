import { useState } from 'react';
import { Text } from '@chakra-ui/react';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';

function StyleFilter({uniqueCategories, customRender, customCreateItemRender, handleCreateItem, filterState, setFilterState}) {
    // State for UI category selection
  const [pickerCategories, setPickerCategories] = useState(uniqueCategories);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSelectedCategoriesChange = (selectedCategory) => {
    if (selectedCategory) {
      setSelectedCategories(selectedCategory);
    }
  };
  return (
    <>
        <Text color="gray.500">Elige el estilo</Text>
        <CUIAutoComplete
            createItemRenderer={customCreateItemRender}
            disableCreateItem
            itemRenderer={customRender}
            items={pickerCategories}
            label={null}
            inputStyleProps={{
              maxWidth: '100%',
            }}
            listStyleProps={{
            maxHeight: "8rem",
            overflowY: "scroll",
            }}
            tagStyleProps={{
            rounded: ".25rem",
            }}
            placeholder="Escribe los estilos que quieres"
            selectedItems={selectedCategories}
            onCreateItem={handleCreateItem}
            onSelectedItemsChange={(changes) => {
              console.log("changes are >>>", changes)
              handleSelectedCategoriesChange(changes.selectedItems)
              console.log("onSelectedItemsChange estilos / Filter state>>>", filterState)
              console.log("Selected styles >>>", changes.selectedItems)
              changes.selectedItems.map(item => console.log("El estilo es>>>", item.label))
              //console.log("Selected styles >>>", changes.selectedItems)
              //changes.selectedItems.map(item => item.label)
              setFilterState({...filterState, category: changes.selectedItems.map(item => item.label)})
              // console.log("New filter state after selecting estilo >>>", filterState)
            }
            }
        />
    </>)
}

export default StyleFilter