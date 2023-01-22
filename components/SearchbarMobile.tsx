import { Flex, Autocomplete, Group, Avatar, Text, Box } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons";
import { useRouter } from "next/router";
import { forwardRef, useEffect, useState } from "react";
import { PopulatedProduct } from "../utils/types";
import { ItemProps } from "./Searchbar";

const SearchbarMobile = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState<PopulatedProduct[]>([]);
  const router = useRouter();

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
    slug: item.slug,
    value:
      item.slug +
      " " +
      item.mainProduct.category.title.toLowerCase() +
      " " +
      item.mainProduct.brand.toLowerCase() +
      " " +
      item.colors[0].colorTag?.color.toLowerCase(),
  }));

  const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ price, slug, value, title, images, ...others }: ItemProps, ref) => (
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
    <Flex align="flex-end" direction="row" sx={{ width: "100%" }}>
      <Autocomplete
        onItemSubmit={(item) => {
          router.push(`/produkt/${item.slug}`);
          setValue("");
        }}
        itemComponent={AutoCompleteItem}
        icon={<IconSearch color="white" size={15} stroke={3} />}
        rightSection={
          <Box sx={{ cursor: "pointer" }} onClick={handleClick}>
            <IconX id="iconX" color="white" size={20} stroke={2} />
          </Box>
        }
        id="searchbar"
        placeholder="Sök..."
        variant="unstyled"
        value={value.toLowerCase()}
        onChange={setValue}
        data={newData}
        styles={{
          input: {
            color: "white",
            "::placeholder": { color: "white" },
          },
        }}
        sx={(theme) => ({
          width: "100%",
          height: 40,
          backgroundColor: theme.colors.brand[2],
        })}
      ></Autocomplete>
    </Flex>
  );
};

export default SearchbarMobile;
