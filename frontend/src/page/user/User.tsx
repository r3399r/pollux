import { useMemo } from 'react';
import { getUserId } from 'src/service/userService';

const User = () => {
  const userId = useMemo(() => getUserId(), []);

  return (
    <>
      <div>Hi! {userId}</div>
    </>
  );
};

export default User;
