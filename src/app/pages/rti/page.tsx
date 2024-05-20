"use client";
// import { QueryClient, QueryClientProvider } from "react-query";
import TableRti from "@/app/components/TableRti";
import { Button, ChakraProvider, useDisclosure } from "@chakra-ui/react";
import FormularioCrearPost from "@/app/components/FormularioCrearPost";
import { useState } from "react";

export default function Home() {
  const {
    isOpen: isOpenFormulario,
    onClose: onCloseFormulario,
    onOpen: onOpenFormulario,
  } = useDisclosure();

  const [arrayDatos, setarrayDatos] = useState<IUser[] | undefined>([]);
  return (
    <div className=" w-full h-[100vh] flex flex-col items-center bg-slate-900">
      <div className="w-[800px] flex flex-row-reverse p-5">
        <Button colorScheme="teal" variant="outline" onClick={onOpenFormulario}>
          Crear un post
        </Button>
      </div>
      <TableRti setArrayDatos={setarrayDatos} />
      <FormularioCrearPost
        isOpen={isOpenFormulario}
        onClose={onCloseFormulario}
        arrayDatos={arrayDatos}
      />
    </div>
  );
}
