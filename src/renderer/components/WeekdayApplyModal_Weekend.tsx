import React, { useRef, useState, useMemo } from 'react';
import moment from 'moment';

function WeekdayApplyModal_Weekend() {
  return (
    <div className="WeekdayApplyModal_Weekend">
      <div className="title">평일 자습 신청 ({moment().format('MM/DD')})</div>
      <div className="icon_die"></div>
      <div className="describe">주말에는 평일 자습 신청이 불가능합니다.</div>
    </div>
  );
}

export default WeekdayApplyModal_Weekend;
