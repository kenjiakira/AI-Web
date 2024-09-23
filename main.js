const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { apiKeys, systemInstruction } = require('./config');
const { log, error } = require('./util/log');

const app = express();
const port = 9999;

app.use(cors());
app.use(express.json());

const generateContentWithAPI = async (apiKey, fullPrompt) => {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const result = await model.generateContent([{ text: fullPrompt }]);
        const response = await result.response;
        return response.text();
    } catch (err) {
        error(`Lỗi khi sử dụng API: ${err}`);
        throw err;
    }
};

app.post('/generate', async (req, res) => {
    const { prompt, userStyle, conversationHistory } = req.body;

    const fullPrompt = `${systemInstruction}\nPhong cách của người dùng: ${userStyle}\n${conversationHistory.join("\n")}\n${prompt}\nTrả lời bằng tiếng Việt (ngôn ngữ Gen Z):`;

    let responseText = '';
    for (const apiKey of apiKeys) {
        try {
            responseText = await generateContentWithAPI(apiKey, fullPrompt);
            break;
        } catch (err) {
            error(`API Key ${apiKey} gặp lỗi. Thử API Key khác...`);
        }
    }

    if (responseText) {
        res.json({ text: responseText });
        log(`Phản hồi từ AI: ${responseText}`);
    } else {
        res.status(500).json({ error: "Tất cả các API đều gặp lỗi." });
        error("Tất cả các API đều gặp lỗi.");
    }
});

app.listen(port, () => {
    log(`Server đang chạy tại http://localhost:${port}`);
});
