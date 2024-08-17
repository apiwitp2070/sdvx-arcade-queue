import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Center,
} from "@chakra-ui/react";
import {
  Field,
  FieldInputProps,
  Form,
  Formik,
  FormikHelpers,
  FormikValues,
} from "formik";
import React from "react";

interface ModalAddQueueProps {
  onSubmit: (values: FormikValues) => void;
}

interface QueueForm {
  name: string;
}

const ModalAddQueue = ({ onSubmit }: ModalAddQueueProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);

  // form

  const formInitialValues: QueueForm = {
    name: "",
  };

  const handleSubmit = (
    values: FormikValues,
    helpers: FormikHelpers<QueueForm>
  ) => {
    console.log("value submit:", values);
    helpers.setSubmitting(false);
    onSubmit(values);
    onClose();
  };

  return (
    <>
      <Center
        h="full"
        fontSize="6xl"
        bg="#2b6cb0"
        color="white"
        borderWidth={2}
        borderRadius={6}
        cursor="pointer"
        onClick={onOpen}
      >
        Add New Queue
      </Center>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <Formik initialValues={formInitialValues} onSubmit={handleSubmit}>
          {(formProps) => (
            <Form>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add new queue</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Field name="name">
                    {({ field }: { field: FieldInputProps<string> }) => (
                      <FormControl isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input
                          {...field}
                          ref={initialRef}
                          placeholder="Name (e.g. Rasis, Grace)"
                        />
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    isLoading={formProps.isSubmitting}
                    type="submit"
                  >
                    Confirm
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default ModalAddQueue;
