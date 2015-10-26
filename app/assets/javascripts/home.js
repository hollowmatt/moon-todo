function Todo(data) {
    this.id = ko.observable(data.id);
    this.text = ko.observable(data.text);
    this.completed = ko.observable(data.completed);
};

function TodoModel() {
    var self = this;
    self.todos = ko.observableArray([]);
    self.newTaskText = ko.observable();

    //get all Todos
    $.getJSON({
        url: 'http://localhost:3000/tasks',
        type: 'GET',
        dataType: 'json',
        success: function(allData) {
            var mappedTasks = $.map(allData, function(item) {return new Todo(item)});
            self.todos(mappedTasks);
        },
        error: function() { console.log("an error occurred getting data") },
        headers: {
            'Authorization': 'Token 03ed2d25c17b7a9adf9e3ed3b5ac424c'
        }
    });

    //add a new Todo
    self.addTask = function() {
        todo = new Todo({text: this.newTaskText()});
        self.save(todo);
        self.newTaskText("");
    };

    self.save = function(todo) {
        $.ajax({
            url: "http://localhost:3000/task",
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Token 03ed2d25c17b7a9adf9e3ed3b5ac424c'
            },
            data: ko.toJSON({todo: todo}),
            type: "POST",
            contentType: 'application/json',
            success: function(result) {
                console.log(result);
                newTodo = new Todo({id: result.id, text: result.text, completed: result.completed});
                self.todos.push(newTodo);
            }
        });
    };

    //Function to set standard header
    function setHeader(xhr) {
        xhr.setRequestHeader('Authorization', 'Token 03ed2d25c17b7a9adf9e3ed3b5ac424c');

    }
};

ko.applyBindings(new TodoModel());