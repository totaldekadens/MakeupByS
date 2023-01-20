import { AppShell, Flex, Title, Text } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import Header from "../components/Header";
import ContainerWithBorder from "../components/layout/ContainerWithBorder";
import MarginTopContainer from "../components/layout/MarginTopContainer";

export const Ti: FC<PropsWithChildren> = ({ children }) => (
  <Text size={18} mt={15}>
    {children}
  </Text>
);

export const Br: FC<PropsWithChildren> = ({ children }) => (
  <Text size={14} mt={8}>
    {children}
  </Text>
);

const Kopvillkor: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>Köpvillkor - MakeUpByS</title>
        <meta property="og:title" content="Köpvillkor - MakeUpByS" />
        <meta property="og:url" content="https://makeupbys.se/kopvillkor" />
      </Head>
      <AppShell fixed={false} header={<Header />}>
        <MarginTopContainer>
          <ContainerWithBorder>
            <Flex direction="column" style={{ width: "100%" }}>
              <Title mb={20} align="center">
                Köpvillkor
              </Title>
              <Ti>Allmänt</Ti>
              <Br>
                Samtliga priser inkluderar vid försäljningstillfället gällande
                mervärdesskatt, för närvarande 25%. Frakt tillkommer på alla
                priser om inte annat anges. För att genomföra ett köp på
                makeupbys.se krävs det att du är över 18 år. Är du under 18 år
                krävs enligt Föräldrabalken målsmans medgivande. Genom
                beställning på makeupbys.se godkänner du de vid tiden
                publicerade villkor som anges nedan och intygar att de uppgifter
                du lämnar om dig själv är korrekta.
              </Br>
              <Text size={14} mt={5}>
                Med benämningarna vi, våra, vårt och oss nedan avses MakeUpByS
                AB.
              </Text>
              <Text mt={10} size={14} weight={"bold"}>
                Företagsinformation
              </Text>
              <Br>
                MakeUpByS AB <br /> Biblioteksgatan 29, 6 vån <br /> 114 35
                Stockholm <br />
                e-mail: info@makeupbys.se <br />
                Organisationsnummer: 559153-2493
              </Br>
              <Ti>Ansvarsbegränsning</Ti>
              <Br>
                Vi tar inget ansvar för indirekta skador som kan uppstå på grund
                av produkten. Vi accepterar inget ansvar för förseningar/fel
                till följd av omständigheter utanför företagets rådande (Force
                Majeure). Dessa omständigheter kan exempelvis vara
                arbetskonflikt, eldsvåda, krig, myndighetsbeslut, förminskad
                eller utebliven leverans från leverantör. Vidare tas inget
                ansvar för eventuella förändringar på
                produkter/produktegenskaper som ändrats av respektive leverantör
                och andra faktorer utanför vår kontroll.
              </Br>
              <Ti>Betalning</Ti>
              <Br>Vi accepterar kredit- och bankkort som betalningsmetod.</Br>
              <Ti>Ej uthämtade paket</Ti>
              <Br>
                Du måste uppge giltig och korrekt leveransinformation. Om
                MakeUpByS AB får tillbaka ett paket som skickats till fel adress
                eller inte hämtats ut är det upp till dig att betala ny frakt.
                För beställningar som inte hämtas ut debiterar vi en avgift på
                250 SEK.
              </Br>
              <Ti>Kampanjer</Ti>
              <Br>
                Det går inte att kombinera eventuella rabattkoder med övriga
                kampanjer eller erbjudanden, om inget annat anges
              </Br>
              <Ti>Leverans</Ti>
              <Br>
                Våra normala leveranstider är 2-7 arbetsdagar beroende på valt
                fraktalternativ. Beställningar lagda på helger skickas tidigast
                måndagen efter. Om förseningar i leveransen skulle uppstå (utan
                att vi har meddelat dig om längre leveranstid) ber vi dig
                kontakta vår kundtjänst.
              </Br>
              <Ti>Priser</Ti>
              <Br>
                Alla priser på hemsidan anges i SEK och är inklusive moms (om
                inget annat anges eller valts av användaren). Vi reserverar oss
                för prisändringar beroende på felaktig information och
                förbehåller oss rätten att justera priset.
              </Br>
              <Ti>Produktinformation</Ti>
              <Br>
                Vi reserverar oss för eventuella tryckfel på denna webbplats
                samt slutförsäljning av produkter. Vi garanterar inte att
                bilderna återger produkternas exakta utseende då en viss
                färgskillnad kan förekomma beroende på bildskärm, fotokvalitet
                samt upplösning. Vi försöker alltid på bästa sätt att exponera
                produkterna så korrekt som möjligt.
              </Br>
              <Ti>Skada</Ti>
              <Br>
                I fall av trasig eller öppnad kartong vid leverans, kontakta
                ditt utlämningsställe direkt när du hämtar ut paketet. De har
                färdiga blanketter för skadeanmälan.
              </Br>
              <Ti>Tvist</Ti>
              <Br>
                I tillfälle av att tvist inte kan lösas i samförstånd med vår
                kundtjänst och dig, kan du som kund vända dig till Allmänna
                Reklamationsnämnden. Allmänna Reklamationsnämnden har
                telefonnummer 08-508 860 00.
              </Br>
              <Ti>Utebliven orderbekräftelse</Ti>
              <Br>
                På grund av tekniskt fel eller andra omständigheter bortom
                MakeUpByS Cosmetics kontroll kan din orderbekräftelse bli sen
                eller helt utebli. Om din orderbekräftelse dröjer mer än 30
                minuter ber vi dig kontakta vår kundtjänst.
              </Br>
              <Ti>Ändring av villkor</Ti>
              <Br>
                Vi förbehåller oss rätten att när som helst företa ändringar i
                villkoren. Ändringar av villkoren kommer att publiceras online
                på webbplatsen. De ändrade villkoren anses för accepterade i
                samband med beställning eller besök på webbplatsen
              </Br>
              <Ti>Reklamation</Ti>
              <Br>
                Vi följer Konsumentverkets rekommendationer för e-handel.
                Kundtjänst måste alltid kontaktas via vårt kontaktformulär,
                e-post (info@makeupbys.se) inom skälig tid. För mer information
                se nedan. Reklamationen måste göras via vårt kontaktformulär.
                Reklamation av trasig produkt ska ske inom skälig tid efter det
                att felet har upptäckts, dock senast inom 1 år från
                köptillfället. Observera att den trasiga produkten samt
                emballaget måste sparas tills dess att ärendet är löst. Om varan
                ej finns i lager eller har utgått så kontaktar vi dig innan
                vidare hantering. Vi hanterar reklamationsärenden normalt sett
                inom 3-14 arbetsdagar. Vid godkänd reklamation av köp så
                återbetalar vi summan för din beställning inom 30 dagar.
              </Br>
              <Ti>Undantag från ångerrätt</Ti>
              <Br>
                Produkten måste vara obruten och oanvänd men enligt lag har du
                rätt att säkerställa dess egenskaper och funktioner. Vid
                nyttjande av ångerrätten har vi rätt att göra ett
                värdeminskningsavdrag i de fall då varan hanterats i större
                omfattning än nödvändigt. Värdeminskning bedöms från fall till
                fall. Öppnade och/eller använda makeup produkter återtas inte på
                grund utav hälso- och hygienskäl. Vid godkänd hävning av köp så
                återbetalar vi summan för din beställning inom 21 dagar.
              </Br>
              <Ti>Ångerrätt</Ti>
              <Br>
                Vid köp av makeup-produkter på makeupbys.se har du som kund 30
                dagars ångerrätt som gäller från det att du har tagit emot en
                vara som du har beställt. Du är ansvarig för att kontrollera att
                leveransen och produkterna är oskadda i samband med mottagande
                av paketet.
              </Br>
              <Br>
                Du har 30 dagars öppet köp från det att du mottagit paketet,
                förutsatt att produkten returneras oanvänd i oskadad
                originalförpackning och i de fall där varan är plomberad skall
                denna vara obruten. Vid retur betalar du själv returkostnaden.
                Märk returen tydligt med MakeUpByS och ditt ordernummer och
                skicka paketet till:
              </Br>
              <Br>
                MakeUpByS AB
                <br />
                Öresten Ryd 4 <br /> 51191 Skene <br />
              </Br>
              <Br>
                Vill du ha ett standardformulär för utövande av ångerrätten
                finns det att ta del av på konsumentverkets hemsida,
                www.konsumentverket.se Returhanteringen tar ca 1-3 veckor. Tänk
                på att spara kvittot på din retur och skicka spårbart så att vi
                kan ersätta dig för returen även i de fall paketet försvinner
                under leveransen.
              </Br>
            </Flex>
          </ContainerWithBorder>
        </MarginTopContainer>
      </AppShell>
    </>
  );
};

export default Kopvillkor;
