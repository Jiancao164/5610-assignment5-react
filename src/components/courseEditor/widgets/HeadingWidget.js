import React from "react";

class HeadingWidget extends React.Component {
    state = {
        editing: this.props.editing,
        widget: this.props.widget,
        value: this.props.widget.type,
        preview: false,
        text: this.props.widget.text,

    };
    change = (e) => {
        this.setState({value : e.target.value})
        this.props.changeWidgetType(e.target.value)
    }
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

    render () {
        return(
            <div>
                {
                    !this.state.editing &&

                    <div>
                        {this.props.widget.size === 1 && <h1>{this.props.widget.title}</h1>}
                        {this.props.widget.size === 2 && <h2>{this.props.widget.title}</h2>}
                        {this.props.widget.size === 3 && <h3>{this.props.widget.title}</h3>}
                        {this.props.widget.size === 4 && <h4>{this.props.widget.title}</h4>}
                        {this.props.widget.size === 5 && <h5>{this.props.widget.title}</h5>}
                        {this.props.widget.size === 6 && <h6>{this.props.widget.title}</h6>}
                        {this.state.text}
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
                                    console.log(this.props.editingWidgetId)
                                    this.props.saveWidget(this.state.widget.id, this.state.widget)
                                    console.log(this.props.editingWidgetId)
                                }}
                                        className={"float-right"}>save</button>
                                <br/>
                            </div>
                            <br/>
                            {!this.state.preview &&
                            <div>
                                <div className={"row"}>
                                    <div className={"col-9"}>
                                        <h3>Heading widget</h3>
                                    </div>
                                    <div className={"col-3 row float-right"}>
                                        <button><i className="fas fa-arrow-up"/></button>
                                        <button><i className="fas fa-arrow-down"/></button>
                                        {console.log(this.state.widget)}
                                        <select id={"type"}
                                                onChange={(e) => {
                                                    const newType = e.target.value;
                                                    this.setState(prevState => {
                                                        console.log(this.state.widget)
                                                        prevState.widget.type = newType;
                                                        console.log(this.state.widget)
                                                        this.props.updateWidget(this.state.widget.id, this.state.widget)
                                                        return prevState
                                                    })

                                                }}
                                                value={this.state.widget.type}
                                        >
                                            <option value="HEADING">Heading</option>
                                            <option value="PARAGRAPH">Paragraph</option>
                                        </select>
                                        <i onClick={() => this.props.deleteWidget(this.props.widget.id)} className="fas fa-window-close fa-3x"/>
                                        <br/>
                                    </div>
                                </div>

                                <div>
                                    <input className="form-control"
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
                                    <select className="custom-select" id="inputGroupSelect01"
                                            onChange={(e) => {
                                                const newSize = parseInt(e.target.value);
                                                this.setState(prevState => {
                                                    prevState.widget.size = newSize;
                                                    return prevState
                                                })
                                            }}
                                            value={this.state.widget.size}>
                                        <option value={1}>Heading 1</option>
                                        <option value={2}>Heading 2</option>
                                        <option value={3}>Heading 3</option>
                                        <option value={4}>Heading 4</option>
                                        <option value={5}>Heading 5</option>
                                        <option value={6}>Heading 6</option>
                                    </select>
                                    <br/>
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
                                {this.props.widget.size === 1 && <h1>{this.props.widget.title}</h1>}
                                {this.props.widget.size === 2 && <h2>{this.props.widget.title}</h2>}
                                {this.props.widget.size === 3 && <h3>{this.props.widget.title}</h3>}
                                {this.props.widget.size === 4 && <h4>{this.props.widget.title}</h4>}
                                {this.props.widget.size === 5 && <h5>{this.props.widget.title}</h5>}
                                {this.props.widget.size === 6 && <h6>{this.props.widget.title}</h6>}

                                {this.state.text}


                            </div>
                            }
                        </div>
                }
            </div>
        )
    }
}

export default HeadingWidget
