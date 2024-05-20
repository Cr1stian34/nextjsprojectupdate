"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";

interface propsCard {
  anime: any;
}

const CardAgGrid: React.FC<propsCard> = ({ anime }) => {
  const router = useRouter();
  const truncatedSynopsis = useMemo(() => {
    if (anime.synopsis.length <= 100) {
      return anime.synopsis;
    }

    return anime.synopsis.substring(0, 100) + "...";
  }, [anime.synopsis]);

  const handleAnimeInfo = useCallback(() => {
    console.log("anime datos => ", anime);
    const serializedAnime = encodeURIComponent(JSON.stringify(anime));
    router.push(`/pages/animeDetall?anime=${serializedAnime}`);
  }, [anime, router]);

  return (
    <Card
      direction={{ base: "column", sm: "row", lg: "column" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "100px", lg: "100%" }}
        src={anime.images.jpg.large_image_url}
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md">{anime.title}</Heading>
          <Text>{truncatedSynopsis}</Text>
        </CardBody>
        <CardFooter>
          <Button variant="solid" colorScheme="blue" onClick={handleAnimeInfo}>
            Ver mas
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default CardAgGrid;
