"use client";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useEliminarPostById } from "../services/rti/useCrtiListado";

interface propsAlertDialogo {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
  dataPost: IUser[];
  setDataP: React.Dispatch<React.SetStateAction<IUser[] | undefined>>;
  setArrayDatos: React.Dispatch<React.SetStateAction<IUser[] | undefined>>;
}

const AlertDialogoDelete: React.FC<propsAlertDialogo> = ({
  isOpen,
  onClose,
  postId,
  dataPost,
  setDataP,
  setArrayDatos,
}) => {
  const toast = useToast();
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const [newDataPost, setNewDataPost] = useState<IUser[]>([]);
  const { mutate: eliminarPost, isPending, isError } = useEliminarPostById();

  const handleEliminarPost = useCallback(() => {
    eliminarPost(
      { postId },
      {
        onSuccess: (data) => {
          setNewDataPost(dataPost.filter((post) => post.id !== postId));
          setDataP(newDataPost);
          setArrayDatos(newDataPost);
          onClose();
          toast({
            title: "Eliminado",
            description: `Post con id ${postId} eliminado`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        },
        onError: (err) => {
          console.log("error");
        },
      }
    );
  }, [
    eliminarPost,
    dataPost,
    onClose,
    toast,
    postId,
    setDataP,
    setArrayDatos,
    setNewDataPost,
    newDataPost,
  ]);

  useEffect(() => {
    if (newDataPost.length === 0) {
      setNewDataPost(dataPost);
    }
  }, [dataPost, newDataPost]);
  if (isPending) {
    return <p>Cargando ....</p>;
  }

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminar Post
            </AlertDialogHeader>
            <AlertDialogBody>Estas seguro de borrar el post ?</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" ml={3} onClick={handleEliminarPost}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AlertDialogoDelete;
