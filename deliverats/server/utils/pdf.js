import PDFGenerator from "pdfkit";
import fs from "fs";

export const generatePDF = ({ order, name, lastName, email, items, total }) => {
  const pdf = new PDFGenerator();
  pdf.pipe(fs.createWriteStream(`receipts/receipt#${order}.pdf`));

  const content = `
  Name : ${name} \n
  Last Name : ${lastName} \n
  Email : ${email} \n
  Items : ${items.map((item) => JSON.stringify(item, null, 4)).join("\n")} \n
  Total : ${total} \n
  Status : Your order was successfully placed!
`;

  pdf.image("media/logo-black.png", {
    fit: [150, 150],
    align: "center",
    valign: "top",
  });

  pdf.text(`Receipt for Order #${order}`, {
    bold: true,
    underline: true,
    align: "center",
  });

  pdf.text(content);

  pdf.moveDown().moveDown();

  pdf.text("Thank you for your order and for choosing Deliverats Canada!", {
    bold: true,
    align: "center",
  });

  pdf.end();
};
