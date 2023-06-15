import { Box, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Text
      bgGradient="linear(to-l, #7928CA, #FF0080)"
      bgClip="text"
      fontSize="6xl"
      fontWeight="extrabold"
    >
      Top 10 Trending Repos
    </Text>
  );
};

export default Header;
