import React, { useRef, useState, useMemo, useEffect } from 'react';
import LeftModal from './LeftModal';
import WeekendApplyCheck from './WeekendApplyCheck';

interface lProps {
  PHPSESSID: string;
  sdate: string;
  selectTime: boolean[];
  setSelectTime: (selectTime: boolean[]) => void;
  currentState: string[][];
  setCurrentState: (currentState: string[][]) => void;
  WeekendApplyList: { time: number; dcls_name: string }[];
}

function WeekendApplyCheckBatch({
  PHPSESSID,
  sdate,
  selectTime,
  setSelectTime,
  currentState,
  setCurrentState,
  WeekendApplyList,
}: lProps) {
  let [allSelect, setAllSelect] = useState(false);
  let times = WeekendApplyList.map((it) => it.time);

  useEffect(() => {
    setSelectTime(
      selectTime.map((item, idx) => {
        if (times.indexOf(idx) != -1) {
          return allSelect;
        } else return item;
      })
    );
  }, [allSelect]);

  return (
    <div className="WeekendApplyCheckBatch">
      <div className="ApplyBatchState" onClick={() => setAllSelect(!allSelect)}>
        <div className="ApplyBatchStateChangeButton">
          {allSelect == true ? '✔' : ''}
        </div>
      </div>
      <div className="WeekendApplyCheckArea">
        {WeekendApplyList.map((it, idx) => (
          <WeekendApplyCheck
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
      </div>
    </div>
  );
}

export default WeekendApplyCheckBatch;
