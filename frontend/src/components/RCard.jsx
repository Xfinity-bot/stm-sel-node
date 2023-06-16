import { LinkIcon, StarIcon } from "@chakra-ui/icons";

import {
  Badge,
  Card,
  CardFooter,
  CardHeader,
  Button,
  Heading,
  CardBody,
  Text,
  Tag,
  Avatar,
  HStack
} from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";

const RCard = ({ data }) => {
  console.log({ data });

  if (data != undefined) {
    return (
      <Card>
        <CardHeader position={"relative"}>
        <Avatar src={data?.imgSrc}/>
          <Tag position='absolute' right='5' bottom='7' colorScheme="teal" variant={"solid"}>
            Author : <Text as={"b"}>{data?.author} </Text>
          </Tag>
       
        
        </CardHeader>
        <Divider />
        <CardBody position={"relative"} maxHeight={"200"} minHeight={"150"}>
        <Heading size="md">{data?.repo}</Heading>
          <Text noOfLines={5}> {data?.about}</Text>
        </CardBody>
        <HStack position={'relative'}>
        <a href={data?.link} target="#">
          <Button
            position={"relative"}
            bottom={2}
            left={5}
            rightIcon={<LinkIcon />}
            as={"b"}
          >
            {" "}
            Visit{" "}
          </Button>
        </a>
        <Badge
            ml="5"
            p="1"
            fontSize="0.8em"
            top={0}
            right={5}
            colorScheme="green"
            position="absolute"
          >
            <StarIcon mb="1" mr="1" />
            {data?.stars} stars
          </Badge>
        
        </HStack>
        <CardFooter position='relative'>
          
          
        </CardFooter>
      </Card>
    );
  }
};

export default RCard;
