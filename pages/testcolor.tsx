import Head from "next/head";
import { useSession } from "next-auth/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AppShell } from "@mantine/core";
import { useState } from "react";

export default function Colors() {
  let list: Color[] = [
    {
      hexcolor: "#a7a045",
      colorTag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#7d9f7a",
      colorTag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#1ab17c",
      colorTag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#da3766",
      colorTag: "Rosa",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#d1453b",
      colorTag: "Röd",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#7c7eb7",
      colorTag: "Lila",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#28b3ca",
      colorTag: "Blå",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#84685a",
      colorTag: "Brun",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#f2ec70",
      colorTag: "Gul",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#ccdf86",
      colorTag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#74c7b5",
      colorTag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#f2a5b5",
      colorTag: "Rosa",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#f3a493",
      colorTag: "Rosa",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#d2be9d",
      colorTag: "Beige",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#8ea148",
      colorTag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#32af54",
      colorTag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#2b7f65",
      colorTag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#d8445a",
      colorTag: "Rosa",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#4e478a",
      colorTag: "Lila",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#284e75",
      colorTag: "Blå",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#50413c",
      colorTag: "Brun",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#f4cc77",
      colorTag: "Gul",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#82c777",
      colorTag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#5cc3a8",
      colorTag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#ee6873",
      colorTag: "Rosa",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#2a6aaa",
      colorTag: "Blå",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#755f47",
      colorTag: "Brun",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#ecab4d",
      colorTag: "Gul",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#2b8d80",
      colorTag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#da4c64",
      colorTag: "Rosa",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#af4b41",
      colorTag: "Brun",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#7a5fa8",
      colorTag: "Lila",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#2f75ba",
      colorTag: "Blå",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#403e3f",
      colorTag: "Grå",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#f4d169",
      colorTag: "Gul",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#91bc53",
      colorTag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#4ab974",
      colorTag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#f07f91",
      colorTag: "Rosa",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#f27f6a",
      colorTag: "Orange",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#4ba2d7",
      colorTag: "Blå",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#6d665e",
      colorTag: "Brun",
      seasons: ["Vår"],
    },
    {
      hexcolor: "#2A7F84",
      colorTag: "Grön",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#2A5575",
      colorTag: "Blå",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#3BA39C",
      colorTag: "Grön",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#4C4145",
      colorTag: "Brun",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#4D443F",
      colorTag: "Brun",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#4D455D",
      colorTag: "Lila",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#4D8771",
      colorTag: "Grön",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#6C304A",
      colorTag: "Lila",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#6D2F30",
      colorTag: "Röd",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#9A7E66",
      colorTag: "Brun",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#37B1BC",
      colorTag: "Blå",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#62B6CE",
      colorTag: "Blå",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#334B3B",
      colorTag: "Grön",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#354B87",
      colorTag: "Blå",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#363C6C",
      colorTag: "Lila",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#404E75",
      colorTag: "Blå",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#584A97",
      colorTag: "Lila",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#656D46",
      colorTag: "Grön",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#6183B1",
      colorTag: "Blå",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#8994C2",
      colorTag: "Blå",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#29383D",
      colorTag: "Grön",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#33445E",
      colorTag: "Blå",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#71653B",
      colorTag: "Gul",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#333039",
      colorTag: "Grå",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#744146",
      colorTag: "Lila",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#766390",
      colorTag: "Lila",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#844041",
      colorTag: "Röd",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#A39D47",
      colorTag: "Grön",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#AEBF6F",
      colorTag: "Grön",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#B3956F",
      colorTag: "Brun",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#B86650",
      colorTag: "Brun",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#BD8957",
      colorTag: "Brun",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#C6B58C",
      colorTag: "Grön",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#C76B90",
      colorTag: "Rosa",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#C45468",
      colorTag: "Rosa",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#D8C781",
      colorTag: "Gul",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#D73E41",
      colorTag: "Röd",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#E4866A",
      colorTag: "Orange",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#EF9D63",
      colorTag: "Orange",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#F3EE6C",
      colorTag: "Gul",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#F4BF79",
      colorTag: "Orange",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#F4D82C",
      colorTag: "Gul",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#F5BEC5",
      colorTag: "Rosa",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#F17774",
      colorTag: "Rosa",
      seasons: ["Höst"],
    },
    {
      hexcolor: "#f4ed83",
      colorTag: "Gul",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#2c816a",
      colorTag: "Grön",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#2f509f",
      colorTag: "Blå",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#8d4366",
      colorTag: "Lila",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#ab55a0",
      colorTag: "Lila",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#4e3b7b",
      colorTag: "Lila",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#333b5f",
      colorTag: "Blå",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#2b2c2e",
      colorTag: "Grå",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#f5f3a6",
      colorTag: "Gul",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#73c59d",
      colorTag: "Grön",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#77bae6",
      colorTag: "Blå",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#ea5da1",
      colorTag: "Rosa",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#ce86b8",
      colorTag: "Lila",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#6e56a2",
      colorTag: "Lila",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#4c6fb3",
      colorTag: "Blå",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#77787a",
      colorTag: "Grå",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#2b8f4f",
      colorTag: "Grön",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#3b8ccb",
      colorTag: "Blå",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#84343d",
      colorTag: "Röd",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#825ca5",
      colorTag: "Lila",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#374284",
      colorTag: "Blå",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#c53a75",
      colorTag: "Rosa",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#4255a2",
      colorTag: "Blå",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#d2de3c",
      colorTag: "Gul",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#347847",
      colorTag: "Grön",
      seasons: ["Vinter", "Vår"],
    },
    {
      hexcolor: "#25a3b9",
      colorTag: "Blå",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#9c373d",
      colorTag: "Röd",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#c03b51",
      colorTag: "Röd",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#764b9c",
      colorTag: "Lila",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#2bb371",
      colorTag: "Grön",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#b6e0d4",
      colorTag: "Grön",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "Röd",
      colorTag: "#c53739",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#ed91b8",
      colorTag: "Rosa",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#9b73b1",
      colorTag: "Lila",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#4b4b4b",
      colorTag: "Grå",
      seasons: ["Vinter"],
    },
    {
      hexcolor: "#f6d087",
      colorTag: "Gul",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#2da17c",
      colorTag: "Grön",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#2a8598",
      colorTag: "Blå",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#e1475f",
      colorTag: "Rosa",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#ae5374",
      colorTag: "Lila",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#5b5488",
      colorTag: "Lila",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#315184",
      colorTag: "Blå",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#596774",
      colorTag: "Grå",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#f2dab4",
      colorTag: "Beige",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#84cdb2",
      colorTag: "Grön",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#75ccdd",
      colorTag: "Blå",
      seasons: ["Sommar, Vår"],
    },
    {
      hexcolor: "#f07182",
      colorTag: "Rosa",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#f19bb8",
      colorTag: "Rosa",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#9885bd",
      colorTag: "Lila",
      seasons: ["Sommar", "Vår"],
    },
    {
      hexcolor: "#90add7",
      colorTag: "Blå",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#ccd0d5",
      colorTag: "Grå",
      seasons: ["Sommar", "Vår"],
    },
    {
      hexcolor: "#dfdb9e",
      colorTag: "Gul",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#629680",
      colorTag: "Grön",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#4c8493",
      colorTag: "Blå",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#9c4651",
      colorTag: "Rosa",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#a54159",
      colorTag: "Rosa",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#584151",
      colorTag: "Lila",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#5f6481",
      colorTag: "Lila",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#58494c",
      colorTag: "Brun",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#f5f4b4",
      colorTag: "Gul",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#88c29a",
      colorTag: "Grön",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#8fbfcd",
      colorTag: "Blå",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#f27d8f",
      colorTag: "Rosa",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#b27585",
      colorTag: "Rosa",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#8895b8",
      colorTag: "Grå",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#91847c",
      colorTag: "Brun",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#d7d59c",
      colorTag: "Gul",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#273b46",
      colorTag: "Blå",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#265573",
      colorTag: "Blå",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#9b3648",
      colorTag: "Röd",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#732e4a",
      colorTag: "Lila",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#343865",
      colorTag: "Blå",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#2b4e86",
      colorTag: "Blå",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#4d4d4d",
      colorTag: "Grå",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#5fbabd",
      colorTag: "Grön",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#38a1be",
      colorTag: "Blå",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#de6882",
      colorTag: "Rosa",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#f0b3d2",
      colorTag: "Rosa",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#5d66a7",
      colorTag: "Lila",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#3c79b2",
      colorTag: "Blå",
      seasons: ["Sommar"],
    },
    {
      hexcolor: "#af9f90",
      colorTag: "Brun",
      seasons: ["Sommar"],
    },
  ];

  let colorTags = [
    {
      color: "Röd",
      slug: "rod",
      hexcolor: "#FF3D3D",
    },
    {
      color: "Rosa",
      slug: "rosa",
      hexcolor: "#FF3D98",
    },
    {
      color: "Orange",
      slug: "orange",
      hexcolor: "#FFA43D",
    },
    {
      color: "Gul",
      slug: "gul",
      hexcolor: "#F3FF3D",
    },
    {
      color: "Grön",
      slug: "gron",
      hexcolor: "#74F962",
    },
    {
      color: "Blå",
      slug: "bla",
      hexcolor: "#3E5BFA",
    },
    {
      color: "Lila",
      slug: "lila",
      hexcolor: "#C23EFA",
    },
    {
      color: "Grå",
      slug: "gra",
      hexcolor: "#6B6B6B",
    },
    {
      color: "Beige",
      slug: "beige",
      hexcolor: "#FFEEDA",
    },
    {
      color: "Vit",
      slug: "vit",
      hexcolor: "#FFFFFF",
    },
    {
      color: "Svart",
      slug: "svart",
      hexcolor: "#000000",
    },
    {
      color: "Brun",
      slug: "brun",
      hexcolor: "#643F11",
    },
  ];

  let seasons = [
    {
      title: "Vår",
      description: "Beskrivning av våren",
      slug: "var",
    },
    {
      title: "Sommar",
      description: "Beskrivning av sommaren",
      slug: "sommar",
    },
    {
      title: "Höst",
      description: "Beskrivning av hösten",
      slug: "host",
    },
    {
      title: "Vinter",
      description: "Beskrivning av vintern",
      slug: "vinter",
    },
  ];

  type Color = {
    hexcolor: string;
    colorTag: string;
    seasons: string[];
  };

  const sortedList: Color[] = [...list].sort((a, b) =>
    a.hexcolor > b.hexcolor ? 1 : -1
  );
  //console.log(sortedList);

  const [activeSeason, setActiveSeason] = useState("");
  const [filteredListBySeason, setfilteredListBySeason] =
    useState<Color[]>(sortedList);

  const handleClick = (season: string) => {
    setActiveSeason(season);
    let filteredListBySeason = sortedList.filter((color) =>
      color.seasons.includes(season)
    );
    setfilteredListBySeason(filteredListBySeason);
    console.log(filteredListBySeason);
  };

  return (
    <>
      <Head>
        <title>MakeupByS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell fixed={false} header={<Header />} footer={<Footer />}>
        <main style={{ marginTop: 60, minHeight: "100vh" }}>
          <h1>Färger</h1>
          <div>
            {seasons.map((season, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    handleClick(season.title);
                  }}
                >
                  {season.title}
                </button>
              );
            })}
          </div>
          Vald säsong: {activeSeason}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex" }}>
              {colorTags.map((colorTag, index) => {
                return (
                  <div
                    key={index}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <h3>{colorTag.color}</h3>
                    {filteredListBySeason
                      .filter((color) =>
                        color.colorTag.includes(colorTag.color)
                      )
                      .map((filteredColor, index) => (
                        <div
                          key={index}
                          style={{
                            backgroundColor: filteredColor.hexcolor,
                            width: "100px",
                            height: "50px",
                          }}
                        >
                          {filteredColor.hexcolor}
                        </div>
                      ))}
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </AppShell>
    </>
  );
}
