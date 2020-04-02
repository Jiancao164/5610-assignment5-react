import React from "react";
import {
    createModuleAction,
    deleteModuleAction,
    findModulesForCourseAction,
    updateModuleAction
} from "../../actions/moduleActions";
import connect from "react-redux/es/connect/connect";
import {createModule, deleteModule, findModulesForCourse, updateModule} from "../../services/ModuleService";
import ModuleListItem from "./ModuleListItem";

class ModuleListComponent extends React.Component {

    componentDidMount() {
        this.props.findModulesForCourse(this.props.courseId)
    }

    state = {
        activeModuleId: this.props.moduleId,
        editingModuleId: ''
    }

    edit = (module) => {
        const moduleId = module._id;
        this.props.history.push(`/course-editor/${this.props.courseId}/modules/${moduleId}`);
        this.setState({
            editingModuleId: module._id
        })
    };

    select = (module) =>  {
        const moduleId = module._id;
        console.log(module)
        this.props.history.push(`/course-editor/${this.props.courseId}/modules/${moduleId}`);
        this.setState({
            activeModuleId: module._id
        })
    };

    save = () => {
        this.setState({
            editingModuleId: ''
        })
    };

    render() {
        return (
            <ul className="list-group">
                {
                    this.props.modules && this.props.modules.map(module =>
                        <ModuleListItem
                            key={module._id}
                            edit={this.edit}
                            select={this.select}
                            save={this.save}
                            updateModule={this.props.updateModule}
                            deleteModule={this.props.deleteModule}
                            editing={module._id === this.state.editingModuleId}
                            active={module._id === this.state.activeModuleId}
                            module={module}/>)
                }
                <li className="list-group-item">
                    <i className={"fas fa-plus float-right"}
                        onClick={
                            () => this.props.createModule(this.props.courseId, {title: 'New Module'})
                        }/>
                </li>
            </ul>
        );
    }
}

const stateToPropertyMapper = (state) => ({
    modules: state.modules.modules
});

const dispatchToPropertyMapper = (dispatch) => ({
    createModule: (courseId, module) =>
        createModule(courseId, module)
            .then(actualModule =>
                dispatch(createModuleAction(actualModule))),
    findModulesForCourse: (courseId) =>
        findModulesForCourse(courseId)
            .then(modules =>
                dispatch(findModulesForCourseAction(modules))),
    updateModule: (moduleId, module) => {
        updateModule(moduleId, module)
            .then(actualModule =>
                dispatch(updateModuleAction(actualModule)))
    },
    deleteModule: (moduleId) => {
        deleteModule(moduleId)
            .then(status =>
                dispatch(deleteModuleAction(moduleId)))
    }
});

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(ModuleListComponent)
