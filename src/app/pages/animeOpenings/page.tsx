"use client";
import { useYoutube } from "@/app/services/rti/AgGridServices";
import { Button, Input, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import CardVideoAnime from "./CardVideoAnime";
import LoaderCommon from "@/app/common/loader/LoaderCommon";

const AnimeOpenings = () => {
  const [nameAnime, setNameAnime] = useState<string | null>("naruto opening");
  const [anime, setAnime] = useState<string>("one piece opening");
  const { data: dataYoutube, isLoading, isError } = useYoutube(anime);
  const handleChangeInput = useCallback((e: any) => {
    console.log("input=>", e.target.value);
    setNameAnime(e.target.value);
  }, []);

  const handleBuscarOpening = useCallback(() => {
    console.log("d=>", nameAnime);
    if (nameAnime) {
      setAnime(nameAnime);
    }
  }, [nameAnime]);

  if (isLoading) {
    return <LoaderCommon />;
  }
  return (
    <div className=" bg-slate-900 text-white">
      <div className="flex gap-2 max-w-[80%] mx-auto pt-5">
        <Text>Buscar opening de anime</Text>
        <Input onChange={(e) => handleChangeInput(e)} />
        <Button colorScheme="blue" onClick={handleBuscarOpening}>
          Buscar
        </Button>
      </div>
      <div>
        {dataYoutube &&
          dataYoutube.items.map((item: any) => (
            <CardVideoAnime key={item.id.videoId} anime={item} />
          ))}
      </div>
    </div>
  );
};

export default AnimeOpenings;
