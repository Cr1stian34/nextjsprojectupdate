"use client"; // Asegúrate de que este archivo se ejecute en el cliente

import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
// import theme from "../styles/theme";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

export default Providers;
