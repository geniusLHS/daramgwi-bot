import moment from 'moment';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplySelect from './ApplySelect';
import LeftModal from './LeftModal';
import WeekdayApplyCheck from './WeekdayApplyCheck';
import WeekendApplyCheck from './WeekendApplyCheck';
import WeekendApplyCheckBatch from './WeekendApplyCheckBatch';
import WeekendApplyCheckDate from './WeekendApplyCheckDate';
import WeekendApplySelect from './WeekendApplySelect';

interface lProps {
  PHPSESSID: string;
  username: string;
  memberId: string;
}

const WeekendApplyList = [
  { time: 1, dcls_name: '오전' },
  { time: 2, dcls_name: '오후1' },
  { time: 3, dcls_name: '오후2' },
  { time: 4, dcls_name: '오후3' },
  { time: 5, dcls_name: '1자' },
  { time: 6, dcls_name: '2자' },
  { time: 7, dcls_name: '3자' },
];

function WeekendApplyModal({ PHPSESSID, username, memberId }: lProps) {
  let sdate = getSdate()[1]; // not used.

  const navigate = useNavigate();
  const [selectClass, setSelectClass] = useState(17);
  const [selectTime, setSelectTime] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]); // 첫번째꺼는 상관 없음. 1~7번만 사용함.
  const [allSelect, setAllSelect] = useState([false, false, false, false]);

  const [selectWeekend, setSelectWeekend] = useState([false, false, false]);
  // 토, 일 선택

  const [currentState, setCurrentState] = useState([
    [],
    ['', '...', '...', '...', '...', '...', '...', '...'],
    ['', '...', '...', '...', '...', '...', '...', '...'],
  ]);

  const [applyProgress, setApplyPregress] = useState(0);

  useEffect(() => {
    if (applyProgress == 1) {
      setCurrentState([
        [],
        ['', '...', '...', '...', '...', '...', '...', '...'],
        ['', '...', '...', '...', '...', '...', '...', '...'],
      ]);

      // weekend : 요일
      for (let weekend = 1; weekend <= 2; weekend++)
        for (let time = 1; time <= 7; time++) {
          if (selectWeekend[weekend] && selectTime[time]) {
            doSelfStudyApply(
              PHPSESSID,
              getClosestWeekend()[weekend],
              time,
              memberId,
              selectClass
            );
          }
        }
      setSelectTime([false, false, false, false, false, false, false, false]);
      setSelectWeekend([false, false, false]);
      setAllSelect([false, false, false, false]);

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
    console.log(resultRaw);
    // 토, 일 둘다.
    let ApplyState = [
      [],
      ['none', '1', '2', '3', '4', '5', '6', '7'],
      ['none', '1', '2', '3', '4', '5', '6', '7'],
    ];

    let col_name = [
      '',
      '오전자습',
      '오후자습1',
      '오후자습2',
      '오후자습3',
      '야간자습1',
      '야간자습2',
      '야간자습3',
    ];

    // i=1 토요일, i=2 일요일
    for (let i = 1; i <= 2; i++)
      for (let j = 1; j <= 7; j++) {
        let date = ' ';

        if (i == 1) date = '토요일';
        if (i == 2) date = '일요일';

        ApplyState[i][j] = resultRaw
          .split(date)[1]
          .split('신청일 전날 22시까지 신청이 완료되지 않을 경우')[1]
          .split(col_name[j])[1]
          .split('</td>')[1]
          .split('<td>')[1];
      }

    for (let i = 1; i <= 2; i++)
      for (let j = 1; j <= 7; j++)
        if (ApplyState[i][j].indexOf('text-danger') != -1) {
          ApplyState[i][j] = '-';
        }

    setCurrentState(ApplyState);
    // console.log(ApplyState);
    console.log(applyProgress);
  });

  return (
    <div className="WeekendApplyModal">
      <div className="title">주말 자습 신청</div>
      <WeekendApplyCheckDate
        PHPSESSID={PHPSESSID}
        sdate={sdate}
        selectWeekend={selectWeekend}
        setSelectWeekend={setSelectWeekend}
      />
      {[
        WeekendApplyList.slice(0, 1),
        WeekendApplyList.slice(1, 4),
        WeekendApplyList.slice(4, 7),
      ].map((it, idx) => (
        <WeekendApplyCheckBatch
          PHPSESSID={PHPSESSID}
          sdate={sdate}
          selectTime={selectTime}
          setSelectTime={setSelectTime}
          currentState={currentState}
          setCurrentState={setCurrentState}
          WeekendApplyList={it}
          allSelect={allSelect}
          setAllSelect={setAllSelect}
          order={idx + 1} // order : 1, 2, 3
        />
      ))}
      <WeekendApplySelect
        selectClass={selectClass}
        setSelectClass={setSelectClass}
        setApplyPregress={setApplyPregress}
      />
    </div>
  );
}

function getSdate() {
  let weekendDate = ['', '', ''];

  let today = moment();
  for (let i = 0; i <= 10; i++) {
    if (today.day() == 6 && weekendDate[1] == '')
      // 토요일
      weekendDate[1] = today.format('YYYY-MM-DD');
    if (today.day() == 0 && weekendDate[2] == '')
      // 일요일
      weekendDate[2] = today.format('YYYY-MM-DD');
    today = today.add(1, 'days');
  }

  return weekendDate;
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
