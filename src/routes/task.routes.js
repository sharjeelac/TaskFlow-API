import { Router } from "express";
import {
  getTask,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  createSubTasks,
  updateSubTasks,
  deleteSubTasks,
} from "../controllers/task.controller.js";
import { multerUpload } from "../middlewares/multer.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  verifyJwt,
  validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import { AvailableUserRoles } from "../utils/constants.js";

const router = Router();

router.use(verifyJwt);

// Task Routes
router
  .route("/:projectId")
  .get(validateProjectPermission(AvailableUserRoles), getTask)
  .post(
    validateProjectPermission(AvailableUserRoles),
    multerUpload.array("attachments", 5),
    createTask,
  );

router
  .route("/:projectId/:taskId")
  .get(validateProjectPermission(AvailableUserRoles), getTaskById)
  .put(validateProjectPermission(AvailableUserRoles), updateTask)
  .delete(validateProjectPermission(AvailableUserRoles), deleteTask);

// SubTask Routes
router
  .route("/:taskId/subtasks")
  .post(createSubTasks);

router
  .route("/:taskId/subtasks/:subTaskId")
  .put(updateSubTasks)
  .delete(deleteSubTasks);

export default router;
