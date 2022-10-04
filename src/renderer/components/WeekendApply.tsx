import React, { useRef, useState, useMemo } from 'react';
import LeftModal from './LeftModal';
import WeekendApplyModal from './WeekendApplyModal';

interface lProps {
  PHPSESSID: string;
  username: string;
  memberId: string;
}

function WeekendApply({ PHPSESSID, username, memberId }: lProps) {
  return (
    <div className="WeekendApply">
      <LeftModal PHPSESSID={PHPSESSID} username={username} />
      {/* <WeekendApplyModal
        PHPSESSID={PHPSESSID}
        username={username}
        memberId={memberId}
      /> */}
      <div className="DevelopImpossibleAlert">
        주말이 더 이상 남지 않아서 개발 불가능
      </div>
    </div>
  );
}

export default WeekendApply;
