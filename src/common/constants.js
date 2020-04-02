export const COURSES_API_URL = "https://wbdv-generic-server.herokuapp.com/api/001358744/courses";
export const MODULES_API_URL = "https://wbdv-generic-server.herokuapp.com/api/001358744/modules";
export const LESSONS_API_URL = "https://wbdv-generic-server.herokuapp.com/api/001358744/lessons";
export const TOPICS_API_URL = "https://wbdv-generic-server.herokuapp.com/api/001358744/topics";
export const COURSES_MODULES_API_URL = (courseId) => `https://wbdv-generic-server.herokuapp.com/api/001358744/courses/${courseId}/modules`;
export const MODULES_LESSONS_API_URL = (moduleId) => `https://wbdv-generic-server.herokuapp.com/api/001358744/modules/${moduleId}/lessons`;
export const LESSONS_TOPICS_API_URL = (lessonId) => `https://wbdv-generic-server.herokuapp.com/api/001358744/lessons/${lessonId}/topics`;
