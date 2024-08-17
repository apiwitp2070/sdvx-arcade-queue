import { SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Grid,
  GridItem,
  IconButton,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useState } from "react";
import { PlayerInfo, QueueInfo } from "./interfaces/queue";
import { DrawerQueue } from "./components/DrawerQueue";
import ModalAddQueue from "./components/ModalAddQueue";
import { FormikValues } from "formik";
import { Cabinet } from "./enums/cabinet";

interface PlayerBoxProps {
  data?: PlayerInfo;
  onAdvanceQueue: (cabinet: "left" | "right") => void;
}

function App() {
  // player/cabinet info

  const [player1, setPlayer1] = useState<PlayerInfo>();
  const [player2, setPlayer2] = useState<PlayerInfo>();

  const leftCabinet = "left";
  const rightCabinet = "right";

  // queue

  const [queue, setQueue] = useState<QueueInfo[]>([]);

  const handleAddQueue = (values: FormikValues) => {
    // first time queue
    if (!player1 && !player2) {
      setPlayer1({
        ...values,
        name: values.name,
        cabinet: leftCabinet,
        startAt: dayjs().toISOString(),
      });
    }
    // left cabinet is available
    else if (!player1 && player2) {
      setPlayer1({
        ...values,
        name: values.name,
        cabinet: leftCabinet,
        startAt: dayjs().toISOString(),
      });
    }
    // right cabinet is available
    else if (player1 && !player2) {
      setPlayer2({
        ...values,
        name: values.name,
        cabinet: rightCabinet,
        startAt: dayjs().toISOString(),
      });
    } else {
      console.log("add to queue:", values);
      setQueue((prev) => [...prev, values as QueueInfo]);
    }
  };

  const handleAdvanceQueue = (cabinet: "left" | "right") => {
    console.log("calling next queue for cabinet:", cabinet);

    const nextPlayer = queue[0];
    const remainingQueue = queue.slice(1);

    if (cabinet === leftCabinet) {
      if (!nextPlayer) {
        setPlayer1(undefined);
      } else {
        setPlayer1({
          name: nextPlayer.name,
          cabinet: leftCabinet,
          startAt: dayjs().toISOString(),
        });
      }
    } else if (cabinet === rightCabinet) {
      if (!nextPlayer) {
        setPlayer2(undefined);
      } else {
        setPlayer2({
          name: nextPlayer.name,
          cabinet: rightCabinet,
          startAt: dayjs().toISOString(),
        });
      }
    }

    setQueue(remainingQueue);
  };

  // render

  return (
    <>
      <SimpleGrid minH="100vh" bg="whitesmoke">
        <VStack align="stretch">
          <SimpleGrid
            color="white"
            bg="black"
            overflow="hidden"
            h={32}
            columns={3}
          >
            <Box position="relative"></Box>
            <Center fontSize="4xl">SDVX Queue</Center>
            <Center color="white" justifyContent="end" pr={8}>
              <IconButton
                colorScheme="black"
                aria-label="Settings"
                icon={<SettingsIcon w={8} h={8} />}
              />
            </Center>
          </SimpleGrid>

          <Flex gap={4} direction="column" padding={4} h="full">
            <Card h="full" py={8}>
              <Center fontSize="4xl" fontWeight="bold" color="blue">
                Now Playing
              </Center>

              <SimpleGrid columns={2} spacing={8} h="full" pt={8}>
                <PlayerBox data={player1} onAdvanceQueue={handleAdvanceQueue} />

                <PlayerBox data={player2} onAdvanceQueue={handleAdvanceQueue} />
              </SimpleGrid>
            </Card>

            <Box h={40}>
              <Grid templateColumns="repeat(3, 1fr)" gap={8} h="full">
                <GridItem colSpan={1}>
                  <DrawerQueue queue={queue} />
                </GridItem>
                <GridItem colSpan={2}>
                  <ModalAddQueue onSubmit={handleAddQueue} />
                </GridItem>
              </Grid>
            </Box>
          </Flex>
        </VStack>
      </SimpleGrid>
    </>
  );
}

export default App;

// -------------------------------------------------------------------------------------------------

const PlayerBox = ({ data, onAdvanceQueue }: PlayerBoxProps) => {
  if (!data) {
    return (
      <Flex direction="column">
        <Box h="60%">
          <Center fontSize="9xl" fontWeight="bold" color="lightgrey">
            Empty
          </Center>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex direction="column">
      <Center fontSize="5xl">{Cabinet[data.cabinet]}</Center>
      <Box h="60%">
        <Center fontSize="9xl" fontWeight="bold">
          {data.name}
        </Center>
        <Center fontSize="2xl">
          Start At: {dayjs(data.startAt).format("HH:mm")}
        </Center>
      </Box>
      <Center>
        <Button
          colorScheme="teal"
          variant="solid"
          size="lg"
          onClick={() => onAdvanceQueue(data.cabinet)}
        >
          Call Next Queue
        </Button>
      </Center>
    </Flex>
  );
};
