"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import {
  useComentariosById,
  usePostById,
} from "../services/rti/useCrtiListado";

interface propsModalComentarios {
  isOpen: boolean;
  onClose: () => void;
  userId: number | null;
  postId: number | null;
}

const ModalComentarios: React.FC<propsModalComentarios> = ({
  isOpen,
  onClose,
  userId,
  postId,
}) => {
  // console.log("Post ID=> ", postId);
  // console.log("User ID=>", userId);
  const {
    data: dataComentarios,
    isLoading,
    isError,
  } = useComentariosById(postId);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxH="400px" overflowY="auto">
        <ModalHeader>Comentarios {postId}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {dataComentarios?.map((comentario) => (
            <Text
              key={comentario.postId}
              className="border-2 border-gray-800 p-2 my-2 rounded-md"
            >
              {comentario.body}
            </Text>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Clouse
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComentarios;
