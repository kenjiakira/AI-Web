const fs = require('fs-extra');

let apiKeys;
try {
    const data = fs.readFileSync('apiKey/api.json');
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

module.exports = {
    apiKeys,
    systemInstruction
};
