import React from 'react'
import CourseRowComponentStateful from "./CourseRowComponentStateful";

const CourseTableComponent = ({showEditor, editCourse, deleteCourse, courses, saveCourse}) =>
    <div>
            <CourseRowComponentStateful
                saveCourse={saveCourse}
                showEditor={showEditor}
                editCourse={editCourse}
                deleteCourse={deleteCourse}
                courses={courses}/>
    </div>

export default CourseTableComponent
