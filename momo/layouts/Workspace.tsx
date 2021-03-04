import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { FC, useCallback } from 'react';
import { Redirect } from 'react-router';
import useSWR, { mutate } from 'swr';

// props.children = FC , 아닌경우는 VFC
const Workspace: FC = ({ children }) => {
  // 만약에 같은 주소인데 2가지의 fetcher를 쓰고싶을 때 요청도 보내면서 fetcher를 다르게 쓰고싶으면 뒤에다가 ? 쿼리스트링 또는 #123 붙이면 데이터는 다르게 저장한다.'http://localhost:3095/api/users#123'
  const { data, error, revalidate, mutate } = useSWR('http://localhost:3095/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        mutate(false, false); // { data } false
        // revalidate();
      });
  }, []);

  if (!data) {
    // 로그아웃하는 순간 data는 false로 변경된다.
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
