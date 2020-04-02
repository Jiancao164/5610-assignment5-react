import React from 'react'

class CourseGridCardComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        active: false,
        course: this.props.course

    };
    editCourse = () => {
        this.setState(prevState => ({
            active: !prevState.active
        }))
    };

    updateForm = (event) => {
        this.setState({
            course: {
                ...this.props.course,
                title: event.target.value
            }
        })
    };
    render() {
        return (
            <div className={`card col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 `}>
                <div className={`card-body`}>
                    <div>
                        {!this.state.active &&
                        <a onClick={this.props.showEditor} href={"#"}>
                            {this.props.course.title}</a>
                        }
                        {this.state.active && <input onChange={this.updateForm} value={this.state.course.title}/>
                        }
                    </div>
                    <div>
                        Me
                    </div>
                    <div>
                        01/01/2020
                    </div>
                    <div>
                        {!this.state.active &&
                        <div className={"float-right"}>
                            <i onClick={() => this.editCourse()} className="fas fa-pen"/>
                            <i onClick={() => this.props.deleteCourse(this.props.course)} className="fas fa-trash"/>
                        </div>
                        }
                        {this.state.active &&
                        <div className={"float-right"}>
                            <i className="fas fa-check float-right"
                               onClick={() => this.props.saveCourse(this.state.course._id, this.state.course) && this.editCourse()}/>
                        </div>
                        }
                    </div>


                </div>
            </div>

            // <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
            //     {this.props.course.title}
            //     <button onClick={(event) => this.props.deleteCourse(this.props.course)}>Delete</button>
            // </div>

        )
    }
}
export default CourseGridCardComponent;