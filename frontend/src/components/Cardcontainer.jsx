import { SimpleGrid, Center } from "@chakra-ui/react";
import Card from "./RCard";

const Cardcontainer = ({ rdata }) => {
  return (
    <Center>
      <SimpleGrid
        width={"80vw"}
        spacing={5}
        mt={10}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      >
        {rdata.map((item, index) => (
          <Card key={index} data={item} />
        ))}
        <Card />
      </SimpleGrid>
    </Center>
  );
};

export default Cardcontainer;
