import {
  Flex,
  Autocomplete,
  MediaQuery,
  Group,
  Avatar,
  Text,
  Box,
} from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons";
import { hideContext } from "../context/HideProvider";
import { useRouter } from "next/router";
import { forwardRef, useContext, useEffect, useState } from "react";
import { PopulatedProduct } from "../../utils/types";
import { ItemProps } from "./Searchbar";

const SearchMobileFrontPage = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState<PopulatedProduct[]>([]);
  const router = useRouter();
  const { hide, setHide } = useContext(hideContext);

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
          <Avatar
            src={`https://res.cloudinary.com/dkzh2lxon/image/upload/v1675178603/makeupbys/${images[0]}`}
          />
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
        sx={{
          display: hide ? "none" : "flex",
          width: "100%",
          paddingRight: "10px",
          paddingLeft: "10px",
        }}
      >
        <Autocomplete
          value={value.toLowerCase()}
          onChange={setValue}
          data={newData}
          onItemSubmit={(item) => {
            router.push(`/produkt/${item.slug}`);
            setValue("");
          }}
          itemComponent={AutoCompleteItem}
          icon={<IconSearch color="white" size={15} stroke={3} />}
          rightSection={
            value && (
              <Box sx={{ cursor: "pointer" }} onClick={handleClick}>
                <IconX id="iconX" color="white" size={20} stroke={2} />
              </Box>
            )
          }
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
