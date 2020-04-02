import {LESSONS_TOPICS_API_URL, TOPICS_API_URL} from "../common/constants";

export const findTopicsForLesson = (lessonId) =>
    fetch(LESSONS_TOPICS_API_URL(lessonId))
        .then(response => response.json());

export const createTopic = (lessonId, lesson) =>
    fetch(LESSONS_TOPICS_API_URL(lessonId), {
        method: "POST",
        body: JSON.stringify(lesson),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());

export const updateTopic = (lessonId, lesson) =>
    fetch(`${TOPICS_API_URL}/${lessonId}`, {
        method: "PUT",
        body: JSON.stringify(lesson),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json());

export const deleteTopic = (lessonId) =>
    fetch(`${TOPICS_API_URL}/${lessonId}`, {
        method: "DELETE",
    }).then(response => response.json());


