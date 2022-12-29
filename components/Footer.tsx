import { Title, Footer as MantineFooter } from "@mantine/core";

const Footer = () => {
  return (
    <MantineFooter
      fixed={false}
      height={300}
      sx={(theme) => ({
        display: "flex",
        justifyContent: "center",
        backgroundColor: theme.colors.brand[2]
      })}
    >
      <Title color="white" order={2}>
        Footer
      </Title>
    </MantineFooter>
  );
};

export default Footer;
