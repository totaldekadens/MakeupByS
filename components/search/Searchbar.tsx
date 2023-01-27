import {
  Flex,
  Autocomplete,
  Group,
  Avatar,
  Text,
  Box,
  createStyles,
} from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons";
import { useRouter } from "next/router";
import { forwardRef, useEffect, useState } from "react";
import { PopulatedProduct } from "../../utils/types";

export type ItemProps = {
  title: string;
  price: number;
  images: string[];
  value: string;
  slug: string;
};

const Searchbar = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState<PopulatedProduct[]>([]);
  const router = useRouter();

  const { classes } = useStyles();
  // onclick x clear inputvalue searchfield
  const handleClick = () => {
    setValue("");
  };

  // Gets search result onchange
  useEffect(() => {
    if (value) {
      const getSearchResult = async () => {
        const request = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ value }),
        };
        let response = await fetch("/api/open/subproduct/search", request);
        let result = await response.json();
        setData(result.data);
      };
      getSearchResult();
    }
  }, [value]);

  // Adjusts it to autocomplete
  const newData = data.map((item) => ({
    title: item.title,
    price: Number(item.mainProduct.price.$numberDecimal),
    images: item.images,
    value:
      item.slug +
      " " +
      item.mainProduct.category.title.toLowerCase() +
      " " +
      item.mainProduct.brand.toLowerCase() +
      " " +
      item.colors[0].colorTag?.color.toLowerCase(),
    slug: item.slug,
  }));

  const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ price, value, title, images, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar src={`/uploads/${images[0]}`} />
          <div>
            <Text>{title}</Text>
            <Text size="xs" color="dimmed">
              {price + " KR"}
            </Text>
          </div>
        </Group>
      </div>
    )
  );

  return (
    <Flex
      mb={8}
      align="flex-end"
      direction="row"
      sx={(theme) => ({
        [theme.fn.smallerThan("xs")]: {
          display: "none",
        },
      })}
    >
      <Flex
        mr={5}
        align="flex-end"
        sx={(theme) => ({
          zIndex: 2,
          [theme.fn.smallerThan("xs")]: {
            display: "none",
          },
        })}
      >
        <IconSearch color="white" size={25} stroke={3} />
      </Flex>

      <Autocomplete
        classNames={{ rightSection: classes.rightSection }}
        onItemSubmit={(item) => {
          router.push(`/produkt/${item.slug}`);
          setValue("");
        }}
        itemComponent={AutoCompleteItem}
        rightSection={
          value && (
            <Box
              className="aaaada"
              sx={{ cursor: "pointer", bottom: 0 }}
              onClick={handleClick}
            >
              <IconX id="iconX" color="white" size={20} stroke={2} />
            </Box>
          )
        }
        miw={250}
        id="searchbar"
        placeholder="Sök..."
        variant="unstyled"
        value={value.toLowerCase()}
        onChange={setValue}
        data={newData}
        sx={(theme) => ({
          [theme.fn.smallerThan("lg")]: {
            minWidth: "180px",
          },
          [theme.fn.smallerThan("sm")]: {
            minWidth: "100px",
          },
          [theme.fn.smallerThan("xs")]: {
            display: "none",
          },
        })}
        styles={{
          input: {
            borderBottom: "1px solid white",
            color: "white",
            "::placeholder": { color: "white" },
          },
          root: {
            "::placeholder": { color: "white" },
          },
        }}
      />
    </Flex>
  );
};

const useStyles = createStyles((theme) => ({
  rightSection: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
}));

export default Searchbar;
