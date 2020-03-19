import {LESSONS_API_URL, LESSONS_LESSONS_API_URL, TOPICS_API_URL} from "../common/constants";

export const findTopicsForLesson = (lessonId) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/001358744/lesson/${lessonId}/topics`)
        .then(response => response.json())

export const createTopic = (lessonId, topic) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/001358744/lesson/${lessonId}/topics`, {
        method: "POST",
        body: JSON.stringify(topic),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())

export const updateTopic = async (topic) =>
{
    const response = await fetch(`${TOPICS_API_URL}/${topic._id}`, {
        method: 'PUT',
        body: JSON.stringify(topic),
        headers: {
            'content-type': 'application/json'
        }
    })
    return await response.json()
}
