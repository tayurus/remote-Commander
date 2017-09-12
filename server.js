//подключаемые модули
var express = require('express'), //собственно, сервер
    app = express(), // объект типа "сервер"
    bodyParser = require('body-parser') //модуль, который парсит post-запрос
    var exec = require('child_process').exec;

exec('calc', function callback(error, stdout, stderr){
    // result
});
app.use(bodyParser.urlencoded({extended: false}));

//установка пути, где находятся файлы верстки, стилей и т.д
app.use(express.static(__dirname));

/* АНАЛИЗ GET-запросов*/

//отправка верстки при заходе на localhost:8000
app.get('/', function(){
    res.setHeader("Content-Type", "text/html");
    res.sendFile(__dirname + "index.html")
})

//


// слушаем порт
app.listen(8000);
