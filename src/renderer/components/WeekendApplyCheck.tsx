import React, { useRef, useState, useMemo } from 'react';
import LeftModal from './LeftModal';

interface lProps {
  PHPSESSID: string;
  sdate: string;
  time: number;
  selectTime: boolean[];
  setSelectTime: (selectTime: boolean[]) => void;
  currentState: string[][];
  setCurrentState: (currentState: string[][]) => void;
  dcls_name: string;
}

function WeekendApplyCheck({
  PHPSESSID,
  sdate,
  time,
  selectTime,
  setSelectTime,
  currentState,
  setCurrentState,
  dcls_name,
}: lProps) {
  return (
    <div className="WeekendApplyCheck">
      <div
        className="ApplyState"
        onClick={() =>
          setSelectTime(
            selectTime.map((item, idx) => {
              if (idx == time) {
                return !item;
              } else {
                return item;
              }
            })
          )
        }
      >
        <div className="ApplyStateChangeButton" id={time.toString()}>
          {selectTime[time] == true ? '✔' : ''}
        </div>
      </div>
      <div className="dcls_name">{dcls_name}</div>
      <div className="CurrentStateSat">
        <div className="inner">{currentState[1][time]}</div>
      </div>
      <div className="CurrentStateSun">
        <div className="inner">{currentState[2][time]}</div>
      </div>
    </div>
  );
}

export default WeekendApplyCheck;
