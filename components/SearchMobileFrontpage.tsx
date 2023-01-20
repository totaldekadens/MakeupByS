import {
  Flex,
  Autocomplete,
  MediaQuery,
  Group,
  Avatar,
  Text,
} from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { forwardRef, useEffect, useState } from "react";
import { ItemProps, PopulatedProduct } from "../utils/types";

const SearchMobileFrontPage = () => {
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
    <MediaQuery largerThan="xs" styles={{ display: "none" }}>
      <Flex
        align="flex-end"
        direction="row"
        sx={{ width: "100%", paddingRight: "10px", paddingLeft: "10px" }}
      >
        <Autocomplete
          value={value}
          onChange={setValue}
          data={newData}
          onItemSubmit={(item) => {
            router.push(`/produkt/${item.value}`);
          }}
          itemComponent={AutoCompleteItem}
          icon={<IconSearch color="white" size={15} stroke={3} />}
          rightSection={<IconX id="iconX" color="white" size={20} stroke={2} />}
          id="searchbar"
          color="white"
          placeholder="Sök..."
          variant="unstyled"
          styles={{
            input: {
              color: "white",
            },
          }}
          sx={(theme) => ({
            fontWeight: "bold",
            width: "100%",
            backgroundColor: "transparent",
            [theme.fn.largerThan("xs")]: {
              display: "none",
            },
          })}
        ></Autocomplete>
      </Flex>
    </MediaQuery>
  );
};

export default SearchMobileFrontPage;
