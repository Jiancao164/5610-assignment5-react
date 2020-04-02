import React from "react";
import {connect} from "react-redux";
import HeadingWidget from "./widgets/HeadingWidget";
import ParagraphWidget from "./widgets/PararagraphWidget";
import {
    findAllWidgets,
    createWidget,
    deleteWidget,
    updateWidget,
    findWidgetsForTopic
} from "../../services/WidgetService";

class WidgetList extends React.Component {
    state = {
        editingWidgetId: '',
        widget: {
            id: ''
        },
        testWidget : this.props.widgets,
        allWidgets: [],
        widgetType: "",
        maxOrder: 0,
        val : -1,
        maxOfOrder: -1
    }
    componentDidMount() {
        this.props.findWidgetsForTopic(this.props.topicId);
        this.setState(this.props.findWidgetsForTopic(this.props.topicId));
        this.getMaxOrder();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.topicId !== this.props.topicId) {
            this.props.findWidgetsForTopic(this.props.topicId);
        }
    }
    getMaxOrder = () => {

        let od = this.state.maxOrder;
        this.props.widgets.map(widget => {
            console.log(widget.order)
            od = od < widget.order? widget.order : od;
        });
        if (od !== this.state.maxOrder) {
            this.setState({maxOrder : od}
            )
        }
    };

    addWidget = async () => {
        let c = -1;
        let as = await findWidgetsForTopic(this.props.topicId);
        for (var i = 0; i < as.length; i++) {
            if (as[i].order > c) {
                c = as[i].order
            }
        }
        this.setState(prevState => {
            prevState.maxOfOrder = c;
        });
        this.props.createWidget(this.props.topicId,
            {
                title: "New Widget",
                type: "HEADING",
                topicId: this.props.topicId,
                order: c + 1,
                id: (new Date()).getTime() + ""
            })
    };

    change = () => {

        this.props.widgets.map(widget => {
            if (this.state.val < widget.order) this.setState({val : widget.order + 1});
        });


    };

    changeWidgetType = (type) => {

        this.setState({
            widgetType: type

        })
        console.log(this.state.widgetType)
    }

    saveWidget = (widgetId, widget) => {
        this.setState({
            editingWidgetId: ''
        })
        {console.log(this.state.editingWidgetId)}
        this.props.updateWidget(widgetId, widget)
    }

    render(){
        return(
            <div>
                <div>
                    {console.log(this.props.widgets)}
                    {this.props.widgets && this.props.widgets.sort((a, b) =>
                        (a.order > b.order)? 1 : -1).map(widget =>
                        <div key={widget.id} className="card">
                            <div className={"card-body"}>
                                {widget.type === "HEADING" &&
                                <HeadingWidget
                                    topicId={this.props.topicId}
                                    widgets={this.props.widgets}
                                    updateWidget = {this.updateWidget}
                                    saveWidget={this.saveWidget}
                                    editingWidgetId = {this.state.editingWidgetId}
                                    editing={this.state.editingWidgetId === widget.id}
                                    deleteWidget={this.props.deleteWidget}
                                    {...this.props}
                                    widget={widget}/>}
                                {widget.type === "PARAGRAPH" &&
                                <ParagraphWidget
                                    topicId={this.props.topicId}
                                    widgets={this.props.widgets}
                                    updateWidget = {this.updateWidget}
                                    saveWidget={this.saveWidget}
                                    editingWidgetId = {this.state.editingWidgetId}
                                    editing={this.state.editingWidgetId === widget.id}
                                    deleteWidget={this.props.deleteWidget}
                                    {...this.props}
                                    widget={widget}/>}
                                <span>
                                    {this.state.editingWidgetId !== widget.id &&
                                    <i className={"float-right fas fa-pen float-right"} onClick={
                                        () => this.setState({
                                            editingWidgetId: widget.id,
                                            widget: widget
                                        })}/>
                                    }
                                </span>
                            </div>
                        </div>
                    )
                    }
                    <br/>
                    <div>
                        <i onClick={
                            () => {
                                this.change();
                                this.addWidget();
                            }
                        }
                           className="fas fa-plus-circle fa-2x float-right"/>
                        <br/>
                    </div>
                </div>
            </div>
        )
    }
}

const stateToPropertyMapper = (state) => ({
    widgets: state.widgets.widgets
})

const dispatchToPropertyMapper = (dispatcher) => ({
    findWidgetsForTopic: (topicId) =>
        findWidgetsForTopic(topicId)
            .then(widgets => dispatcher({
                type: "WIDGET_FOR_TOPIC",
                widgets: widgets
            })),
    updateWidget: (widgetId, newWidget) =>
        updateWidget(widgetId, newWidget)
            .then(status => dispatcher({
                type: "UPDATE_WIDGET",
                widget: newWidget
            })),
    deleteWidget: (widgetId) =>
        deleteWidget(widgetId)
            .then(status => dispatcher({
                type: 'DELETE_WIDGET',
                widgetId: widgetId
            })),
    createWidget: (topicId, newTopic) =>
        createWidget(topicId, newTopic).then(actualWidget => dispatcher({
            type: "ADD_WIDGET",
            widget: actualWidget
        })),
    findAllWidgets: () =>
        findAllWidgets()
            .then(actualWidgets => dispatcher({
                type: "FIND_ALL_WIDGETS",
                widgets: actualWidgets
            }))
})

export default connect
(stateToPropertyMapper, dispatchToPropertyMapper)
(WidgetList)
