Rails.application.routes.draw do

  #define the API routes
  get 'tasks' => 'todos#tasks'
  post 'task' => 'todos#create'
  put 'task' => 'todos#update'
  delete 'task' => 'todos#destroy'

end
