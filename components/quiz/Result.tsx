import { Flex, Title, Text, Button, Spoiler } from "@mantine/core";
import Link from "next/link";
import { Dispatch, FC, SetStateAction } from "react";
import { HairDocument } from "../../models/Hair";
import useSlugify from "../../utils/useSlugify";

type Props = {
  item: string;
  description: string;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

const Result: FC<Props> = ({ item, description, setOpened }) => {
  const slugifiedSeason = useSlugify(item);
  return (
    <Flex
      sx={{ width: "100%", minHeight: "60vh" }}
      direction="column"
      align={"center"}
    >
      <Title
        order={1}
        size={70}
        sx={(theme) => ({
          [theme.fn.smallerThan("xs")]: {
            fontSize: 60,
          },
        })}
      >
        Grattis!{" "}
      </Title>
      <Title
        order={2}
        mt={50}
        size={45}
        sx={(theme) => ({
          [theme.fn.smallerThan("xs")]: {
            fontSize: 35,
          },
        })}
      >
        {"Du är " + item.toLowerCase() + "!"}
      </Title>
      <Text
        color={"dimmed"}
        weight={"bold"}
        align={"center"}
        mt={20}
        sx={(theme) => ({
          width: "70%",
          [theme.fn.smallerThan("xs")]: {
            width: "90%",
            fontSize: 14,
          },
        })}
      >
        {description}
      </Text>
      <Link
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
        href={`/sasong/${slugifiedSeason}`}
      >
        <Button
          onClick={() => {
            setOpened(false);
          }}
          h={70}
          w={300}
          mt={40}
          sx={(theme) => ({
            [theme.fn.smallerThan("xs")]: {
              width: "100%",
            },
          })}
        >
          Gå till dina produkter
        </Button>
      </Link>
      <Text
        size={"xs"}
        align="center"
        mt={10}
        color="dimmed"
        sx={(theme) => ({
          width: "70%",
          [theme.fn.smallerThan("xs")]: {
            width: "90%",
          },
        })}
      >
        Tycker du resultatet inte stämmer? Det har du säkert rätt i! Quizet är
        under pågående utveckling.
      </Text>
    </Flex>
  );
};

export default Result;
