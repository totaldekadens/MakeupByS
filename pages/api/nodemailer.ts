import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  async function main() {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      logger: true,
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"MakeUpByS" <noreply@makeupbys.se>',
      to: req.body.mail,
      subject: "Orderbekräftelse",
      text: "Tack för din beställning " + req.body.name + "!",
      html:
        `<strong>Tack för din beställning ` +
        req.body.name +
        `!</strong> 
      <p>Ordernummer: ` +
        req.body.orderNo +
        `</p>
      <p>Vi behandlar din order så snart vi kan. Logga in eller skapa ett konto på hemsidan för att se dina orderdetaljer.</p>

      <p>Observera! Detta är inte på riktigt :)</p>
      `,
      headers: { "x-myheader": "test header" },
    });

    res.status(200).json({ success: true, data: info.response });
  }
  main().catch(console.error);
}
