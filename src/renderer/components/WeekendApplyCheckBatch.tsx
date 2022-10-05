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
  allSelect: boolean[];
  setAllSelect: (allSelect: boolean[]) => void;
  order: number;
}

function WeekendApplyCheckBatch({
  PHPSESSID,
  sdate,
  selectTime,
  setSelectTime,
  currentState,
  setCurrentState,
  WeekendApplyList,
  allSelect,
  setAllSelect,
  order,
}: lProps) {
  let times = WeekendApplyList.map((it) => it.time);

  // 문제의 코드.. 생각대로 작동하지 않는다.
  // 원하는것 :
  // 3개다 켜져 있을 경우 all도 켜짐.
  // 하나라도 꺼지면 all도 꺼짐.
  // all을 누르면 세개 모두 켜짐.
  // (3개인 상태에서 all눌르면 세개 다 꺼짐.

  const changeAllSelect = (booleanValue: boolean) => {
    // 모든 select를 바꾼다는 뜻이 아니라, allselect를 바꾼다는 뜻.
    console.log(allSelect, 'before', booleanValue, 'b');
    let changedAllSelect = allSelect.map((it, idx) => {
      if (idx == order) {
        return booleanValue;
      } else return it;
    });
    setAllSelect(changedAllSelect);
    console.log(changedAllSelect, 'after');
  };

  const changeSelectTime = (time: number, booleanValue: boolean) => {
    let changedSelectTime = selectTime.map((it, idx) => {
      if (idx == time) {
        return booleanValue;
      } else return it;
    });
    setSelectTime(changedSelectTime);
  };

  const changeEverySelectTime = (booleanValue: boolean) => {
    // 모든 selectTime을 바꾼다.
    setSelectTime(
      selectTime.map((item, idx) => {
        if (times.indexOf(idx) != -1) {
          return booleanValue;
        } else return item;
      })
    );
  };

  //   useEffect(() => {
  //     if (allSelect[order] == true) {
  //       changeEverySelectTime(true);
  //     }
  //     if (allSelect[order] == false) {
  //       let numberOfFalse = selectTime.filter((item, idx) => {
  //         if (times.indexOf(idx) != -1 && item == false) return true;
  //         else return false;
  //       }).length;
  //       if (numberOfFalse == 0) {
  //         console.log(allSelect, 'before2');
  //         changeAllSelect(order, false);
  //         changeEverySelectTime(false);
  //         console.log(allSelect, 'after2');
  //       }
  //     }
  //   }, [allSelect[order]]);

  const pushAllSelect = () => {
    console.log(allSelect[order]);
    if (allSelect[order] == false) {
      changeEverySelectTime(true);
      changeAllSelect(!allSelect[order]);
    } else if (allSelect[order] == true) {
      let numberOfFalse = selectTime.filter((item, idx) => {
        if (times.indexOf(idx) != -1 && item == false) return true;
        else return false;
      }).length;
      if (numberOfFalse == 0) {
        console.log(allSelect, 'before2');
        changeAllSelect(false);
        changeEverySelectTime(false);
        console.log(allSelect, 'after2');
      }
      changeAllSelect(!allSelect[order]);
    }
  };

  const pushSelectTime = (time: number) => {
    let numberOfFalse = selectTime.filter((item, idx) => {
      if (times.indexOf(idx) != -1 && item == false) return true;
      else return false;
    }).length;

    if (selectTime[time] == false) {
      if (numberOfFalse == 1) changeAllSelect(true);
      changeSelectTime(time, true);
    }

    if (selectTime[time] == true) {
      changeAllSelect(false);
      changeSelectTime(time, false);
    }
  };

  //   useEffect(() => {
  //     let numberOfFalse = selectTime.filter((item, idx) => {
  //       if (times.indexOf(idx) != -1 && item == false) return true;
  //       else return false;
  //     }).length;
  //     console.log(order, numberOfFalse);

  //     if (numberOfFalse >= 1) changeAllSelect(order, false);
  //     else if (numberOfFalse == 0) {
  //       changeAllSelect(order, true);
  //       console.log(allSelect, selectTime);
  //     }
  //   }, [selectTime]);

  //   const handleAllSelect = () => {
  //     let numberOfFalse = selectTime.filter((item, idx) => {
  //       if (times.indexOf(idx) != -1 && item == false) return true;
  //       else return false;
  //     }).length;

  //     if (numberOfFalse >= 1) allSelect[order] = false;
  //     else allSelect[order] = true;
  //   };

  return (
    <div className="WeekendApplyCheckBatch">
      <div
        className="ApplyBatchState"
        onClick={() => {
          pushAllSelect();
        }}
      >
        <div className="ApplyBatchStateChangeButton">
          {allSelect[order] == true ? '✔' : ''}
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
            pushSelectTime={pushSelectTime}
          />
        ))}
      </div>
    </div>
  );
}

export default WeekendApplyCheckBatch;
