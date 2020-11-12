"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookmark = exports.updateBookmark = exports.createBookmark = exports.getBookmarks = void 0;
const database_1 = require("../database");
exports.getBookmarks = async (req, res) => {
    try {
        const response = await database_1.pool.query(`SELECT * FROM bookmark ORDER BY creation_date DESC`);
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
};
exports.createBookmark = async (req, res) => {
    try {
        const { title, url, type, author_name, width, height, duration, keywords } = req.body;
        const response = await database_1.pool.query('INSERT INTO bookmark (title, url, type, author_name, width, height, duration, keywords) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [title, url, type, author_name, width, height, duration, keywords]);
        return res.status(201).json(response.rows[0]);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
};
exports.updateBookmark = async (req, res) => {
    try {
        const id = parseInt(req.params.bookmarkId);
        const { title, url, type, author_name, width, height, duration, keywords } = req.body;
        const response = await database_1.pool.query('UPDATE bookmark SET title = $1, url = $2, type = $3, author_name = $4, width = $5, height = $6, duration = $7, keywords = $8 WHERE bookmark_id = $9 RETURNING *', [title, url, type, author_name, width, height, duration, keywords, id]);
        return res.status(201).json(response.rows[0]);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
};
exports.deleteBookmark = async (req, res) => {
    const id = parseInt(req.params.bookmarkId);
    try {
        const response = await database_1.pool.query('DELETE FROM bookmark WHERE bookmark_id = $1', [id]);
        return res.status(204).json(response.rows);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
};
