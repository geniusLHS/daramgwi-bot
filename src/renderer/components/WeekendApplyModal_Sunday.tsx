import React, { useRef, useState, useMemo } from 'react';
import moment from 'moment';

function WeekendApplyModal_Sunday() {
  return (
    <div className="WeekendApplyModal_Sunday">
      <div className="title">주말 자습 신청 ({moment().format('MM/DD')})</div>
      <div className="icon_die"></div>
      <div className="describe">일요일에는 주말 자습 신청이 불가능합니다.</div>
    </div>
  );
}

export default WeekendApplyModal_Sunday;
