import useInput from '@hooks/useInput';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import { Header, Form, Label, Input, Button, LinkContainer, Error, Success } from './styles';

const SignUp = () => {
  const url = 'http://localhost:3095';
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [singUpSuccess, setSignUpSuccess] = useState(false);
  const { data, error, revalidate, mutate } = useSWR(`${url}/api/users`, fetcher);

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
      if (!mismatchError && nickname) {
        console.log('서버로 회원가입하기');
        setSignUpError('');
        setSignUpSuccess(false);
        axios
          .post('/api/users', {
            email,
            nickname,
            password,
          })
          .then((response) => {
            console.log(response);
            setSignUpSuccess(true);
          })
          .catch((error) => {
            console.log(error.response);
            setSignUpError(error.response.data);
          })
          .finally(() => {});
      }
    },
    [email, nickname, password, passwordCheck, mismatchError],
  );

  if (data === null) {
    return <div>로당중...</div>;
  }

  if (data) {
    return <Redirect to="/workspace/channel/" />;
  }
  return (
    <div id="container">
      <Header>Molack</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail}></Input>
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname}></Input>
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="passwrod" id="password" name="password" value={password} onChange={onChangePassword}></Input>
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="passwrod"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangepasswordCheck}
            ></Input>
          </div>
        </Label>
        {mismatchError && <Error>비밀번호가 일치하지 않습니다!</Error>}
        {!nickname && <Error>닉네임을 입력해주세요.</Error>}
        {signUpError && <Error>{signUpError}</Error>} {/*이미 사용중인 아이디입니다. -> {signUpError} */}
        {singUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login" href="/login">
          로그인 하러가기
        </Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
