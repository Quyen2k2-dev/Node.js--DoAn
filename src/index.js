const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const sass = require('node-sass')
const app = express()
const port = 3000

const querystring = require('querystring');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));

// HTTP LOGGER
app.use(morgan('combined'))

// Template engine
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
console.log(path.join(__dirname, 'resources/views'))

// Routes

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/search', (req, res) => {
    if (!req.query.q) {
        req.query.q = 'tcp';
    }
    res.render('search')
})

app.get('/question', (req, res) => {
    res.render('question')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/exam', (req, res) => {
    res.render('exam')
})

app.get('/test', (req, res) => {
    res.render('test')
})


app.get('/feedback', (req, res) => {
    res.render('feedback');
});

app.post('/feedback', (req, res) => {
    const { fullname, occupation, text } = req.body;

    // Xử lý dữ liệu nhận từ form

    // Sau khi xử lý xong, chuyển đến trang 'response-user' để hiển thị thông báo phản hồi
    res.redirect(`/response-user?fullname=${encodeURIComponent(fullname)}&occupation=${encodeURIComponent(occupation)}&text=${encodeURIComponent(text)}`);
});



app.get('/profile', (req, res) => {
    res.render('profile')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/myArticle', (req, res) => {
    res.render('myArticle')
})

// Thêm route cho dashboard
app.get('/dashboard', (req, res) => {
    res.render('dashboard');
})
app.get('/response-user', (req, res) => {
    // Lấy dữ liệu từ query string
    const { fullname, text } = req.query;

    // Hiển thị phản hồi trên trang response
    res.render('response', {
        fullname,
        text
    });
});

// Khởi động máy chủ
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
