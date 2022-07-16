import styles from '../styles/Card.module.css';

type CardProps = {
  data: {
    name: string;
    students: string[];
  }
}

export default function Card({ data }: CardProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Name</h2>
      <p>{data.name}</p>
      <h2 className={styles.title}>Students</h2>
      <p>
        {
          data.students.map((item, index, arr) => (
            <span key={index} className={styles.students}>
              {
                index !== arr.length - 1 ? `${item},` : item
              }
            </span>
          ))
        }
      </p>
    </div>
  )
}
