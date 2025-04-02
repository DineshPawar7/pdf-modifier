import { useState } from "react";
import axios from "axios";

const PDFForm = () => {
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [text3, setText3] = useState("");
    const [downloadUrl, setDownloadUrl] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text1 || !text2 || !text3) {
            alert("Please enter all fields.");
            return;
        }

        try {
            console.log("Sending request to backend...");
            const response = await axios.post("https://pdf-modifier.onrender.com/api/pdf/modify", {
                text1,
                text2,
                text3
            }, { responseType: "blob" });

            console.log("PDF Received! Creating Blob...");
            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            setDownloadUrl(url);
        } catch (error) {
            console.error("Error fetching modified PDF:", error);
            alert("Failed to generate PDF. Check console for errors.");
        }
    };

    return (
        <div>
            <h2>Modify PDF</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter first text" value={text1} onChange={(e) => setText1(e.target.value)} />
                <input type="text" placeholder="Enter second text" value={text2} onChange={(e) => setText2(e.target.value)} />
                <input type="text" placeholder="Enter third text" value={text3} onChange={(e) => setText3(e.target.value)} />
                <button type="submit">Generate PDF</button>
            </form>

            {downloadUrl && (
                <a href={downloadUrl} download="modified.pdf">
                    Download Modified PDF
                </a>
            )}
        </div>
    );
};

export default PDFForm;
