import useInput from '@hooks/useInput';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { Form, Error, Label, Input, LinkContainer, Button, Header, Success } from './styles';
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const SignUp = () => {
  const { data, error } = useSWR('http://localhost:3095/api/users', fetcher); // 혹시나 로그인한 상태에서 회원가입 페이지에 정보(접속) 들어가면 메인페이지로 되돌려줘야한다.
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, , setPassword] = useInput('');
  const [passwordCheck, , setPasswordCheck] = useInput('');
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [singUpSuccess, setSignUpSuccess] = useState(false);

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );

  const onChangepasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(email, nickname, password, passwordCheck);
      if (!mismatchError && nickname) {
        console.log('서버로 회원가입하기');

        setSignUpError(''); // 로딩 단계 - state 비동기(요청)에 관련해서 state변경해주는게 있으면 요청 보내기 직전에 초기화 해주기
        setSignUpSuccess(false);
        axios
          .post('http://localhost:3095/api/users', {
            email,
            nickname,
            password,
          })
          .then((response) => {
            // 성공 단계
            console.log(response);
            setSignUpSuccess(true);
          }) // 성공
          .catch((error) => {
            // 실패 단계
            console.log(error.response);
            setSignUpError(error.response.data); // network - response 내용 읽어오기 (data)
          }) // 실패
          .finally(() => {}); // 성공을 하든 실패를 하든 무조건 실행 (공통)
      }
    },
    [email, nickname, password, passwordCheck, mismatchError],
  );

  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  if (data) {
    // 혹여나 return같은 거는 반드시 hooks 보다 아래에 있어야 한다.
    // 혹시나 로그인한 상태에서 회원가입 페이지에 정보(접속) 들어가면 메인페이지로 되돌려줘야한다. ()
    return <Redirect to="/workspace/sleact/channel/일반" />;
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangepasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다!</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>{signUpError}</Error>} {/*이미 사용중인 아이디입니다. -> {signUpError} */}
          {singUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login" href="/login">
          로그인 하러가기
        </Link>{' '}
        // a로하면 새로고침되고 Link는 유지하면서 새로고침없이 변경된다.
      </LinkContainer>
    </div>
  );
};

export default SignUp;
