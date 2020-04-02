import {COURSES_API_URL} from "../common/constants";

export const createCourse = async (course) => {
	let response = await fetch(COURSES_API_URL, {
		method: 'POST',
		body: JSON.stringify(course),
		headers: {
			'content-type': 'application/json'
		}
	});
	return await response.json()
};
export const updateCourse = async (courseId, course) => {
    let response = await fetch(`https://wbdv-generic-server.herokuapp.com/api/001358744/courses/${courseId}`, {
        method: 'PUT',
        body: JSON.stringify(course),
        headers: {
            'content-type': 'application/json'
        }
    });
    return await response.json();
};
export const findAllCourses = async () => {
	let response = await fetch(COURSES_API_URL);
	return await response.json()
};
export const findCourse = (courseId) => {
    fetch(`${COURSES_API_URL}/${courseId}`).then(response => response.json())
};

export const deleteCourse = async (courseId) => {
	return fetch(`${COURSES_API_URL}/${courseId}`, {
		method: 'DELETE'
	}).then(response =>response.json())
};

