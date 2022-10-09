import React, { useRef, useState, useEffect } from 'react';
import '../App.css';

interface lProps {
  setLoginProgress: (loginProgress: number) => void;
  inputId: string;
  setInputId: (inputId: string) => void;
  inputPw: string;
  setInputPw: (inputPw: string) => void;
}

function Login({
  setLoginProgress,
  inputId,
  setInputId,
  inputPw,
  setInputPw,
}: lProps) {
  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPw(e.target.value);
  };

  // login 버튼 클릭 이벤트
  const onClickLogin = () => {
    // console.log('click logi!!!!');
    setLoginProgress(1);
  };

  return (
    <div className="Login">
      <form>
        <div className="id">
          {/* <label htmlFor="input_id">ID : </label> */}
          <input
            type="text"
            name="input_id"
            value={inputId}
            onChange={handleInputId}
            placeholder="학번"
          />
        </div>
        <div className="pw">
          {/* <label htmlFor="input_pw">PW : </label> */}
          <input
            type="password"
            name="input_pw"
            value={inputPw}
            onChange={handleInputPw}
            style={{ fontFamily: 'serif' }}
            placeholder="비밀번호"
          />
        </div>
        <div className="btn">
          <button type="submit" onClick={onClickLogin}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
