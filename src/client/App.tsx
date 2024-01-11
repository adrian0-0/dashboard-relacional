import { useState } from "react";

import reactLogo from "/assets/react.svg";
import { Box, Flex, Text } from "@chakra-ui/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Flex>
      <Text>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim iure
        magnam aliquid saepe fuga harum neque odit molestias modi possimus.
        Minima vel tempore, consequatur neque voluptatibus esse expedita unde
        dolorum!
      </Text>
    </Flex>
  );
}

export default App;
