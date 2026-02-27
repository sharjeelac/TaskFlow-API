import { Router } from "express";
import {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectMembers,
  addProjectMember,
  updateProjectMember,
  deleteProjectMember,
} from "../controllers/project.controller.js";
import {
  createProjectValidator,
  addMemberToProjectValidator,
} from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  verifyJwt,
  validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import { UserRolesEnums, AvailableUserRoles } from "../utils/constants.js";

const router = Router();

router.use(verifyJwt);

router
  .route("/")
  .get(getProjects)
  .post(createProjectValidator(), validate, createProject);

router
  .route("/:projectId")
  .get(validateProjectPermission(AvailableUserRoles), getProjectById)
  .put(
    validateProjectPermission([UserRolesEnums.ADMIN]),
    createProjectValidator(),
    validate,
    updateProject,
  )
  .delete(validateProjectPermission([UserRolesEnums.ADMIN]), deleteProject);

router
  .route("/:projectId/members")
  .get(getProjectMembers)
  .post(
    validateProjectPermission([UserRolesEnums.ADMIN]),
    addMemberToProjectValidator(),
    validate,
    addProjectMember,
  );

router
  .route("/:projectId/members/:userId")
  .put(validateProjectPermission([UserRolesEnums.ADMIN]), updateProjectMember)
  .delete(
    validateProjectPermission([UserRolesEnums.ADMIN]),
    deleteProjectMember,
  );

export default router;
