const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs-extra');
const db = require('./cache/database/database'); 

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let apiKeys;
try {
    const data = fs.readFileSync('ApiKey/api.json');
    apiKeys = JSON.parse(data).API_KEYS;
} catch (error) {
    console.error("Lỗi khi đọc file API keys:", error);
    process.exit(1); 
}

let systemInfo;
try {
    const data = fs.readFileSync('json/system_instruction.json', 'utf-8');
    systemInfo = JSON.parse(data);
} catch (error) {
    console.error("Lỗi khi đọc file system instruction:", error);
    process.exit(1);
}
    
const systemInstruction = systemInfo.instruction
    .replace("{aiName}", systemInfo.aiName)
    .replace("{aiAge}", systemInfo.aiAge)
    .replace("{gentle}", systemInfo.gentle);

const generateContentWithAPI = async (apiKey, fullPrompt) => {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const result = await model.generateContent([{ text: fullPrompt }]);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Lỗi khi sử dụng API:", error);
        throw error;
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
        } catch (error) {
            console.error(`API Key ${apiKey} gặp lỗi. Thử API Key khác...`);
        }
    }

    if (responseText) {
        db.saveChatHistory(prompt, responseText, userStyle, (err, lastID) => {
            if (err) {
                console.error(`Lỗi khi lưu lịch sử trò chuyện: ${err.message}`);
            } else {
                console.log(`Đã lưu lịch sử trò chuyện với ID: ${lastID}`);
            }
        });

        res.json({ text: responseText });
    } else {
        res.status(500).json({ error: "Tất cả các API đều gặp lỗi." });
    }
});

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
