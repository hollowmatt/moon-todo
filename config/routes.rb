Rails.application.routes.draw do

  #routes for web pages
  root 'home#index'
  get 'todo' => 'home#index'

  #define the API routes
  get 'tasks' => 'todos#tasks'
  post 'task' => 'todos#create'
  put 'task' => 'todos#update'
  delete 'task' => 'todos#destroy'

end
