import React, {Component} from "react";

class ModuleListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newModule: this.props.module,
            newTitle: this.props.module.title
        }
    }

    render() {
        const {save, edit, editing, module, active, select, deleteModule, updateModule} = this.props;
        return (
            <li
                onClick={() => select(module)}
                className={`list-group-item ${active ? 'active':''}`}>
                {editing &&
                <span>
                    <input
                        onChange={e => this.setState({
                            newTitle : e.target.value
                        })}
                        value={this.state.newTitle}
                    />

                    <i onClick = {() => {
                        save();
                        updateModule(this.state.newModule._id, {
                                ...this.state.newModule,
                                title: this.state.newTitle
                            })
                        }}
                       className="fas fa-check float-right"/>

                    <i className={"fas fa-times float-right"}
                       onClick={() => {
                           save();
                           deleteModule(this.state.newModule._id)
                       }}
                    />

                </span>}
                {!editing &&
                <div>
                    {this.state.newTitle}
                    <i onClick={() => edit(module)} className="fas fa-pen float-right"/>
                </div>
                }
            </li>
        )
    }
}
export default ModuleListItem
