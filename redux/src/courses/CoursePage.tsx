import React from 'react';
import { Form, FormLabel } from 'react-bootstrap';

type CoursePageProps = {

};

const CoursePage: React.FC<CoursePageProps> = (props) => {
  return (
    <Form onSubmit={(e: any) => console.log(e)}>
      <FormLabel htmlFor="submit-input">Add Course</FormLabel>
      <input name="submit-input" type="submit" value="Save" />
    </Form>
  );
};

export default CoursePage;