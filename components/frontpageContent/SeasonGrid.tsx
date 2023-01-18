import { Grid, Image, MediaQuery, Title } from "@mantine/core";
import Link from "next/link";

export const SeasonGrid = () => {
  return (
    <Grid justify={"center"} gutter={6} gutterXs={"xl"}>
      <Grid.Col styles={{ borderRadius: "5px" }} span={8} md={3} sm={3} xs={3}>
        <Link href={"/sasong/var"}>
          <Image
            src={"/uploads/vår.jpg"}
            sx={{
              img: {
                borderRadius: "10px",
              },
            }}
          />
          <Title
            sx={{
              textAlign: "center",
              color: "#1D464E",
              fontSize: 15,
              paddingTop: "10px",
              paddingBottom: "20px",
            }}
          >
            Vår
          </Title>
        </Link>
      </Grid.Col>
      <Grid.Col span={8} md={3} sm={3} xs={3}>
        <Link href={"/sasong.sommar"}>
          <Image
            src={"/uploads/sommar.jpg"}
            sx={{
              img: {
                borderRadius: "10px",
              },
            }}
          />
          <Title
            sx={{
              textAlign: "center",
              color: "#1D464E",
              fontSize: 15,
              paddingTop: "10px",
              paddingBottom: "20px",
            }}
          >
            Sommar
          </Title>
        </Link>
      </Grid.Col>
      <Grid.Col span={8} md={3} sm={3} xs={3}>
        <Link href={"/sasong/host"}>
          <Image
            src={"/uploads/höst.jpg"}
            sx={{
              img: {
                borderRadius: "10px",
              },
            }}
          />
          <Title
            sx={{
              textAlign: "center",
              color: "#1D464E",
              fontSize: 15,
              paddingTop: "10px",
              paddingBottom: "20px",
            }}
          >
            Höst
          </Title>
        </Link>
      </Grid.Col>
      <Grid.Col span={8} md={3} sm={3} xs={3}>
        <Link href={"/sasong/vinter"}>
          <Image
            src={"/uploads/vinter.jpg"}
            sx={{
              img: {
                borderRadius: "10px",
              },
            }}
          />
          <Title
            sx={{
              textAlign: "center",
              color: "#1D464E",
              fontSize: 15,
              paddingTop: "10px",
              paddingBottom: "20px",
            }}
          >
            Vinter
          </Title>
        </Link>
      </Grid.Col>
    </Grid>
  );
};

export default SeasonGrid;
