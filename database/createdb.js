const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("Esc-bot.db", err => {
    if (err) return console.error(err.message);
    console.log("SQLite DBに接続しました。");
});

const tables = [
    [
        "point",
        ["id", "user_name", "user_id", "point", "createdAt", "updatedAt"],
    ],
];

db.serialize(() => {
    tables.forEach(table => {
        db.run(
            `CREATE TABLE IF NOT EXISTS ${table[0]}(${table[1].join()});`,
            () => console.log(`${table[0]}テーブルを作成しました。`)
        );
    });
    return db.close(() => {
        return console.log("DB設定を完了し、終了しました。")
    });
});
