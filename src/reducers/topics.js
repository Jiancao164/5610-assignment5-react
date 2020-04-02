import {CREATE_TOPIC, DELETE_TOPIC, FIND_TOPICS_FOR_LESSON, UPDATE_TOPIC} from "../actions/topicActions";

const topicReducer = (state = {topics: []}, action) => {
    switch(action.type) {
        case CREATE_TOPIC:
            return {
                topics: [
                    ...state.topics,
                    action.topic
                ]
            };
        case FIND_TOPICS_FOR_LESSON:
            return {
                topics: action.topics
            };
        case UPDATE_TOPIC:
            return {
                topics: state.topics.map(topic =>
                    topic._id === action.topicId ? action.topic : topic
                )
            };
        case DELETE_TOPIC:
            return {
                topics: state.topics.filter(topic =>
                    topic._id !== action.topicId
                )
            };
        default:
            return state
    }
};

export default topicReducer
