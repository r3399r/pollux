import { useParams } from 'react-router-dom';

const BankDetail = () => {
  const params = useParams();

  return <div>{params.id}</div>;
};

export default BankDetail;
