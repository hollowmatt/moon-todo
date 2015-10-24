class TodosController < ApplicationController

  # Return all tasks in JSON format
  def tasks
    @todos = Todo.all
    render json: @todos
  end

  #create a new task (accept data in JSON format)
  def create
    @todo = Todo.new(user_params)
    if @todo.save
      render json: @todo
    else
      render nothing: true, status: :bad_request
    end
  end

  #update an existing task
  def update
    @todo = Todo.find(params[:todo][:id])
    if @todo.update_attributes(user_params)
      render json: @todo
    else
      render nothing: true, status: :bad_request
    end
  end

  #delete an existing task
  def destroy
    @todo = Todo.find(params[:todo][:id])
    if @todo.destroy
      render json: {status: 200, message: "Task with id " + @todo.id.to_s + ': removed'}
    else
      render nothing: true, status: :bad_request
    end
  end

  private

  def user_params
    params.require(:todo).permit(:text, :completed)
  end
end
