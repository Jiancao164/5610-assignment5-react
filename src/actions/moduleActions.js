
export const FIND_MODULES_FOR_COURSE = "FIND_MODULES_FOR_COURSE"
export const findModulesForCourseAction = (modules) => ({
    modules: modules,
    type: FIND_MODULES_FOR_COURSE
})

export const CREATE_MODULE = "CREATE_MODULE"
export const createModuleAction = (module) => ({
    type: CREATE_MODULE,
    module: module
})
export const UPDATE_MODULE = "UPDATE_MODULE";
export const updateModuleAction = (module) => ({
    type: UPDATE_MODULE,
    module: module
});
export const DELETE_MODULE = "DELETE_MODULE";
export const deleteModuleAction = (moduleId) => ({
    type: DELETE_MODULE,
    moduleId: moduleId
});
