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
  Avatar
} from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";

const RCard = ({ data }) => {
  console.log({ data });

  if (data != undefined) {
    return (
      <Card>
        <CardHeader position={"relative"}>
        <Heading size="md">{data?.repo}</Heading>
          <Badge
            ml="5"
            p="1"
            fontSize="0.8em"
            top={5}
            right={5}
            colorScheme="green"
            position="absolute"
          >
            <StarIcon mb="1" mr="1" />
            {data?.stars} stars
          </Badge>
        </CardHeader>
        <Divider />
        <CardBody position={"relative"} maxHeight={"200"} minHeight={"150"}>
          <Text noOfLines={5}> {data?.about}</Text>
        </CardBody>
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
        <CardFooter position='relative'>
          <Avatar src={data?.imgSrc}/>
          <Tag position='absolute' right='5' bottom='7' colorScheme="teal" variant={"solid"}>
            Author : <Text as={"b"}>{data?.author} </Text>
          </Tag>
          
        </CardFooter>
      </Card>
    );
  }
};

export default RCard;
