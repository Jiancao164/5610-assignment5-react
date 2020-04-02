import React from "react";
import {findWidgetsForTopic} from "../../../services/WidgetService";

class ParagraphWidget extends React.Component {
    state = {
        editing: this.props.editing,
        widget: this.props.widget,
        value: this.props.widget.type,
        preview: false,
        text: this.props.widget.text,
        newOrder: 0,
        theOtherWidget: this.props.widget,
    };

    changePreview = () => {
        this.setState({
            preview: this.state.preview === false
        })
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.editing !== this.props.editing) {
            this.setState({
                editing: this.props.editing
            })
        }
    }


    deleteWidgetAndChangeOrder = async (widgetId) => {
        let c = this.props.widget.order;
        this.props.deleteWidget(widgetId);
        this.props.widgets.map(widget => widget.order > c? this.props.updateWidget(widget.id, {...widget, order : widget.order - 1}) : widget);
    };
    changePositionUp = (widgetId) => {
        let c = this.props.widget.order;
        let widget = this.props.widget;
        if (widget.order !== 0) {
            this.props.updateWidget(widgetId, {...widget, order : c - 1})
            this.props.widgets.map(widget => widget.order === c - 1 && widget.id !== widgetId? this.props.updateWidget(widget.id, {...widget, order : widget.order + 1}) : widget);
        }
    };
    changePositionDown = async (widgetId) => {
        let as = await findWidgetsForTopic(this.props.topicId);
        let c = this.props.widget.order;
        let widget = this.props.widget;
        if (widget.order !== as.length - 1) {
            this.props.updateWidget(widgetId, {...widget, order : c + 1})
            this.props.widgets.map(widget => widget.order === c + 1 && widget.id !== widgetId? this.props.updateWidget(widget.id, {...widget, order : widget.order - 1}) : widget);
        }
    };

    render () {
        return(
            <div>
                {
                    !this.state.editing &&
                    <div>
                        {this.props.widget.text}
                    </div>
                }
                {
                    this.state.editing &&
                    <div>
                        <div>
                            {this.state.preview && <i
                                onClick={this.changePreview}
                                className="fas fa-toggle-on float-right fa-2x">Preview</i>}
                            {!this.state.preview && <i
                                onClick={this.changePreview}
                                className="fas fa-toggle-off float-right fa-2x">Preview</i>}
                            <button onClick={() =>
                            {
                                this.props.saveWidget(this.state.widget.id, {...this.props.widget, text : this.state.text, size: this.state.widget.size})
                            }}
                                    className={"btn btn-success float-right"}>save</button>
                            <br/>
                        </div>
                        <br/>
                        {!this.state.preview &&
                        <div>
                            <div className={"row"}>

                                <div className={"col-8"}>
                                    <h3>Paragraph widget</h3>
                                </div>
                                <div className={"col-4 row float-right"}>
                                    <button
                                        onClick={() => this.changePositionUp(this.props.widget.id)}
                                        className={"btn btn-warning btn-sm"}>
                                        <i className="fas fa-arrow-up"/>
                                    </button>

                                    <button
                                        onClick={() => this.changePositionDown(this.props.widget.id)}
                                        className={"btn btn-warning btn-sm"}>
                                        <i className="fas fa-arrow-down"/></button>

                                    <select className={"custom-select col-5"} id={"type"}
                                            onChange={(e) => {
                                                const newType = e.target.value;
                                                this.setState(prevState => {
                                                    prevState.widget.type = newType;
                                                    this.props.updateWidget(this.state.widget.id, this.state.widget)
                                                    return prevState
                                                })

                                            }}
                                            value={this.state.widget.type}
                                    >
                                        <option value="HEADING">Heading</option>
                                        <option value="PARAGRAPH">Paragraph</option>
                                    </select>

                                    <button onClick={() => this.deleteWidgetAndChangeOrder(this.props.widget.id)}
                                            className={"btn btn-danger btn-sm"}>
                                        <i className="fas fa-times"/>
                                    </button>

                                    <br/>
                                </div>
                            </div>

                            <div>
                                <textarea
                                    className="form-control"
                                       placeholder={"Paragraph text"}
                                       onChange={(e) => {
                                           this.setState({
                                               text: e.target.value
                                           })
                                       }
                                       }
                                       value={this.state.text}
                                       aria-label="Text input with segmented dropdown button"/>
                                <br/>

                                <input
                                    type="text" className="form-control"
                                    placeholder={"Widget name"}
                                    aria-label="Text input with segmented dropdown button"

                                    onChange={(e) => {
                                        const newTitle = e.target.value;
                                        this.setState(prevState => {
                                            prevState.widget.title = newTitle;
                                            return prevState
                                        })
                                    }}
                                    value={this.state.widget.title}/>
                            </div>
                        </div>
                        }
                        {this.state.preview &&
                        <div>
                            <hr/>
                            {this.state.text}
                        </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default ParagraphWidget
