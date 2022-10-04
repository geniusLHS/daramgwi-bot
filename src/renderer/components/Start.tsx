import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoingLogin from './DoingLogin';
import Login from './Login';
import Store from 'electron-store';

// 로그인을 하는 시작 페이지

interface lProps {
  PHPSESSID: string;
  setPHPSESSID: (PHPSESSID: string) => void;
  username: string;
  setUsername: (username: string) => void;
  memberId: string;
  setMemberId: (memberId: string) => void;
}

function Start({
  PHPSESSID,
  setPHPSESSID,
  username,
  setUsername,
  memberId,
  setMemberId,
}: lProps) {
  const navigate = useNavigate();
  const [loginProgress, setLoginProgress] = useState(0);
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');
  // const store = new Store();

  // let storedId = store.get('storedId');
  // let storedPw = store.get('storedPw');
  // if (typeof storedId === 'string' && typeof storedPw === 'string') {
  //   setInputId(storedId);
  //   setInputPw(storedPw);
  //   setLoginProgress(1);
  // }

  window.electron.ipcRenderer.once('reply-getPHPSESSID', (arg) => {
    if ((arg as string[])[0] == 'ConnectFailed') {
      setInputId('');
      setInputPw('');
      setLoginProgress(0);
    } else {
      setPHPSESSID((arg as string[])[0]);
      console.log(PHPSESSID);
      setLoginProgress(2);
    }
  });

  window.electron.ipcRenderer.once('reply-getContent', (arg) => {
    let maybe_username, maybe_memberId;
    try {
      maybe_username = (arg as string).split('님 /')[0].slice(-3).trim();
      maybe_memberId = (arg as string)
        .split('<p class="mb-none">')[1]
        .slice(30, 39)
        .trim();
    } catch (error) {
      maybe_username = 'LoginFailed';
    }
    if (maybe_username == '') maybe_username = 'LoginFailed';
    setUsername(maybe_username as string);
    setMemberId(maybe_memberId as string);

    //만약 로그인 실패했으면 loginProgress를 0으로 초기화, 성공했으면 다음 페이지로
    if (maybe_username == 'LoginFailed') {
      setInputId('');
      setInputPw('');
      setLoginProgress(0); // 다시 로그인 화면으로 돌아올 수도 있으므로, 0으로 초기화 해놓고 씬을 옮긴다.
    } else navigate('/weekdayapply');
  });

  useEffect(() => {
    if (loginProgress == 1) {
      getPHPSESSID(inputId, inputPw);
    } else if (loginProgress == 2) {
      getContent(PHPSESSID);
    }
  }, [loginProgress]);

  return (
    <div className="Start">
      <h1 className="title" style={{ fontFamily: 'Merriweather, serif' }}>
        Daramjwi Bot
      </h1>
      <h5 className="subtitle"> 대전과학고등학교 간편 자습 신청 프로그램 </h5>
      {loginProgress == 0 ? (
        <Login
          setLoginProgress={setLoginProgress}
          setInputId={setInputId}
          inputId={inputId}
          setInputPw={setInputPw}
          inputPw={inputPw}
        />
      ) : (
        <DoingLogin />
      )}
      <span className="description">
        <span style={{ fontSize: '15px' }}>ver. Beta</span>
        <br />
        made by geniusLHS
      </span>
    </div>
  );
}

async function getPHPSESSID(inputId: string, inputPw: string) {
  // 아이디와 비밀번호를 받아서 로그인 시도를 한 뒤 세션아이디를 반환
  let data = `url=https%3A%2F%2Fdjshs.kr%3A443&mb_id=${inputId}&mb_password=${inputPw}`;

  window.electron.ipcRenderer.sendMessage('getPHPSESSID', [data]);
}

async function getContent(PHPSESSID: string) {
  // 받은 세션 아이디로 이름을 얻음

  // let data = `PHPSESSID=${PHPSESSID};Path=/;HttpOnly`;
  let data = `${PHPSESSID}`;

  window.electron.ipcRenderer.sendMessage('getContent', [data]);
}
export default Start;
