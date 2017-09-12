//подключаемые модули
var express = require('express'), //собственно, сервер
    app = express(), // объект типа "сервер"
    bodyParser = require('body-parser') //модуль, который парсит post-запрос
    var exec = require('child_process').exec;


//массив всех задач
var tasks = []

app.use(bodyParser.urlencoded({extended: false}));

//установка пути, где находятся файлы верстки, стилей и т.д
app.use(express.static(__dirname));

/* АНАЛИЗ GET-запросов*/

//отправка верстки при заходе на localhost:8000
app.get('/', function(){
    res.setHeader("Content-Type", "text/html");
    res.sendFile(__dirname + "index.html")
})

/*АНАЛИЗ POST-запросов*/


//добавление новой задачи
app.post('/newTask', function(req, res){
    // console.log('NEW TASK!!!', req.body.comment, '  -  ', req.body.command);
    var task = {
        command :  req.body.command,
        comment : req.body.comment,
        timeStart :  new Date().toLocaleTimeString(),
    }
    task.status = 'В процессе'
    tasks.push(task)

    exec(req.body.command, function callback(error, stdout, stderr){
        if (error){
            task.status = "Ошибка!"
            task.out = stderr;
        }
        else{
            task.status = "Завершено"
            task.out = stdout;
        }

        task.timeEnd = new Date().toLocaleTimeString();
    });
})



//получение списка всех задач
app.post('/getTasks', function(req,res){
    // console.log('GET TASKS')
    res.send(tasks)
})



// слушаем порт
app.listen(8000);
