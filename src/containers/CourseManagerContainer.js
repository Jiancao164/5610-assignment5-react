import React from 'react'
import {createCourse, findAllCourses, deleteCourse, updateCourse} from '../services/CourseService'
import CourseListComponent from "../components/courseList/CourseListComponent";

import {BrowserRouter as Router, Route} from "react-router-dom";
import CourseEditorComponent from "../components/courseEditor/CourseEditorComponent";
import CourseGridComponent from "../components/courseList/CourseGridComponent";
import CourseTableComponent from "../components/courseList/CourseTableComponent";


class CourseManagerContainer extends React.Component {
    state = {
        showEditor: false,
        layout: 'table',
        newCourseTitle: 'New Course',
        courses: []
    }

    componentDidMount = async () => {

        const courses = await findAllCourses()
        this.setState({
            courses: courses
        })

    }

    deleteCourse = async (deletedToCourse) => {
        const status = await deleteCourse(deletedToCourse._id)
        const courses = await findAllCourses()
        this.setState({
            courses: courses
        })

    }

    addCourse = () => {
        createCourse({
            title: this.state.newCourseTitle
        }).then(actual => {
            return findAllCourses()
        })
        .then(courses => {
            this.setState({
                courses: courses
            })
        })

    }
    saveCourse = async (courseId, savedCourse) => {
        const status = await updateCourse(courseId, savedCourse);
        console.log(status);
        const courses = await findAllCourses();
        this.setState({
            courses: courses,
        })

    };

    toggle = () => {
        this.setState(prevState => ({
            layout: prevState.layout === 'grid' ? 'table': 'grid'
        }))
    }

    updateFormState = (event) => {
        console.log(event.target.value)
        this.setState({
            newCourseTitle: event.target.value
        })
    }


    editCourse = (course) => {
        this.setState(prevState => ({
            courses: prevState.courses.map(c => {
                c.editing = false
                if(c._id === course._id) {
                    c.editing = true
                } else {
                    c.editing = false
                }
                return c
        })}))
    }

    showEditor = () =>
        this.setState({
            showEditor: true
        })

    hideEditor = () =>
        this.setState({
            showEditor: false
        })

    render() {
        return (
            <div className="container-fluid">
                <Router>
                    <Route
                        path="/"
                        exact={true}
                        render={() =>
                            <CourseListComponent
                                hideEditor={this.hideEditor}
                                updateFormState={this.updateFormState}
                                newCourseTitle={this.state.newCourseTitle}
                                addCourse={this.addCourse}
                                toggle={this.toggle}
                                saveCourse={this.saveCourse}
                                deleteCourse={this.deleteCourse}
                                courses={this.state.courses}
                                layout={this.state.layout}
                                showEditor={this.showEditor}
                                editCourse={this.editCourse}/>
                        }/>
                    <Route
                        path="/course-editor/:courseId"
                        exact={true}
                        render={(props) =>
                            <CourseEditorComponent
                                {...props}
                                courseId={props.match.params.courseId}
                                hideEditor={this.hideEditor}/>
                        }/>
                    <Route
                        path="/course-editor/:courseId/modules/:moduleId"
                        exact={true}
                        render={(props) =>
                            <CourseEditorComponent
                                {...props}
                                moduleId={props.match.params.moduleId}
                                courseId={props.match.params.courseId}
                                hideEditor={this.hideEditor}/>
                        }/>
                    <Route
                        path="/course-editor/:courseId/modules/:moduleId/lessons/:lessonId"
                        exact={true}
                        render={(props) =>
                            <CourseEditorComponent
                                {...props}
                                lessonId={props.match.params.lessonId}
                                moduleId={props.match.params.moduleId}
                                courseId={props.match.params.courseId}
                                hideEditor={this.hideEditor}/>
                        }/>
                    <Route
                        path="/course-editor/:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId"
                        exact={true}
                        render={(props) =>
                            <CourseEditorComponent
                                {...props}
                                topicId={props.match.params.topicId}
                                lessonId={props.match.params.lessonId}
                                moduleId={props.match.params.moduleId}
                                courseId={props.match.params.courseId}
                                hideEditor={this.hideEditor}/>
                        }/>

                </Router>
            </div>
        );
    }
}

export default CourseManagerContainer
