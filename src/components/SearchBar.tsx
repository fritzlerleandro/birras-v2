// Base Components
import {InputGroup, InputLeftElement, Input} from "@chakra-ui/react";
import {MdSearch} from "react-icons/md";

function SearchBar({onChange}) {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <MdSearch color="gray.300" />
      </InputLeftElement>
      <Input placeholder="Busca una birra" type="text" onChange={onChange} />
    </InputGroup>
  );
}

export default SearchBar;
