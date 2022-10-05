import moment from 'moment';
import React, { useRef, useState, useMemo } from 'react';

interface lProps {
  PHPSESSID: string;
  sdate: string;
  selectWeekend: boolean[];
  setSelectWeekend: (selectTime: boolean[]) => void;
}

function WeekendApplyCheckDate({
  PHPSESSID,
  sdate,
  selectWeekend,
  setSelectWeekend,
}: lProps) {
  return (
    <div className="WeekendApplyCheckDate">
      {[1, 2].map((idx) => (
        <div
          className="ApplyState"
          onClick={() =>
            setSelectWeekend(
              selectWeekend.map((item, idx2) => {
                if (idx2 == idx) {
                  return !item;
                } else {
                  return item;
                }
              })
            )
          }
        >
          {idx == 1 ? `토 (${getSdate()[1]})` : `일 (${getSdate()[2]})`}
          <div className="ApplyStateChangeButton" id={idx.toString()}>
            {selectWeekend[idx] == true ? '✔' : ''}
          </div>
        </div>
      ))}
    </div>
  );
}

function getSdate() {
  let weekendDate = ['', '', ''];

  let today = moment();
  for (let i = 0; i <= 10; i++) {
    if (today.day() == 6 && weekendDate[1] == '')
      // 토요일
      weekendDate[1] = today.format('MM/DD');
    if (today.day() == 0 && weekendDate[2] == '')
      // 일요일
      weekendDate[2] = today.format('MM/DD');
    today = today.add(1, 'days');
  }

  return weekendDate;
}

export default WeekendApplyCheckDate;
