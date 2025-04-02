import axios from "axios";

const API_URL = "https://pdf-modifier.onrender.com/api/pdf";

export const modifyPDF = async (data) => {
    const response = await axios.post(`${API_URL}/modify`, data, {
        responseType: "blob"
    });

    return response.data;
};
