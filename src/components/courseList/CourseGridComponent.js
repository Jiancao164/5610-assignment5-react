import React from 'react'
import CourseGridCardComponent from './CourseGridCardComponent'

const CourseGridComponent = ({courses, deleteCourse, editCourse, showEditor, saveCourse}) =>
	<div className="container-fluid">
		<div className="row">
			{
				courses.map(function(course, index) {
					return 	<CourseGridCardComponent
							key={course._id}
							deleteCourse={deleteCourse}
							editorCourse={editCourse}
							showEditor={showEditor}
                            saveCourse={saveCourse}
							course={course}/>

				})
			}
		</div>
	</div>

export default CourseGridComponent