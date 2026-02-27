export const UserRolesEnums = {
  ADMIN: "admin",
  PROJECT_ADMIN: "project_admin",
  MEMBER: "member",
};

// AvailableUserRoles should derive from the defined UserRolesEnums
export const AvailableUserRoles = Object.values(UserRolesEnums);

export const TaskStatusEnums = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
};

export const AvailableTaskStatus = Object.values(TaskStatusEnums)
