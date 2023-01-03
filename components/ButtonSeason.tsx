import {Flex, Button} from "@mantine/core";
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
            <Link href={`/season/var`}>
            <Button sx={(theme) => ({backgroundColor: theme.colors.brand[9],
                borderColor: theme.colors.brand[0],
                color: theme.colors.brand[0]})}>vår</Button>
            </Link>

            <Link href={`/season/sommar`}>
            <Button sx={(theme) => ({backgroundColor: theme.colors.brand[9],
                borderColor: theme.colors.brand[0],
                color: theme.colors.brand[0]})}>sommar</Button>
            </Link>

            <Link href={`/season/host`}>
            <Button sx={(theme) => ({backgroundColor: theme.colors.brand[9],
                borderColor: theme.colors.brand[0],
                color: theme.colors.brand[0]})}>höst</Button>
            </Link>

            <Link href={`/season/vinter`}>
            <Button sx={(theme) => ({backgroundColor: theme.colors.brand[9],
                borderColor: theme.colors.brand[0],
                color: theme.colors.brand[0]})}>vinter</Button>
            </Link>




        </Flex>
    )
}

export default ButtonSeason