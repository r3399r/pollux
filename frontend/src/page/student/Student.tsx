import { Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MyBank from './component/MyBank';
import MyExam from './component/MyExam';
import style from './Student.module.scss';

const Student = () => {
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
            <Tab label="我的題庫" />
            <Tab label="我的考卷" />
          </Tabs>
        </div>
      )}
      {value === 0 && <MyBank />}
      {value === 1 && <MyExam />}
    </>
  );
};

export default Student;
