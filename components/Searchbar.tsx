import { Flex, Autocomplete } from "@mantine/core";
import {
    IconSearch,
    IconX,
} from "@tabler/icons"

const Searchbar = () => {
    
    return (
        <Flex
        align="flex-end"
        direction="row"
        ml={30}
        >

            <Flex mr={5} align="flex-end">
                <IconSearch color="white" size={25} stroke={3}/>
            </Flex>

        <Autocomplete
        rightSection={<IconX color="white" size={20} stroke={2} />}
        miw={250}
        id="searchbar"
        placeholder="Sök..."
        variant="unstyled"
        data={['React', 'Angular']}
        styles={(theme) => ({
            input: {
                borderBottom: "1px solid white",
                placeholder: "white",
            },
            value: {
                value: "white",
                color: "white",
            }
        })}
        >
        </Autocomplete>
        </Flex>
    )
}

export default Searchbar