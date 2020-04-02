export const FIND_TOPICS_FOR_LESSON = "FIND_TOPICS_FOR_LESSON"
export const findTopicsForLessonAction = (topics) => ({
    topics: topics,
    type: FIND_TOPICS_FOR_LESSON
})

export const CREATE_TOPIC = "CREATE_TOPIC"
export const createTopicAction = (topic) => ({
    type: CREATE_TOPIC,
    topic: topic
})
export const UPDATE_TOPIC = "UPDATE_TOPIC";
export const updateTopicAction = (topic) => ({
    type: UPDATE_TOPIC,
    topic: topic
});
export const DELETE_TOPIC = "DELETE_TOPIC";
export const deleteTopicAction = (topicId) => ({
    type: DELETE_TOPIC,
    topicId: topicId
});
