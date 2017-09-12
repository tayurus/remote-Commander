//после того как весь сайт загрузился
$(document).ready(function() {
    //скрываем окно запуска утилит
    $(".executing").css('display', 'none');

    /*!!!!!!!!!!!!!!!РЕАКЦИИ НА ДЕЙСТВИЯ ПОЛЬЗОВАТЕЛЯ!!!!!!!!!!!!!!!!!!!!*/

    //нажатие на кнопку "К ЗАПУСКУ УТИЛИТ"
    $(".showUtilities").click(function() {
        //скрыть окно просмотра результатов
        $(".results").css('display', 'none');

        //показать окно запуска утилит
        $(".executing").css('display', 'block');
    })

    //нажатие на кнопку "К ПРОСМОТРУ РЕЗУЛЬТАТОВ"
    $(".showResults").click(function() {
        //скрыть окно запуска утилит
        $(".results").css('display', 'block');

        //показать окно просмотра результатов
        $(".executing").css('display', 'none');

        updateTasks()

    })




    //нажатие на кнопку "ЗАПУСК"
    $(".btn-success").click(function() {

        //отправить на сервер Ajax-запрос
        $.post("/newTask", {
            //передаем задачу для запуска
            command: $('[name="command"]').val(),
            comment: $('[name="comment"]').val()
        }, function(data) {

        })
    })

    $(".updateUtilities").click(function(){
        updateTasks()
    })

    //обновление списка задач
    function updateTasks(){
        //преварительно очистить таблицу от прошлых задач
        $( ".tableResults tbody tr" ).each( function(index){
            if (index != 0)
                this.parentNode.removeChild( this );
            });

        //получить список всех запущенных задач
        $.post('/getTasks', {
        },function(data){
            //для каждой полученой задачи создать строку в таблице и заполнить ее данными
            data.forEach(function(el){
                $('.tableResults').append('<tr><td>'+el.command+'</td><td>'+el.comment+'</td><td>'+el.status+'</td><td>'+el.out+'</td><td>'+el.timeStart+'</td><td>'+el.timeEnd+'</td></tr>')
            })
        })
    }



})
