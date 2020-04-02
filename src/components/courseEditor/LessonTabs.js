import React from "react";
import {connect} from "react-redux";
import {createLesson, deleteLesson, findLessonsForModule, updateLesson} from "../../services/LessonService";
import {
    createLessonAction,
    deleteLessonAction,
    findLessonsForModuleAction,
    updateLessonAction
} from "../../actions/lessonActions";
import LessonTabsItem from "./LessonTabsItem";
import {findCourse} from "../../services/CourseService";


class LessonTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeLessonId: this.props.lessonId,
            editingLessonId: '',
            cs: {}
        }
    }
    componentDidMount() {
        this.props.findLessonsForModule(this.props.moduleId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.moduleId !== prevProps.moduleId) {
            this.props.findLessonsForModule(this.props.moduleId)
        }
    }

    edit = (lesson) => {
        const lessonId = lesson._id;
        this.props.history.push(`/course-editor/${this.props.courseId}/modules/${this.props.moduleId}/lessons/${lessonId}`);
        this.setState({
            editingLessonId: lesson._id
        })
    };

    select = (lesson) =>  {
        const lessonId = lesson._id;
        console.log(lesson)
        this.props.history.push(`/course-editor/${this.props.courseId}/modules/${this.props.moduleId}/lessons/${lessonId}`);
        this.setState({
            activeLessonId: lesson._id
        })
    };

    save = () => {
        this.setState({
            editingLessonId: ''
        })
    };

    render() {
        return(
            <ul className="nav nav-tabs">
                {
                    this.props.lessons && this.props.lessons.map(lesson =>
                        <LessonTabsItem
                            key={lesson._id}
                            edit={this.edit}
                            select={this.select}
                            save={this.save}
                            updateLesson={this.props.updateLesson}
                            deleteLesson={this.props.deleteLesson}
                            editing={lesson._id === this.state.editingLessonId}
                            active={lesson._id === this.state.activeLessonId}
                            lesson={lesson}/>)
                }
                <li className="nav-item">
                    <i className={"fas fa-plus lesson-plus"} onClick={() => this.props.createLesson(this.props.moduleId, {title: 'New Lesson'})}/>
                </li>
            </ul>
        )
    }
}


const stateToPropertyMapper = (state) => ({
    lessons: state.lessons.lessons
});

const dispatchToPropertyMapper = (dispatch) => ({
    createLesson: (moduleId, lesson) =>
        createLesson(moduleId, lesson)
            .then(actualLesson =>
                dispatch(createLessonAction(actualLesson))),
    findLessonsForModule: (moduleId) =>
        findLessonsForModule(moduleId)
            .then(lessons =>
                dispatch(findLessonsForModuleAction(lessons))),
    updateLesson: (lessonId, lesson) => {
        updateLesson(lessonId, lesson)
            .then(actualLesson =>
                dispatch(updateLessonAction(actualLesson)))
    },
    deleteLesson: (lessonId) => {
        deleteLesson(lessonId)
            .then(status =>
                dispatch(deleteLessonAction(lessonId)))
    }
});

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(LessonTabs)

