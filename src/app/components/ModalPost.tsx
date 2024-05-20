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
import { usePostById } from "../services/rti/useCrtiListado";

interface propsModalPost {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
}

const ModalPost: React.FC<propsModalPost> = ({ isOpen, onClose, postId }) => {
  const { data: dataPost, isLoading, isError } = usePostById(postId);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{dataPost?.body}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Clouse
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalPost;
