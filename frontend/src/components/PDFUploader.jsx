import { useState } from "react";
import { modifyPDF } from "../api";

const PDFUploader = () => {
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [downloadUrl, setDownloadUrl] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !text) {
            alert("Please select a file and enter text.");
            return;
        }

        const modifiedPdf = await modifyPDF(file, text);
        const blob = new Blob([modifiedPdf], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
    };

    return (
        <div>
            <h2>Upload PDF & Modify</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
                <input type="text" placeholder="Enter text to add" value={text} onChange={(e) => setText(e.target.value)} />
                <button type="submit">Modify PDF</button>
            </form>

            {downloadUrl && (
                <a href={downloadUrl} download="modified.pdf">Download Modified PDF</a>
            )}
        </div>
    );
};

export default PDFUploader;
