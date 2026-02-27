import { Router } from "express";
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  verifyJwt,
  validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import { AvailableUserRoles } from "../utils/constants.js";

const router = Router();

router.use(verifyJwt);

// Note Routes
router
  .route("/:projectId")
  .get(validateProjectPermission(AvailableUserRoles), getNotes)
  .post(validateProjectPermission(AvailableUserRoles), createNote);

router
  .route("/:projectId/:noteId")
  .get(validateProjectPermission(AvailableUserRoles), getNoteById);

router
  .route("/:noteId")
  .put(updateNote)
  .delete(deleteNote);

export default router;
