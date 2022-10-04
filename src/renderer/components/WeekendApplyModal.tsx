import moment from 'moment';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplySelect from './ApplySelect';
import LeftModal from './LeftModal';
import WeekdayApplyCheck from './WeekdayApplyCheck';

interface lProps {
  PHPSESSID: string;
  username: string;
  memberId: string;
}

const WeekendApplyList = [
  { time: 1, dcls_name: '오전' },
  { time: 2, dcls_name: '오후' },
  { time: 3, dcls_name: '야자' },
];

function WeekendApplyModal({ PHPSESSID, username, memberId }: lProps) {
  let sdate = getSdate();

  const navigate = useNavigate();
  const [selectClass, setSelectClass] = useState(17);
  const [selectTime, setSelectTime] = useState([false, false, false, false]); // 첫번째꺼는 상관 없음. 1,2,3번만 사용함
  const [currentState, setCurrentState] = useState(['', '...', '...', '...']);
  // setSelectClass(17); //too many rerender error? //리렌더 => 함수 다시 호출 => 리렌더.. 무한반복이라서 그럼
  const [applyProgress, setApplyPregress] = useState(0);

  useEffect(() => {
    if (applyProgress == 1) {
      setCurrentState(['', '...', '...', '...']);

      for (let time = 1; time <= 3; time++) {
        if (selectTime[time] == true) {
          doSelfStudyApply(
            PHPSESSID,
            getClosestWeekend(),
            time,
            memberId,
            selectClass
          );
        }
      }
      setSelectTime([false, false, false, false]);

      setTimeout(() => {
        getWeekendCurrentState(PHPSESSID);

        setApplyPregress(0);
      }, 1000);
    }
  }, [applyProgress]);

  useEffect(() => getWeekendCurrentState(PHPSESSID), []);

  window.electron.ipcRenderer.once('reply-doSelfStudyApply', (arg) => {
    // console.log(arg);
    // if (applyProgress == 1) {
    // getWeekendCurrentState(PHPSESSID);
    // }
    // navigate('/Weekendapply');
  });

  window.electron.ipcRenderer.once('reply-getWeekendCurrentState', (arg) => {
    let resultRaw = arg as string;

    let ApplyState = ['none', '1', '2', '3'];

    ApplyState[1] = resultRaw
      .split('야간자습1')[1]
      .split('</td>')[1]
      .split('<td>')[1];
    ApplyState[2] = resultRaw
      .split('야간자습2')[1]
      .split('</td>')[1]
      .split('<td>')[1];
    ApplyState[3] = resultRaw
      .split('야간자습3')[1]
      .split('</td>')[1]
      .split('<td>')[1];

    setCurrentState(ApplyState);
    // console.log(ApplyState);
    console.log(applyProgress);
  });

  return (
    <div className="WeekendApplyModal">
      <div className="title">평일 자습 신청</div>
      <div className="describe">
        <span className="selectState">신청 여부</span>{' '}
        <span className="currentState">현재 상태</span>
      </div>
      {WeekendApplyList.map((it, idx) => (
        <WeekdayApplyCheck
          PHPSESSID={PHPSESSID}
          sdate={sdate}
          time={it.time}
          selectTime={selectTime}
          setSelectTime={setSelectTime}
          currentState={currentState}
          setCurrentState={setCurrentState}
          dcls_name={it.dcls_name}
        />
      ))}
      <ApplySelect
        selectClass={selectClass}
        setSelectClass={setSelectClass}
        setApplyPregress={setApplyPregress}
      />
    </div>
  );
}

function getSdate() {
  //   const happyNewYear = new Date();
  //   const year = happyNewYear.getFullYear();
  //   const month = happyNewYear.getMonth() + 1;
  //   const date = happyNewYear.getDate();

  //   let sdate = `${year}-${month >= 10 ? month : '0' + month}-${
  //     date >= 10 ? date : '0' + date
  //   }`;
  return moment().format('YYYY-MM-DD');
}

function getClosestWeekend() {
  return getSdate();
}

function doSelfStudyApply(
  PHPSESSID: string,
  sdate: string,
  time: number,
  memberId: string,
  selectClass: number
) {
  let data = `sst=&sod=&sfl=&stx=&page=&sca=&token=&s_mb_2=&s_mb_3=&stx=&sdate=${sdate}&time=${time}&mb_id=${memberId}&dcls_name=&cls_idx=${selectClass}`; // dcls_name은 확인 안하는것 같음

  // console.log(data);
  window.electron.ipcRenderer.sendMessage('doSelfStudyApply', [
    PHPSESSID,
    data,
  ]);
}

function getWeekendCurrentState(PHPSESSID: string) {
  window.electron.ipcRenderer.sendMessage('getWeekendCurrentState', [
    PHPSESSID,
  ]);
}

export default WeekendApplyModal;
