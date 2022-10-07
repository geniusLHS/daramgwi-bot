import React, { useRef, useState, useMemo } from 'react';
import LeftModal from './LeftModal';
import WeekendApplyModal from './WeekendApplyModal';
import moment from 'moment';

interface lProps {
  PHPSESSID: string;
  username: string;
  memberId: string;
}

function WeekendApply({ PHPSESSID, username, memberId }: lProps) {
  return (
    <div className="WeekendApply">
      <LeftModal PHPSESSID={PHPSESSID} username={username} />
      <WeekendApplyModal
        PHPSESSID={PHPSESSID}
        username={username}
        memberId={memberId}
      />
    </div>
  );
}

export default WeekendApply;
