import {Box, Title, Header as MantineHeader, Flex, Paper, Space, Input, TextInput, } from "@mantine/core";
import {
    IconSearch,
} from "@tabler/icons"

const Searchbar = () => {
    
    return (
        <Flex
        align="flex-end"
        direction="row"
        ml={30}
        >

        <TextInput
        icon={<IconSearch color="grey" size={20}/>}
        miw={300}
        id="searchbar"
        placeholder="Sök.."
        variant="filled"
        sx={(theme) => ({backgroundColor: theme.colors.brand[2]})}
        >
        </TextInput>
        </Flex>
    )
}

export default Searchbar