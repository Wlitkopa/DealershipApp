import express, { Express, Request, Response } from 'express';
import morgan from "morgan";

class Point {
    x: number = 1;
    y: number = 2;
}
const pt: Point = new Point();
const app: Express = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.locals.pretty = app.get('env') === 'development';

app.use(morgan('dev'));

app.get('/', function (req: Request, res: Response) {
    res.render('index', { pt });
});

app.listen(3000, function () {
    console.log('The application is available on port 3000');
});