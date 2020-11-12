import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Routes
import BookmarksRoutes from './routes/bookmarks.routes';

export class App {
    private app: Application;

    constructor(private port?: string | number) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings(){
        this.app.set('port', this.port || process.env.PORT || 3001);
    }

    middlewares(){
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes(){
        this.app.use(BookmarksRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log("Server listen on port ", this.app.get('port'));
    }

}