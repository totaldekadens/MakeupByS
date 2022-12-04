import Head from "next/head";
import { useSession } from "next-auth/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AppShell } from "@mantine/core";
import { useState } from "react";

export default function Colors() {
  let list: Color[] = [
    {
      hexcode: "#a7a045",
      colortag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcode: "#7d9f7a",
      colortag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcode: "#1ab17c",
      colortag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcode: "#da3766",
      colortag: "Rosa",
      seasons: ["Vår"],
    },
    {
      hexcode: "#d1453b",
      colortag: "Röd",
      seasons: ["Vår"],
    },
    {
      hexcode: "#7c7eb7",
      colortag: "Lila",
      seasons: ["Vår"],
    },
    {
      hexcode: "#28b3ca",
      colortag: "Blå",
      seasons: ["Vår"],
    },
    {
      hexcode: "#84685a",
      colortag: "Brun",
      seasons: ["Vår"],
    },
    {
      hexcode: "#f2ec70",
      colortag: "Gul",
      seasons: ["Vår"],
    },
    {
      hexcode: "#ccdf86",
      colortag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcode: "#74c7b5",
      colortag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcode: "#f2a5b5",
      colortag: "Rosa",
      seasons: ["Vår"],
    },
    {
      hexcode: "#f3a493",
      colortag: "Rosa",
      seasons: ["Vår"],
    },
    {
      hexcode: "#d2be9d",
      colortag: "Beige",
      seasons: ["Vår"],
    },
    {
      hexcode: "#8ea148",
      colortag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcode: "#32af54",
      colortag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcode: "#2b7f65",
      colortag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcode: "#d8445a",
      colortag: "Rosa",
      seasons: ["Vår"],
    },
    {
      hexcode: "#4e478a",
      colortag: "Lila",
      seasons: ["Vår"],
    },
    {
      hexcode: "#284e75",
      colortag: "Blå",
      seasons: ["Vår"],
    },
    {
      hexcode: "#50413c",
      colortag: "Brun",
      seasons: ["Vår"],
    },
    {
      hexcode: "#f4cc77",
      colortag: "Gul",
      seasons: ["Vår"],
    },
    {
      hexcode: "#82c777",
      colortag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcode: "#5cc3a8",
      colortag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcode: "#ee6873",
      colortag: "Rosa",
      seasons: ["Vår"],
    },
    {
      hexcode: "#2a6aaa",
      colortag: "Blå",
      seasons: ["Vår"],
    },
    {
      hexcode: "#755f47",
      colortag: "Brun",
      seasons: ["Vår"],
    },
    {
      hexcode: "#ecab4d",
      colortag: "Gul",
      seasons: ["Vår"],
    },
    {
      hexcode: "#2b8d80",
      colortag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcode: "#da4c64",
      colortag: "Rosa",
      seasons: ["Vår"],
    },
    {
      hexcode: "#af4b41",
      colortag: "Brun",
      seasons: ["Vår"],
    },
    {
      hexcode: "#7a5fa8",
      colortag: "Lila",
      seasons: ["Vår"],
    },
    {
      hexcode: "#2f75ba",
      colortag: "Blå",
      seasons: ["Vår"],
    },
    {
      hexcode: "#403e3f",
      colortag: "Grå",
      seasons: ["Vår"],
    },
    {
      hexcode: "#f4d169",
      colortag: "Gul",
      seasons: ["Vår"],
    },
    {
      hexcode: "#91bc53",
      colortag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcode: "#4ab974",
      colortag: "Grön",
      seasons: ["Vår"],
    },
    {
      hexcode: "#f07f91",
      colortag: "Rosa",
      seasons: ["Vår"],
    },
    {
      hexcode: "#f27f6a",
      colortag: "Orange",
      seasons: ["Vår"],
    },
    {
      hexcode: "#4ba2d7",
      colortag: "Blå",
      seasons: ["Vår"],
    },
    {
      hexcode: "#6d665e",
      colortag: "Brun",
      seasons: ["Vår"],
    },
    {
      hexcode: "#2A7F84",
      colortag: "Grön",
      seasons: ["Höst"],
    },
    {
      hexcode: "#2A5575",
      colortag: "Blå",
      seasons: ["Höst"],
    },
    {
      hexcode: "#3BA39C",
      colortag: "Grön",
      seasons: ["Höst"],
    },
    {
      hexcode: "#4C4145",
      colortag: "Brun",
      seasons: ["Höst"],
    },
    {
      hexcode: "#4D443F",
      colortag: "Brun",
      seasons: ["Höst"],
    },
    {
      hexcode: "#4D455D",
      colortag: "Lila",
      seasons: ["Höst"],
    },
    {
      hexcode: "#4D8771",
      colortag: "Grön",
      seasons: ["Höst"],
    },
    {
      hexcode: "#6C304A",
      colortag: "Lila",
      seasons: ["Höst"],
    },
    {
      hexcode: "#6D2F30",
      colortag: "Röd",
      seasons: ["Höst"],
    },
    {
      hexcode: "#9A7E66",
      colortag: "Brun",
      seasons: ["Höst"],
    },
    {
      hexcode: "#37B1BC",
      colortag: "Blå",
      seasons: ["Höst"],
    },
    {
      hexcode: "#62B6CE",
      colortag: "Blå",
      seasons: ["Höst"],
    },
    {
      hexcode: "#334B3B",
      colortag: "Grön",
      seasons: ["Höst"],
    },
    {
      hexcode: "#354B87",
      colortag: "Blå",
      seasons: ["Höst"],
    },
    {
      hexcode: "#363C6C",
      colortag: "Lila",
      seasons: ["Höst"],
    },
    {
      hexcode: "#404E75",
      colortag: "Blå",
      seasons: ["Höst"],
    },
    {
      hexcode: "#584A97",
      colortag: "Lila",
      seasons: ["Höst"],
    },
    {
      hexcode: "#656D46",
      colortag: "Grön",
      seasons: ["Höst"],
    },
    {
      hexcode: "#6183B1",
      colortag: "Blå",
      seasons: ["Höst"],
    },
    {
      hexcode: "#8994C2",
      colortag: "Blå",
      seasons: ["Höst"],
    },
    {
      hexcode: "#29383D",
      colortag: "Grön",
      seasons: ["Höst"],
    },
    {
      hexcode: "#33445E",
      colortag: "Blå",
      seasons: ["Höst"],
    },
    {
      hexcode: "#71653B",
      colortag: "Gul",
      seasons: ["Höst"],
    },
    {
      hexcode: "#333039",
      colortag: "Grå",
      seasons: ["Höst"],
    },
    {
      hexcode: "#744146",
      colortag: "Lila",
      seasons: ["Höst"],
    },
    {
      hexcode: "#766390",
      colortag: "Lila",
      seasons: ["Höst"],
    },
    {
      hexcode: "#844041",
      colortag: "Röd",
      seasons: ["Höst"],
    },
    {
      hexcode: "#A39D47",
      colortag: "Grön",
      seasons: ["Höst"],
    },
    {
      hexcode: "#AEBF6F",
      colortag: "Grön",
      seasons: ["Höst"],
    },
    {
      hexcode: "#B3956F",
      colortag: "Brun",
      seasons: ["Höst"],
    },
    {
      hexcode: "#B86650",
      colortag: "Brun",
      seasons: ["Höst"],
    },
    {
      hexcode: "#BD8957",
      colortag: "Brun",
      seasons: ["Höst"],
    },
    {
      hexcode: "#C6B58C",
      colortag: "Grön",
      seasons: ["Höst"],
    },
    {
      hexcode: "#C76B90",
      colortag: "Rosa",
      seasons: ["Höst"],
    },
    {
      hexcode: "#C45468",
      colortag: "Rosa",
      seasons: ["Höst"],
    },
    {
      hexcode: "#D8C781",
      colortag: "Gul",
      seasons: ["Höst"],
    },
    {
      hexcode: "#D73E41",
      colortag: "Röd",
      seasons: ["Höst"],
    },
    {
      hexcode: "#E4866A",
      colortag: "Orange",
      seasons: ["Höst"],
    },
    {
      hexcode: "#EF9D63",
      colortag: "Orange",
      seasons: ["Höst"],
    },
    {
      hexcode: "#F3EE6C",
      colortag: "Gul",
      seasons: ["Höst"],
    },
    {
      hexcode: "#F4BF79",
      colortag: "Orange",
      seasons: ["Höst"],
    },
    {
      hexcode: "#F4D82C",
      colortag: "Gul",
      seasons: ["Höst"],
    },
    {
      hexcode: "#F5BEC5",
      colortag: "Rosa",
      seasons: ["Höst"],
    },
    {
      hexcode: "#F17774",
      colortag: "Rosa",
      seasons: ["Höst"],
    },
    {
      hexcode: "#f4ed83",
      colortag: "Gul",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#2c816a",
      colortag: "Grön",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#2f509f",
      colortag: "Blå",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#8d4366",
      colortag: "Lila",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#ab55a0",
      colortag: "Lila",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#4e3b7b",
      colortag: "Lila",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#333b5f",
      colortag: "Blå",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#2b2c2e",
      colortag: "Grå",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#f5f3a6",
      colortag: "Gul",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#73c59d",
      colortag: "Grön",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#77bae6",
      colortag: "Blå",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#ea5da1",
      colortag: "Rosa",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#ce86b8",
      colortag: "Lila",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#6e56a2",
      colortag: "Lila",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#4c6fb3",
      colortag: "Blå",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#77787a",
      colortag: "Grå",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#2b8f4f",
      colortag: "Grön",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#3b8ccb",
      colortag: "Blå",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#84343d",
      colortag: "Röd",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#825ca5",
      colortag: "Lila",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#374284",
      colortag: "Blå",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#c53a75",
      colortag: "Rosa",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#4255a2",
      colortag: "Blå",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#d2de3c",
      colortag: "Gul",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#347847",
      colortag: "Grön",
      seasons: ["Vinter", "Vår"],
    },
    {
      hexcode: "#25a3b9",
      colortag: "Blå",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#9c373d",
      colortag: "Röd",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#c03b51",
      colortag: "Röd",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#764b9c",
      colortag: "Lila",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#2bb371",
      colortag: "Grön",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#b6e0d4",
      colortag: "Grön",
      seasons: ["Vinter"],
    },
    {
      hexcode: "Röd",
      colortag: "#c53739",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#ed91b8",
      colortag: "Rosa",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#9b73b1",
      colortag: "Lila",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#4b4b4b",
      colortag: "Grå",
      seasons: ["Vinter"],
    },
    {
      hexcode: "#f6d087",
      colortag: "Gul",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#2da17c",
      colortag: "Grön",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#2a8598",
      colortag: "Blå",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#e1475f",
      colortag: "Rosa",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#ae5374",
      colortag: "Lila",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#5b5488",
      colortag: "Lila",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#315184",
      colortag: "Blå",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#596774",
      colortag: "Grå",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#f2dab4",
      colortag: "Beige",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#84cdb2",
      colortag: "Grön",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#75ccdd",
      colortag: "Blå",
      seasons: ["Sommar, Vår"],
    },
    {
      hexcode: "#f07182",
      colortag: "Rosa",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#f19bb8",
      colortag: "Rosa",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#9885bd",
      colortag: "Lila",
      seasons: ["Sommar", "Vår"],
    },
    {
      hexcode: "#90add7",
      colortag: "Blå",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#ccd0d5",
      colortag: "Grå",
      seasons: ["Sommar", "Vår"],
    },
    {
      hexcode: "#dfdb9e",
      colortag: "Gul",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#629680",
      colortag: "Grön",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#4c8493",
      colortag: "Blå",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#9c4651",
      colortag: "Rosa",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#a54159",
      colortag: "Rosa",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#584151",
      colortag: "Lila",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#5f6481",
      colortag: "Lila",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#58494c",
      colortag: "Brun",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#f5f4b4",
      colortag: "Gul",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#88c29a",
      colortag: "Grön",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#8fbfcd",
      colortag: "Blå",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#f27d8f",
      colortag: "Rosa",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#b27585",
      colortag: "Rosa",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#8895b8",
      colortag: "Grå",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#91847c",
      colortag: "Brun",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#d7d59c",
      colortag: "Gul",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#273b46",
      colortag: "Blå",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#265573",
      colortag: "Blå",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#9b3648",
      colortag: "Röd",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#732e4a",
      colortag: "Lila",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#343865",
      colortag: "Blå",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#2b4e86",
      colortag: "Blå",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#4d4d4d",
      colortag: "Grå",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#5fbabd",
      colortag: "Grön",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#38a1be",
      colortag: "Blå",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#de6882",
      colortag: "Rosa",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#f0b3d2",
      colortag: "Rosa",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#5d66a7",
      colortag: "Lila",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#3c79b2",
      colortag: "Blå",
      seasons: ["Sommar"],
    },
    {
      hexcode: "#af9f90",
      colortag: "Brun",
      seasons: ["Sommar"],
    },
  ];

  let colorTags = [
    {
      color: "Röd",
      slug: "rod",
      hexcode: "#FF3D3D",
    },
    {
      color: "Rosa",
      slug: "rosa",
      hexcode: "#FF3D98",
    },
    {
      color: "Orange",
      slug: "orange",
      hexcode: "#FFA43D",
    },
    {
      color: "Gul",
      slug: "gul",
      hexcode: "#F3FF3D",
    },
    {
      color: "Grön",
      slug: "gron",
      hexcode: "#74F962",
    },
    {
      color: "Blå",
      slug: "bla",
      hexcode: "#3E5BFA",
    },
    {
      color: "Lila",
      slug: "lila",
      hexcode: "#C23EFA",
    },
    {
      color: "Grå",
      slug: "gra",
      hexcode: "#6B6B6B",
    },
    {
      color: "Beige",
      slug: "beige",
      hexcode: "#FFEEDA",
    },
    {
      color: "Vit",
      slug: "vit",
      hexcode: "#FFFFFF",
    },
    {
      color: "Svart",
      slug: "svart",
      hexcode: "#000000",
    },
    {
      color: "Brun",
      slug: "brun",
      hexcode: "#643F11",
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
    hexcode: string;
    colortag: string;
    seasons: string[];
  };

  const sortedList: Color[] = [...list].sort((a, b) =>
    a.hexcode > b.hexcode ? 1 : -1
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
            {seasons.map((season) => {
              return (
                <button
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
              {colorTags.map((colorTag) => {
                return (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h3>{colorTag.color}</h3>
                    {filteredListBySeason
                      .filter((color) =>
                        color.colortag.includes(colorTag.color)
                      )
                      .map((filteredColor) => (
                        <div
                          style={{
                            backgroundColor: filteredColor.hexcode,
                            width: "100px",
                            height: "50px",
                          }}
                        >
                          {filteredColor.hexcode}
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
