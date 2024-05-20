"use client";
import LoaderCommon from "@/app/common/loader/LoaderCommon";
import CardAgGrid from "@/app/components/CardAgGrid";
import { useAnime } from "@/app/services/rti/AgGridServices";
import { Spinner } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";

const CrudImagenes = () => {
  const cardsPerPage = 10;
  const { data: dataAnime, isLoading, isError } = useAnime();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>();

  const handleClickNext = useCallback(() => {
    if (totalPages && currentPage < totalPages) {
      console.log("siguiente");
      setCurrentPage(currentPage + 1);
    }
  }, [totalPages, currentPage]);

  const handleCLICKPrev = useCallback(() => {
    if (currentPage > 1) {
      console.log("anterior");
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const handleClickPage = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = dataAnime?.data.slice(indexOfFirstCard, indexOfLastCard);

  useEffect(() => {
    console.log("data anime=>", dataAnime);
    // if (dataPhotos) {
    //   const totalPages = Math.ceil(dataPhotos?.length / cardsPerPage);
    //   setTotalPages(totalPages);
    //   console.log("pages=>", totalPages);
    // }
  }, [dataAnime]);

  if (isLoading) {
    return <LoaderCommon />;
  }

  return (
    <div className="relative w-full bg-black h-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-5">
        {currentCards?.map((anime: any) => (
          <CardAgGrid key={anime.id} anime={anime} />
        ))}
      </div>
      {/* <div className="flex text-white gap-2 justify-center p-5">
        <button onClick={handleCLICKPrev} disabled={currentPage === 1}>
          {"<"}
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => handleClickPage(i + 1)}>
            {i + 1}
          </button>
        ))}
        <button onClick={handleClickNext} disabled={currentPage === totalPages}>
          {">"}
        </button>
      </div> */}
    </div>
  );
};

export default CrudImagenes;
