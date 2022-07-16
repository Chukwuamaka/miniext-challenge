import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../redux/state-slice';
import { listStudentClasses } from '../services/listclasses.service';
import { listStudentClassmates } from '../services/listclassmates.service';
import { getStudentDetails } from '../services/login.service';
import { RootState } from '../redux/store';
import { Data } from '../pages';
import styles from '../styles/Login.module.css';

type ClassRecord = {
  id: string;
  fields: {
    Name: string;
    Students: string[];
  };
}

type StudentRecord = {
  id: string;
  fields: {
    Name: string;
    Classes: string[];
  };
}

export default function Login() {
  const student: string = useSelector((state: RootState) => state.student);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setStudent(e.target.value))
  }

  const handleLogin = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(actions.setLoading(true))
    try {
      // Capitalize the first letter of user's input to match student records on Airtable
      const firstLetter = student.charAt(0);
      // Fetch records of student provided by the user
      const studentRes = await getStudentDetails(student.replace(firstLetter, firstLetter.toUpperCase()));
      const studentDetails = await studentRes.json();
      // Fetch the records of the classes the student belongs to by using a formula obtained from the record ids of the classes
      const classIds = studentDetails.records.length === 0 ? dispatch(actions.setError('This student does not exist')) : studentDetails.records[0].fields.Classes;
      const classIdFormula = classIds.map((id: string) => `RECORD_ID()%3D'${id}'`).join('%2C');
      const classesRes = await listStudentClasses(classIdFormula);
      const classes = await classesRes.json();
      // Retrieve the ids of the classmates of the student
      let studentIds: string[] = [];
      classes.records.forEach((record: ClassRecord) => {
        studentIds = [...studentIds, ...record.fields.Students]
      });
      // Retrieve the records of the classmates of the student
      const classmateIds = new Set(studentIds);
      const classmateIdFormula = Array.from(classmateIds).map(id => `RECORD_ID()%3D'${id}'`).join('%2C');
      const classmatesRes = await listStudentClassmates(classmateIdFormula);
      const classmates = await classmatesRes.json();
      // Clone the data state and populate it with the details (name of class and students) of each class that the student belongs
      let dataClone: Data = {};
      classes.records.forEach((record: ClassRecord) => {
        dataClone = {...dataClone, [record.id]: {
          name: record.fields.Name,
          students: []
        }}
      });
      classmates.records.forEach((record: StudentRecord) => {
        record.fields.Classes.forEach((classId: string) => {
          if (dataClone[classId]) {
            dataClone[classId].students = [...dataClone[classId].students, record.fields.Name]
          }
        })
      })
      dispatch(actions.setData(dataClone));
      dispatch(actions.setLoading(false));
    }
    catch (error) {
      console.error(error);
    }

  }

  return (
    <form className={styles.form} onSubmit={handleLogin}>
      <p>
          <span className={styles.description}>Student&apos;s Name: </span>
          <input type="text" name="name" onChange={handleChange} />
      </p>
      <button type='submit'>Login</button>
    </form>
  )
}
