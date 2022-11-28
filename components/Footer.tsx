import { Title, Footer as MantineFooter } from "@mantine/core";

const Footer = () => {
  return (
    <MantineFooter
      fixed={false}
      height={60}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Title color="black" order={2}>
        Footer
      </Title>
    </MantineFooter>
  );
};

export default Footer;
