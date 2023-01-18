import { Grid, Image, MediaQuery, Title } from "@mantine/core";
import Link from "next/link";

export const SeasonGrid = () => {
  return (
    <Grid justify={"center"} gutter={6} gutterXs={"xl"}>
      <Grid.Col styles={{ borderRadius: "5px" }} span={8} md={3} sm={3} xs={3}>
        <Link href={"/"}>
          <Image
            src={"/uploads/spring_640.jpg"}
            sx={{
              img: {
                borderRadius: "5px",
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
            Spring
          </Title>
        </Link>
      </Grid.Col>
      <Grid.Col span={8} md={3} sm={3} xs={3}>
        <Link href={"/"}>
          <Image
            src={"/uploads/summer_640.jpg"}
            sx={{
              img: {
                borderRadius: "5px",
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
            Summer
          </Title>
        </Link>
      </Grid.Col>
      <Grid.Col span={8} md={3} sm={3} xs={3}>
        <Link href={"/"}>
          <Image
            src={"/uploads/autumn_640.jpg"}
            sx={{
              img: {
                borderRadius: "5px",
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
            Autumn
          </Title>
        </Link>
      </Grid.Col>
      <Grid.Col span={8} md={3} sm={3} xs={3}>
        <Link href={"/"}>
          <Image
            src={"/uploads/winter_640.jpg"}
            sx={{
              img: {
                borderRadius: "5px",
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
            Winter
          </Title>
        </Link>
      </Grid.Col>
    </Grid>
  );
};

export default SeasonGrid;
