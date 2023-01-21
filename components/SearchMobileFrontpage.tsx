import {
  Flex,
  Autocomplete,
  MediaQuery,
  Group,
  Avatar,
  Text,
} from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons";
import { hideContext } from "./context/HideProvider";
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { forwardRef, useEffect, useState } from "react";
import { PopulatedProduct } from "../utils/types";
import { ItemProps } from "./Searchbar";

const SearchMobileFrontPage = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState<PopulatedProduct[]>([]);
  const router = useRouter();
  const { hide, setHide } = useContext(hideContext);

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
    value: item.slug,
    category: item.mainProduct.category.title,
    brand: item.mainProduct.brand,
    color: item.colors[0].colorTag?.color,
  }));

  const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
    (
      {
        price,
        category,
        brand,
        color,
        value,
        title,
        images,
        ...others
      }: ItemProps,
      ref
    ) => (
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
    <MediaQuery largerThan="xs" styles={{ display: "none" }}>
      <Flex
        align="flex-end"
        direction="row"
        sx={{ display: hide ? "none" : "flex" , width: "100%", paddingRight: "10px", paddingLeft: "10px" }}
      >
        <Autocomplete
          value={value}
          onChange={setValue}
          data={newData}
          onItemSubmit={(item) => {
            router.push(`/produkt/${item.value}`);
            setValue("");
          }}
          itemComponent={AutoCompleteItem}
          icon={<IconSearch color="white" size={15} stroke={3} />}
          rightSection={<IconX id="iconX" color="white" size={20} stroke={2} />}
          id="searchbar"
          color="white"
          placeholder="Sök..."
          filter={(value, item) =>
            item.value.toLowerCase().includes(value.toLowerCase().trim()) ||
            item.category.toLowerCase().includes(value.toLowerCase().trim()) ||
            item.brand.toLowerCase().includes(value.toLowerCase().trim()) ||
            item.color.toLowerCase().includes(value.toLowerCase().trim())
          }
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
