import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoingLogin from './DoingLogin';
import Login from './Login';
import Store from 'electron-store';
import QandA from './InformationItem';
import LeftModal from './LeftModal';
import InformationModal from './InformationModal';

interface lProps {
  PHPSESSID: string;
  username: string;
  memberId: string;
}

function Information({ PHPSESSID, username, memberId }: lProps) {
  return (
    <div className="Information">
      <LeftModal PHPSESSID={PHPSESSID} username={username} />
      <InformationModal />
    </div>
  );
}

export default Information;
