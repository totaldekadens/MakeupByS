import { Flex, Autocomplete } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons";

const Searchbar = () => {
  return (
    <Flex align="flex-end" direction="row">
      <Flex
        mr={5}
        align="flex-end"
        sx={(theme) => ({
          [theme.fn.smallerThan("xs")]: {
            display: "none",
          },
        })}
      >
        <IconSearch color="white" size={25} stroke={3} />
      </Flex>

      <Autocomplete
        rightSection={<IconX id="iconX" color="white" size={20} stroke={2} />}
        miw={250}
        id="searchbar"
        placeholder="Sök..."
        variant="unstyled"
        data={["Smink", "Läppstift"]}
        sx={(theme) => ({
          [theme.fn.smallerThan("md")]: {
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
            placeholder: "white",
          },
        }}
      ></Autocomplete>
    </Flex>
  );
};

export default Searchbar;
