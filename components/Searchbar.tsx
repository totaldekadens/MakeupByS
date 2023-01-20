import { Flex, Autocomplete, Group, Avatar, Text } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { forwardRef, useEffect, useState } from "react";
import { ItemProps, PopulatedProduct } from "../utils/types";

const Searchbar = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState<PopulatedProduct[]>([]);
  const router = useRouter();

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
  const newData = data.map((item) => ({ ...item, value: item.slug }));

  const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
    (
      { mainProduct, slug, value, title, images, ...others }: ItemProps,
      ref
    ) => (
      <Link href={`/produkt/${slug}`}>
        <div ref={ref} {...others}>
          <Group noWrap>
            <Avatar src={`/uploads/${images[0]}`} />
            <div>
              <Text>{title}</Text>
              <Text size="xs" color="dimmed">
                {mainProduct.price.$numberDecimal.toString() + " KR"}
              </Text>
            </div>
          </Group>
        </div>
      </Link>
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
        onItemSubmit={(item) => {
          router.push(`/produkt/${item.value}`);
        }}
        itemComponent={AutoCompleteItem}
        rightSection={<IconX id="iconX" color="white" size={20} stroke={2} />}
        miw={250}
        id="searchbar"
        placeholder="Sök..."
        variant="unstyled"
        value={value}
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

export default Searchbar;
