import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Card from '../components/Card';
import Login from '../components/Login';
import styles from '../styles/Home.module.css';
import { actions } from '../redux/state-slice';

export type Data = {
  [key: string]: {
    name: string;
    students: string[];
  }
}

export default function Home() {
  const data: Data = useSelector((state: RootState) => state.data);
  const error: string = useSelector((state: RootState) => state.error);
  const loading: boolean = useSelector((state: RootState) => state.loading);
  const dispatch = useDispatch();

  const goBack = () => {
    dispatch(actions.setLoading(false));
    dispatch(actions.setError(''));
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>miniExtensions Coding Challenge</title>
        <meta name="description" content="miniExtensions Coding Challenge - Eng full-time hiring" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {
          loading ? 
            (
              error ?
                <div className={styles.error}>
                  <p>{error}</p>
                  <button type='button' onClick={goBack}>Go back</button>
                </div>
              :
                <p className={styles.loading}>Loading...</p>
            )
          :
            (
              Object.keys(data).length !== 0 ?
                <>
                  <p className={styles.logout}>
                    <button type='submit' onClick={() => dispatch(actions.setData({}))}>Logout</button>
                  </p>
                  {
                    Object.entries(data).map((item) => (
                      <Card key={item[0]} data={item[1]} />
                    ))
                  }
                </>
              :
                <Login />
            )
        }
      </main>
      
    </div>
  )
}
