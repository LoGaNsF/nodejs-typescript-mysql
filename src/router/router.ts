import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req: Request, res: Response) => {
    const query = `SELECT * FROM heroes`;

    MySQL.executeQuery(query, (err: any, heroes: any[]) => {
        if (err) {
            return res.status(400).json({ ok: false, error: err });
        }

        res.json({ ok: true, data: heroes });
    });
});

router.get('/heroes/:id', (req: Request, res: Response) => {
    const id = MySQL.instance.connection.escape(req.params.id);
    const query = `SELECT * FROM heroes WHERE id = ${id}`;

    MySQL.executeQuery(query, (err: any, heroe: any[]) => {
        if (err) {
            return res.status(400).json({ ok: false, error: err });
        }

        res.json({ ok: true, data: heroe[0] });
    });
});

export default router;
