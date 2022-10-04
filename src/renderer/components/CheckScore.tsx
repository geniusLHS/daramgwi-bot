import React, { useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckScoreModal from './CheckScoreModal';
import LeftModal from './LeftModal';

interface lProps {
  PHPSESSID: string;
  username: string;
  memberId: string;
}

function CheckScore({ PHPSESSID, username, memberId }: lProps) {
  return (
    <div className="CheckScore">
      <LeftModal PHPSESSID={PHPSESSID} username={username} />
      <CheckScoreModal
        PHPSESSID={PHPSESSID}
        username={username}
        memberId={memberId}
      />
    </div>
  );
}

export default CheckScore;
