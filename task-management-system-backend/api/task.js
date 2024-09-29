import express from "express";
import {
  createTask,
  getAllTask,
  // getTask,
  updateTask,
  deleteTask,
  getAllUserTask,
  getTaskById
} from "../controllers/task.js";
import { verifyToken } from "../Utils/verifyToken.js";

const router = express.Router();

// CRUD operations
//CREATE
router.post("/", verifyToken, createTask);

// PUT
router.put("/:id", verifyToken, updateTask);

//DELETE
router.delete("/:id", verifyToken, deleteTask);

//GET ALL
router.get("/", verifyToken, getAllTask);

//GET all task of a user
router.get("/:uid", verifyToken, getAllUserTask);

//GET A Task
router.get("/byId/:id", verifyToken, getTaskById);

module.exports = (request, response) => {
  router(request, response);
};