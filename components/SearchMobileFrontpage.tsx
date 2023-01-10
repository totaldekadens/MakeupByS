import { Flex, Autocomplete, MediaQuery } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons";

const SearchMobileFrontPage = () => {
  return (
    <MediaQuery largerThan="xs" styles={{ display: "none" }}>
      <Flex
        align="flex-end"
        direction="row"
        sx={{ width: "100%", paddingRight: "10px", paddingLeft: "10px" }}
      >
        <Autocomplete
          icon={<IconSearch color="white" size={15} stroke={3} />}
          rightSection={<IconX id="iconX" color="white" size={20} stroke={2} />}
          id="searchbar"
          color="white"
          placeholder="Sök..."
          variant="unstyled"
          data={["Smink", "Läppstift"]}
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