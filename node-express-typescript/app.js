"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var Point = /** @class */ (function () {
    function Point() {
        this.x = 1;
        this.y = 2;
    }
    return Point;
}());
var pt = new Point();
var app = (0, express_1.default)();
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.locals.pretty = app.get('env') === 'development';
app.use((0, morgan_1.default)('dev'));
app.get('/', function (req, res) {
    res.render('index', { pt: pt });
});
app.listen(3000, function () {
    console.log('The application is available on port 3000');
});
