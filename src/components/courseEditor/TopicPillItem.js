import React, {Component} from "react";

class TopicPillItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTopic: this.props.topic,
            newTitle: this.props.topic.title
        }
    }

    render() {
        const {save, edit, editing, topic, active, select, deleteTopic, updateTopic} = this.props;
        return (
            <li
                onClick={() => select(topic)}
                className={`nav-item nav-topic`}>
                <a className={`nav-link ${active ? 'active':''}`} href="#">
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
                        updateTopic(this.state.newTopic._id, {
                            ...this.state.newTopic,
                            title: this.state.newTitle
                        })
                    }}
                       className="fas fa-check float-right"/>

                    <i className={"fas fa-times float-right"}
                       onClick={() => {
                           save();
                           deleteTopic(this.state.newTopic._id)
                       }}
                    />

                </span>}
                    {!editing &&
                    <div>
                        {this.state.newTitle}
                        <i onClick={() => edit(topic)} className="fas fa-pen float-right"/>
                    </div>
                    }
                </a>
            </li>
        )
    }
}
export default TopicPillItem
