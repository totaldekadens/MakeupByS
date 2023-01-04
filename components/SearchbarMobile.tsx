import { Flex, Autocomplete } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons";

const SearchbarMobile = () => {
  return (
    <Flex align="flex-end" direction="row" sx={{ width: "100%" }}>
      <Autocomplete
        icon={<IconSearch color="white" size={15} stroke={3} />}
        rightSection={<IconX id="iconX" color="white" size={20} stroke={2} />}
        id="searchbar"
        placeholder="Sök..."
        variant="unstyled"
        data={["Smink", "Läppstift"]}
        sx={(theme) => ({
          width: "100%",
          backgroundColor: theme.colors.brand[2],
          [theme.fn.largerThan("xs")]: {
            display: "none",
          },
        })}
      ></Autocomplete>
    </Flex>
  );
};

export default SearchbarMobile;
