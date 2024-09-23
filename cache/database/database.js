const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./cache/database/chat_history.db', (err) => {
    if (err) {
        console.error("Không thể mở cơ sở dữ liệu: ", err.message);
    } else {
        console.log("Đã kết nối với cơ sở dữ liệu SQLite.");

        db.run(`CREATE TABLE IF NOT EXISTS chat_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            prompt TEXT,
            response TEXT,
            user_style TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

function saveChatHistory(prompt, responseText, userStyle, callback) {
    db.run(`INSERT INTO chat_history (prompt, response, user_style) VALUES (?, ?, ?)`, [prompt, responseText, userStyle], function(err) {
        if (err) {
            console.error("Lỗi khi lưu lịch sử trò chuyện:", err.message);
            callback(err);
        } else {
            console.log(`Đã lưu lịch sử trò chuyện với ID: ${this.lastID}`);
            callback(null, this.lastID);
        }
    });
}

function getChatHistory(callback) {
    db.all("SELECT * FROM chat_history", (err, rows) => {
        if (err) {
            console.error("Lỗi khi truy vấn dữ liệu:", err.message);
            callback(err, null);
        } else {
            console.log("Lịch sử trò chuyện:", rows);
            callback(null, rows);
        }
    });
}

module.exports = {
    saveChatHistory,
    getChatHistory
};
