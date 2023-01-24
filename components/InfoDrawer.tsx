import { Button, Drawer, Flex, Text, Image } from "@mantine/core";
import { getCookie, setCookie } from "cookies-next";
import { FC, useEffect, useState } from "react";

const InfoDrawer: FC = () => {
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    const getCookies = () => {
      const getInfo = getCookie("infoConfirmed");
      if (!getInfo) {
        setCookie("infoConfirmed", false, { maxAge: 60 * 60 * 24 * 7 });
        setOpened(true);
      }
    };
    getCookies();
  }, []);
  return (
    <Drawer
      trapFocus={false}
      withCloseButton={false}
      opened={opened}
      onClose={() => setOpened(false)}
      padding="xl"
      size="xl"
      position="bottom"
      styles={{
        drawer: {
          height: "auto",
        },
      }}
    >
      <Flex gap={10} direction="column" justify={"center"}>
        <Text weight={"bold"} color="brand.8">
          Demobutik
        </Text>
        <Flex align={"flex-start"} direction="column">
          <Text size={"sm"} color={"brand.8"}>
            Hemsidan är en demobutik. Dvs du kan inte göra några riktiga köp
            eller kontakta oss på något sätt.
          </Text>
          <Text size={"sm"} color={"brand.8"}>
            Produktbilder är lånade från CAIA Cosmetics och Make Up Store.
          </Text>
        </Flex>
        <Text weight={"bold"} color="brand.8">
          Kakor
        </Text>
        <Flex align={"flex-start"} gap={10}>
          <Image width={40} height={50} fit="contain" src="/cookies.png" />

          <Text size={"sm"} color={"brand.8"}>
            Vi använder nödvändiga webbkakor för att hemsidan skall fungera på
            ett bra sätt. Om du fortsätter navigera på sidan innebär det att du
            accepterar att kakor används.
          </Text>
        </Flex>
        <Flex sx={{ width: "100%" }} justify="flex-end">
          <Button
            mt={10}
            onClick={() => {
              setCookie("infoConfirmed", true);
              setOpened(false);
            }}
          >
            OK
          </Button>
        </Flex>
      </Flex>
    </Drawer>
  );
};
export default InfoDrawer;
