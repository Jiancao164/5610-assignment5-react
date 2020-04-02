import React, {Component} from "react";

class LessonTabsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newLesson: this.props.lesson,
            newTitle: this.props.lesson.title
        }
    }

    render() {
        const {save, edit, editing, lesson, active, select, deleteLesson, updateLesson} = this.props;
        return (
            <li
                onClick={() => select(lesson)}
                className={`nav-item nav-lesson`}>
                <a className={`nav-link ${active ? 'active':''} `} href="#">
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
                        updateLesson(this.state.newLesson._id, {
                            ...this.state.newLesson,
                            title: this.state.newTitle
                        })
                    }}
                       className="fas fa-check float-right"/>

                    <i className={"fas fa-times float-right"}
                       onClick={() => {
                           save();
                           deleteLesson(this.state.newLesson._id)
                       }}
                    />

                </span>}
                    {!editing &&
                    <div>
                        {this.state.newTitle}
                        <i onClick={() => edit(lesson)} className="fas fa-pen float-right"/>
                    </div>
                    }
                </a>
            </li>
        )
    }
}
export default LessonTabsItem
