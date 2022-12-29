import {Box, Title, Header as MantineHeader, Flex, Group, Button, MantineProvider} from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ButtonSeason = () => {
    return (
        <Flex
            mih={100}
            gap='md'
            justify='center'
            align='center'
            direction={{base: 'column', sm: 'row'}}
        >
            <Link href={"/"}>
            <Button sx={(theme) => ({backgroundColor: theme.colors.brand[3],
                borderColor: theme.colors.brand[0],
                color: theme.colors.brand[0]})}>vår</Button>
            </Link>

            <Link href={"/"}>
            <Button sx={(theme) => ({backgroundColor: theme.colors.brand[3],
                borderColor: theme.colors.brand[0],
                color: theme.colors.brand[0]})}>sommar</Button>
            </Link>

            <Link href={"/"}>
            <Button sx={(theme) => ({backgroundColor: theme.colors.brand[3],
                borderColor: theme.colors.brand[0],
                color: theme.colors.brand[0]})}>höst</Button>
            </Link>

            <Link href={"/"}>
            <Button sx={(theme) => ({backgroundColor: theme.colors.brand[3],
                borderColor: theme.colors.brand[0],
                color: theme.colors.brand[0]})}>vinter</Button>
            </Link>




        </Flex>
    )
}

export default ButtonSeason