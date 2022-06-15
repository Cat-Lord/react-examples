import React from 'react';
import { useStoreSelector } from '../redux/reduxHooks';
import type { Course } from '../types/index';
import AddCourse from './AddCourse';

const CoursePage: React.FC = () => {
  const { courses } = useStoreSelector((store) => store.courses);

  let coursesElement: JSX.Element;
  if (courses.length === 0)
    coursesElement = <h3>No courses found</h3>;
  else
    coursesElement = courses.map((course: Course) => {
      return (
        <h2 key={course.title}>{course.title}</h2>
      );
    });

  return (
    <main>
      <div>
        <h1>Courses</h1>

        <AddCourse />
      </div>
      <section>
        {
          coursesElement
        }
      </section>
    </main>
  );
};

export default CoursePage;