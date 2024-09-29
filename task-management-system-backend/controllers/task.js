import Task from "../Models/Task.js";

export const createTask = async (request, response, next) => {
  const userId = request.user.id
  const { title, description, dueDate } = request.body;
  
  try {
    const newTask = await Task.create({title,description,dueDate,userId});
    return response.status(201).json({
      status: "success",
      data: newTask,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTask = async (request, response, next) => {
  try {
    const allTask = await Task.find();
    response.status(200).json({
      status: "success",
      data: allTask,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUserTask = async (request, response, next) => {
  
  try {
    const allTaskOfUser = await Task.find({userId:request.params.uid});
 
    response.status(200).json({
      status: "success",
      data: allTaskOfUser,
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (request, response, next) => {
  try {
  
    const aTask = await Task.findById({_id:request.params.id});
    
    response.status(200).json({
      status: "success",
      data: aTask,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (request, response, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      request.params.id,
      { $set: request.body },
      { new: true }
    );
    response.status(200).json({
      status: "success",
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (request, response, next) => {
  try {
    await Task.findByIdAndDelete(request.params.id);
    response.status(200).json({
      status: "success",
      data: `Task with id ${request.params.id} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};
