"use client";
import LoaderCommon from "@/app/common/loader/LoaderCommon";
import { Box, Card, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { usePathname, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const AnimeDetailContent = () => {
  const [anime, setAnime] = useState<any>(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getAnimeData = async () => {
      try {
        // Obtener el parámetro 'anime' de los parámetros de búsqueda
        const animeParam = searchParams.get("anime");

        // Si el parámetro 'anime' existe
        if (animeParam) {
          // Decodificar el JSON y establecerlo en el estado
          const animeData = JSON.parse(decodeURIComponent(animeParam));
          setAnime(animeData);
        }
      } catch (error) {
        console.error("Error al obtener los datos del anime:", error);
      }
    };

    // Llamar a la función para obtener los datos del anime
    getAnimeData();
  }, [pathname, searchParams]);

  if (!anime) {
    return <LoaderCommon />;
  }

  // console.log("a =>", anime);

  return (
    <div className="w-full h-[100%] bg-black py-5">
      <div className="w-[80%] lg:flex lg:flex-row h-auto mx-auto py-10 mt-5 mb-5 gap-2 p-5 rounded-md bg-slate-900 text-white">
        <div className="w-auto h-auto mx-auto flex justify-center lg:w-[30%] lg:h-[300px]">
          <Image src={anime.images.jpg.image_url} alt={anime.title} />
        </div>
        <div className="w-auto lg:max-w-[70%]">
          <div>
            <h2 className=" text-pretty text-lg my-3 text-center font-bold tracking-wide">
              {anime.title}
            </h2>
            <p className="text-sm truncate lg:whitespace-normal lg:overflow-visible lg:text-clip">
              {anime.synopsis}
            </p>
          </div>
          <div className="mt-5">
            <p className=" text-sm">Rating: {anime.rating}</p>
            <p className=" text-sm">Popularity: {anime.popularity}</p>
          </div>
          <div className="flex justify-center items-center">
            {anime.trailer && (
              <iframe
                className="w-[250px] h-[250px] mt-3 md:w-[400px] md:h-[300px] lg:w-[560px] lg:h-[315px]"
                src={anime.trailer.embed_url}
                title={anime.title + " Trailer"}
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AnimeDetalls = () => {
  return (
    <Suspense fallback={<LoaderCommon />}>
      <AnimeDetailContent />
    </Suspense>
  );
};

export default AnimeDetalls;
