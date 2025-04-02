import fs from "fs";
import { PDFDocument, rgb } from "pdf-lib";
import path from "path";

export const modifyPDF = async (req, res) => {
    try {
        const { text1, text2, text3 } = req.body;
        const pdfPath = path.join(process.cwd(), "static", "sample.pdf");

        const existingPdfBytes = fs.readFileSync(pdfPath);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const pages = pdfDoc.getPages();

        if (pages.length < 4) {
            return res.status(400).json({ message: "PDF does not have 4 pages!" });
        }

        const targetPage = pages[3];

        const textPositions = [
            { text: text1, x: 200, y: 680 },
            { text: text2, x: 350, y: 680 },
            { text: text3, x: 450, y: 680 }
        ];

        for (const item of textPositions) {
            targetPage.drawText(item.text, {
                x: item.x,
                y: item.y,
                size: 18,
                color: rgb(0, 0, 1),
                font: await pdfDoc.embedFont("Helvetica-Bold")
            });
        }

        const modifiedPdfBytes = await pdfDoc.save();
        const modifiedFilePath = path.join(process.cwd(), "static", `modified_${Date.now()}.pdf`);
        fs.writeFileSync(modifiedFilePath, modifiedPdfBytes);

        res.download(modifiedFilePath, "modified.pdf", (err) => {
            if (err) {
                console.error("Error sending file:", err);
                res.status(500).json({ message: "File download error" });
            }
            fs.unlinkSync(modifiedFilePath);
        });

    } catch (error) {
        console.error("Error modifying PDF:", error);
        res.status(500).json({ message: "PDF modification failed", error });
    }
};
