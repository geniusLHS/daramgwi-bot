import React, { useRef, useState, useMemo } from 'react';
import LeftModal from './LeftModal';
import WeekdayApplyModal from './WeekdayApplyModal';

interface lProps {
  PHPSESSID: string;
  username: string;
  memberId: string;
}

function WeekdayApply({ PHPSESSID, username, memberId }: lProps) {
  return (
    <div className="WeekdayApply">
      <LeftModal PHPSESSID={PHPSESSID} username={username} />
      <WeekdayApplyModal
        PHPSESSID={PHPSESSID}
        username={username}
        memberId={memberId}
      />
    </div>
  );
}

export default WeekdayApply;
