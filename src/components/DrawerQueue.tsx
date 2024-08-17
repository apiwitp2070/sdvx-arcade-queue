import {
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Center,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import { useRef } from "react";
import { QueueInfo } from "../interfaces/queue";

interface DrawerQueueProps {
  queue: QueueInfo[];
}

export const DrawerQueue = ({ queue }: DrawerQueueProps) => {
  const {
    isOpen: isOpenQueue,
    onOpen: onOpenQueue,
    onClose: onCloseQueue,
  } = useDisclosure();

  const btnQueueDrawerRef = useRef(null);

  return (
    <>
      <Center
        h="full"
        fontSize="4xl"
        borderColor="black"
        borderWidth={2}
        borderRadius={6}
        cursor="pointer"
        ref={btnQueueDrawerRef}
        onClick={onOpenQueue}
      >
        View All Queue
      </Center>

      <Drawer
        isOpen={isOpenQueue}
        onClose={onCloseQueue}
        finalFocusRef={btnQueueDrawerRef}
      >
        <DrawerOverlay />
        <DrawerContent pt={4}>
          <Center fontSize="4xl">Queue</Center>

          <SimpleGrid columns={2}>
            <Box>Player</Box>
            <Box>Start At</Box>
          </SimpleGrid>

          {queue.map((q, index) => (
            <SimpleGrid columns={2} key={index}>
              <Box>{q.name}</Box>
            </SimpleGrid>
          ))}
        </DrawerContent>
      </Drawer>
    </>
  );
};
