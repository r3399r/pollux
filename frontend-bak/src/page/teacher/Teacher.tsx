import { Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MyBank from './component/MyBank';
import MyExam from './component/MyExam';
import MyQuestion from './component/MyQuestion';
import MyStudent from './component/MyStudent';
import style from './Teacher.module.scss';

const Teacher = () => {
  const [value, setValue] = useState<number>();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setValue(Number(searchParams.get('t')) ?? 0);
  }, []);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setSearchParams({ t: String(newValue) });
  };

  return (
    <>
      {value !== undefined && (
        <div className={style.tabs}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="我的題目" />
            <Tab label="我的學生" />
            <Tab label="我的題庫" />
            <Tab label="我的考卷" />
          </Tabs>
        </div>
      )}
      {value === 0 && <MyQuestion />}
      {value === 1 && <MyStudent />}
      {value === 2 && <MyBank />}
      {value === 3 && <MyExam />}
    </>
  );
};

export default Teacher;
