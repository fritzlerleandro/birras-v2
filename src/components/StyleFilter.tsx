import { useState } from 'react';
import { Text } from '@chakra-ui/react';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import { IFilterBrand } from 'src/pages/beersOld';

function StyleFilter({uniqueCategories, customRender, customCreateItemRender, handleCreateItem}) {
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
            disableCreateItem={true}
            itemRenderer={customRender}
            items={pickerCategories}
            label={null}
            listStyleProps={{
            maxHeight: "8rem",
            overflow: "scroll",
            }}
            placeholder="Escribe los estilos que quieres"
            selectedItems={selectedCategories}
            tagStyleProps={{
            rounded: ".25rem",
            }}
            onCreateItem={handleCreateItem}
            onSelectedItemsChange={(changes) =>
            handleSelectedCategoriesChange(changes.selectedItems)
            }
        />
    </>)
}

export default StyleFilter