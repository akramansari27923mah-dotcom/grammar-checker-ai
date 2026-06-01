import jsPDF from "jspdf";
import { Document, Packer, Paragraph } from "docx";
import { saveAs } from "file-saver";
import { errorShow } from "./toast";

export const downloadPdf = (result, setFileExt, setExtInputBoxOpned) => {
  if (!result) return errorShow('Result is not appearing.');
  setFileExt("");
  setExtInputBoxOpned(false);
  const doc = new jsPDF();

  doc.text(result, 10, 10);

  doc.save("Result.pdf");
};

export const downloadText = (
  result,
  setExtInputBoxOpned,
  setFileExt,
  fileExt,
) => {
  if (!result) return errorShow('Result is not appearing.');
  setFileExt("");
  setExtInputBoxOpned(false);

  const blob = new Blob([result], { type: "text/plain" });

  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);

  link.download = `Result.${fileExt}`;

  link.click();
};

export const downloadDocx = async (result, setFileExt, setExtInputBoxOpned) => {
  if (!result) return errorShow('Result is not appearing.');
  setFileExt("");
  setExtInputBoxOpned(false);
  const doc = new Document({
    sections: [
      {
        children: [new Paragraph(result)],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);

  saveAs(blob, "Result.docx");
};
