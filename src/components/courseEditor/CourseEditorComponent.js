import React from "react";
import LessonTabs from "./LessonTabs";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import modules from '../../reducers/modules'
import lessons from '../../reducers/lessons'
import ModuleListComponent from "./ModuleListComponent";
import TopicPill from "./TopicPill";
import topics from "../../reducers/topics";
import widgets from '../../reducers/widgetReducer'
import {findAllCourses, findCourse} from "../../services/CourseService";
import WidgetList from "./WidgetList";

const reducers = combineReducers({
    modules, lessons, widgets, topics
})

const store = createStore(reducers);

const CourseEditorComponent = ({hideEditor, match, courseId, moduleId, lessonId, topicId, history}) =>
    <Provider store={store}>
        <div className={"container-fluid"}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark row">
                <a className="navbar-brand" href="#"><i onClick={() => {history.push("/")}} className="fas fa-window-close"/></a>
                <div className={"col-3"}>
                    <h1 className={"editor-title"}>Course Editor</h1>
                </div>
            </nav>

            <div className="row">
                <div className="col-3">
                    <ModuleListComponent
                        moduleId={moduleId}
                        history={history}
                        courseId={courseId}/>
                </div>
                <div className="col-9">
                    {moduleId &&
                    <LessonTabs
                        moduleId={moduleId}
                        history={history}
                        courseId={courseId}
                        lessonId={lessonId}/>}

                    {lessonId &&
                    <TopicPill
                        topicId={topicId}
                        moduleId={moduleId}
                        history={history}
                        courseId={courseId}
                        lessonId={lessonId}/>}
                    {topicId &&
                    <WidgetList
                        courseId={courseId}
                        history={history}
                        moduleId={moduleId}
                        lessonId={lessonId}
                        topicId={topicId}/>}
                </div>
            </div>
        </div>
    </Provider>
export default CourseEditorComponent
