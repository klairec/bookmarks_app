import { Request, Response } from 'express';
import { QueryResult} from 'pg';
import { pool } from '../database';

export const getBookmarks = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query(`SELECT * FROM bookmark ORDER BY creation_date DESC`);
        return res.status(200).json(response.rows);
    } catch(error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
}

export const createBookmark = async (req: Request, res: Response) => {
    try {
        const { title, url, type, author_name, width, height, duration, keywords } = req.body;
        const response: QueryResult = await pool.query(
            'INSERT INTO bookmark (title, url, type, author_name, width, height, duration, keywords) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [title, url, type, author_name, width, height, duration, keywords]
        );
        return res.status(201).json(response.rows[0]);
    } catch(error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
}

export const updateBookmark = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.bookmarkId);
        const { title, url, type, author_name, width, height, duration, keywords } = req.body;
        const response: QueryResult = await pool.query(
            'UPDATE bookmark SET title = $1, url = $2, type = $3, author_name = $4, width = $5, height = $6, duration = $7, keywords = $8 WHERE bookmark_id = $9 RETURNING *',
            [title, url, type, author_name, width, height, duration, keywords, id]
        );
        return res.status(201).json(response.rows[0]);
    } catch(error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
}

export const deleteBookmark = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.bookmarkId);
    try {
        const response: QueryResult = await pool.query('DELETE FROM bookmark WHERE bookmark_id = $1', [id]);
        return res.status(204).json(response.rows);
    } catch(error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
}