import {LESSONS_API_URL, MODULES_LESSONS_API_URL} from "../common/constants";

export const findLessonsForModule = (moduleId) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/001358744/module/${moduleId}/lessons`)
        .then(response => response.json())

export const createLesson = (moduleId, lesson) =>
    fetch(MODULES_LESSONS_API_URL(moduleId), {
        method: "POST",
        body: JSON.stringify(lesson),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())

export const updateLesson = async (lesson) =>
{
    const response = await fetch(`${LESSONS_API_URL}/${lesson._id}`, {
        method: 'PUT',
        body: JSON.stringify(lesson),
        headers: {
            'content-type': 'application/json'
        }
    })
        return await response.json()
}
