import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

interface lProps {
  PHPSESSID: string;
  username: string;
}

function LeftModal({ PHPSESSID, username }: lProps) {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(moment());

  let timer: any = null;
  useEffect(() => {
    timer = setInterval(() => {
      setCurrentTime(moment());
    }, 1000); // 1분마다 반복해줘도 충분함. 그런데 6시에 가까워지면 1초도 중요해지므로.. 1초 단위로 해놓겠음.
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="LeftModal">
      <div className="important">
        <div className="inner" id="name-and-point">
          <div className="name" style={{ fontWeight: 'bold' }}>
            {username}님
          </div>

          <div
            className="LogoutButton"
            onClick={() => {
              navigate('/');
            }}
          >
            로그아웃
          </div>

          <div className="remainingTime" style={{ color: '#E4D1B9' }}>
            {currentTime.format('HH시 mm분')}
          </div>
        </div>
      </div>
      <div className="navigates">
        <div className="navigate">
          <div
            className="inner"
            id="link-to-weekdayapply"
            onClick={() => navigate('/weekdayapply')}
          >
            평일 자습 신청
          </div>
        </div>
        <div className="navigate">
          <div
            className="inner"
            id="link-to-weekendapply"
            onClick={() => navigate('/weekendapply')}
          >
            주말 자습 신청
          </div>
        </div>
        <div className="navigate">
          <div
            className="inner"
            id="score"
            onClick={() => navigate('/checkscore')}
          >
            벌점 내역
          </div>
        </div>
        <div className="navigate2">
          <div
            className="inner2"
            id="score"
            onClick={() => navigate('/checkscore')}
          >
            info
          </div>
          <div
            className="inner2"
            id="score"
            onClick={() => navigate('/checkscore')}
          >
            FAQ
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftModal;
