import React, { useRef, useState, useMemo } from 'react';
import LeftModal from './LeftModal';
import WeekendApplyModal from './WeekendApplyModal';
import moment from 'moment';
import WeekendApplyModal_Sunday from './WeekendApplyModal_Sunday';

interface lProps {
  PHPSESSID: string;
  username: string;
  memberId: string;
}

function WeekendApply({ PHPSESSID, username, memberId }: lProps) {
  return (
    <div className="WeekendApply">
      <LeftModal PHPSESSID={PHPSESSID} username={username} />
      {isSunday() ? (
        <WeekendApplyModal_Sunday />
      ) : (
        <WeekendApplyModal
          PHPSESSID={PHPSESSID}
          username={username}
          memberId={memberId}
        />
      )}
    </div>
  );
}

function isSunday(): boolean {
  let day = moment().day();
  if (day == 0) return true;
  else return false;
}

export default WeekendApply;
