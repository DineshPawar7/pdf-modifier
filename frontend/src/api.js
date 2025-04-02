import axios from "axios";

const API_URL = "http://localhost:5000/api/pdf";

export const modifyPDF = async (data) => {
    const response = await axios.post(`${API_URL}/modify`, data, {
        responseType: "blob"
    });

    return response.data;
};
