"use client";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePost } from "../services/rti/useCrtiListado";

const schema = z.object({
  title: z
    .string()
    .min(5, "El titulo debe de tener ser mayor que 5 caracteres")
    .max(20, "El titulo es demasiado grande")
    .nonempty(),
  body: z.string().min(5, "El post debe tener mas de 5 caracteres").nonempty(),
});

interface propsFormularioPost {
  isOpen: boolean;
  onClose: () => void;
  arrayDatos: IUser[] | undefined;
}

const FormularioCrearPost: React.FC<propsFormularioPost> = ({
  isOpen,
  onClose,
  arrayDatos,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IActualizarPost>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", body: "" },
  });

  //   const { data: dataPost, isLoading, isError } = usePost();
  const [dataArray, setDataArray] = useState<IUser[] | null>(null);
  const onSubmit = (data: IActualizarPost) => {
    console.log("data a crear=>", data);
    console.log("Array=>", dataArray?.length);
    reset();
    onClose();
  };

  useEffect(() => {
    if (arrayDatos) {
      setDataArray(arrayDatos);
    }
  }, [arrayDatos]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear Post</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl isInvalid={!!errors.title}>
                <FormLabel>Titulo</FormLabel>
                <Input
                  {...register("title")}
                  type="text"
                  placeholder="Titulo..."
                />
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.body}>
                <FormLabel>Post</FormLabel>
                <Textarea {...register("body")} placeholder="Post..." />
                <FormErrorMessage>{errors.body?.message}</FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter className="flex gap-2">
              <Button colorScheme="blue" variant={"outline"} type="submit">
                Crear post
              </Button>
              <Button colorScheme="red" variant={"outline"} onClick={onClose}>
                Crancelar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FormularioCrearPost;
