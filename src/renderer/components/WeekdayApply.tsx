import React, { useRef, useState, useMemo } from 'react';
import LeftModal from './LeftModal';
import WeekdayApplyModal from './WeekdayApplyModal';
import moment from 'moment';
import WeekdayApplyModal_Weekend from './WeekdayApplyModal_Weekend';

interface lProps {
  PHPSESSID: string;
  username: string;
  memberId: string;
}

function WeekdayApply({ PHPSESSID, username, memberId }: lProps) {
  return (
    <div className="WeekdayApply">
      <LeftModal PHPSESSID={PHPSESSID} username={username} />
      {isWeekend() ? (
        <WeekdayApplyModal_Weekend />
      ) : (
        <WeekdayApplyModal
          PHPSESSID={PHPSESSID}
          username={username}
          memberId={memberId}
        />
      )}
    </div>
  );
}

function isWeekend(): boolean {
  let day = moment().day();
  if (day == 0 || day == 6) return true;
  else return false;
}

export default WeekdayApply;
