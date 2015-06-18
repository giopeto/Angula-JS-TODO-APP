var todoApp = angular.module('todoApp', ['ui.bootstrap']);

todoApp.controller('todoCtrl', function($scope) {

	$scope.todo = {
		newTodo: {
			name: '',
			description: '',
			startDate: '',
			endtDate: '',
			priority: '',
		},
		todos: [],
		dateFormat: 'dd.MM.yyyy',
		openedStartDate: false,
		openedEndDate: false,
		reverse: true,
		allTodos: []
	};

	$scope.openStartDate = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.todo.openedStartDate = true;
		$scope.todo.openedEndDate = false;
	};
	$scope.openEndate = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.todo.openedStartDate = false;
		$scope.todo.openedEndDate = true;
	};

	$scope.addTodo = function (args) {
		$scope.todo.allTodos.push(args);
		$scope.todo.newTodo = {};
		$scope.setTodoToLocalStorage();
	};

	$scope.getTodoFromLocalStorage = function () {
		if (typeof(Storage)!=="undefined" && localStorage.getItem('todos')){
			var localData = JSON.parse(localStorage.getItem('todos'));
			$scope.todo.allTodos = localData;
		} 
	};
	
	$scope.setTodoToLocalStorage = function () {
		if(typeof(Storage)!=="undefined") {
			var dataToStore = JSON.stringify($scope.todo.allTodos);
			localStorage.setItem('todos', dataToStore);
		}
	};

	$scope.removeTodo = function (index) {
		if (confirm ("Are you sure")) {
			$scope.todo.allTodos.splice(index, 1);
			$scope.setTodoToLocalStorage();
		}
	};

	$scope.getTodoFromLocalStorage();
});