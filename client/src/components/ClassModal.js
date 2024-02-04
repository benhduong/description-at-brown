import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import React, { useState, useEffect } from "react";

function ClassModal(props) {
  let title = props.title;
  let openModal = props.openModal;

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (openModal) {
      onOpen();
    }
  }, [openModal]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ClassModal;
