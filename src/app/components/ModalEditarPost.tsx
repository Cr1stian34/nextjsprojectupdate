"use client";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useActualizarPostById } from "../services/rti/useCrtiListado";

const schema = z.object({
  titulo: z
    .string()
    .min(5, "El título no debe tener menos de 5 caracteres")
    .max(50, "El título no debe tener más de 50 caracteres")
    .nonempty("El título es requerido"),
  post: z
    .string()
    .min(5, "El post no debe tener menos de 5 caracteres")
    .nonempty("El post es requerido"),
});

interface FormData {
  titulo: string;
  post: string;
}

interface propsEditarPost {
  isOpen: boolean;
  onClose: () => void;
  dataPosTEditar: IUser;
  dataPost: IUser[];
  setDataP: React.Dispatch<SetStateAction<IUser[] | undefined>>;
}

const ModalEditarPost: React.FC<propsEditarPost> = ({
  isOpen,
  onClose,
  dataPosTEditar,
  dataPost,
  setDataP,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      titulo: dataPosTEditar?.title || "", // Establece el valor inicial del campo "titulo"
      post: dataPosTEditar?.body || "", // Establece el valor inicial del campo "post"
    },
  });

  const toast = useToast();
  const {
    mutate: actualizarPost,
    isPending,
    isError,
  } = useActualizarPostById();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const actualiarDatosPostData: IActualizarPost = {
      title: data.titulo,
      body: data.post,
    };
    if (dataPosTEditar?.id) {
      actualizarPost(
        {
          postId: dataPosTEditar?.id,
          postData: actualiarDatosPostData,
        },
        {
          onSuccess: (data) => {
            console.log("La actualización fue exitosa:", data);
            const newArray = dataPost.map((dataOld) => {
              if (dataOld.id === data.id && dataOld.userId == data.userId) {
                dataOld.title = data.title;
                dataOld.body = data.body;
              }

              return dataOld;
            });
            console.log("nuevos datos=>", newArray);
            setDataP(newArray);
            toast({
              title: "Actualizacion exitosa",
              description: "datos guardados",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          },
          onError: (error) => {
            console.error("Error al actualizar el post:", error);
          },
        }
      );
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Actualizar</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody pb={6}>
            <FormControl isInvalid={!!errors.titulo}>
              <FormLabel>Titulo</FormLabel>
              <Input {...register("titulo")} placeholder="Titulo" />
              {errors.titulo && (
                <Text color="red">{errors.titulo.message}</Text>
              )}
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.post}>
              <FormLabel>Post</FormLabel>
              <Textarea {...register("post")} placeholder="Post" />
              {errors.post && <Text color="red">{errors.post.message}</Text>}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Actualizar
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditarPost;
