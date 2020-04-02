import CourseGridComponent from "./CourseGridComponent";
import CourseTableComponent from "./CourseTableComponent";
import React, {Component} from "react";
import CourseEditorComponent from "../courseEditor/CourseEditorComponent";
import {BrowserRouter as Router} from "react-router-dom";
import {createCourse, deleteCourse, findAllCourses, updateCourse} from "../../services/CourseService";

class CourseListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditor: false,
            layout: 'table',
            newCourseTitle: '',
            courses: [],
        }
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
        }).then(courses => {
                this.setState({
                    courses: courses
                })
            })

    };
    updateFormState = (event) => {
        this.setState({
            newCourseTitle: event.target.value
        })
    };
    saveCourse = async (courseId, savedCourse) => {
        const status = await updateCourse(courseId, savedCourse);
        console.log(status);
        const courses = await findAllCourses();
        this.setState({
            courses: courses,

        })

    };

    render() {
        return (
            <div>
                <div>
                    {
                        !this.state.showEditor &&
                        <div>
                            <div className={"row Top navbar navbar-expand-xl"}>
                                <div className={"col-1"}>
                                    <i className="fas fa-bars fa-2x"/>
                                </div>
                                <div className={"col-3 collapse navbar-collapse"}>
                                    <h1>Course Manager</h1>
                                </div>
                                <div className={"col-7"}>
                                    <input
                                        className="form-control"
                                        onChange={this.updateFormState}
                                        value={this.state.newCourseTitle}
                                        placeholder="New Course Title"/>
                                </div>
                                <div className={"col-1"}>
                                    <i onClick={this.addCourse} className="fas fa-plus-circle fa-2x"/>
                                </div>
                            </div>
                            <div>
                                <hr className={"Horizontal-Line"}/>
                            </div>
                            <div className={"row navbar"}>
                                <div className={"col-6 "}>
                                    <h6 >Title</h6>
                                </div>
                                <div className={"col-3 d-none d-md-block"}>
                                    <h6>Owned by</h6>
                                </div>
                                <div className={"col-2 d-none d-lg-block"}>
                                    <h6>Last modified</h6>
                                </div>
                                <div className={"col-1 "}>
                                    <i onClick={this.props.toggle}
                                       className={`fas ${this.state.layout === "table"? "fa-th" : "fa-list"} float-right `}/>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div>
                    {
                        this.state.showEditor &&
                        <CourseEditorComponent hideEditor={this.props.hideEditor}/>
                    }
                    {
                        !this.state.showEditor &&
                        <div>
                            {
                                this.state.layout === "grid" &&
                                <CourseGridComponent
                                    showEditor={this.props.showEditor}
                                    editCourse={this.props.editCourse}
                                    deleteCourse={this.props.deleteCourse}
                                    saveCourse={this.props.saveCourse}
                                    courses={this.state.courses}/>
                            }
                            {
                                this.state.layout === "table"  &&
                                <CourseTableComponent
                                    showEditor={this.props.showEditor}
                                    editCourse={this.props.editCourse}
                                    deleteCourse={this.deleteCourse}
                                    saveCourse={this.saveCourse}
                                    courses={this.state.courses}/>

                            }
                        </div>
                    }
                </div>
            </div>
        )
    }
}



export default CourseListComponent
