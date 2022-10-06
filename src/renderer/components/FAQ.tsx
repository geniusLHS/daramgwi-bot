import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoingLogin from './DoingLogin';
import Login from './Login';
import Store from 'electron-store';
import QandA from './InformationItem';
import LeftModal from './LeftModal';
import InformationModal from './InformationModal';
import FAQModal from './FAQModal';

interface lProps {
  PHPSESSID: string;
  username: string;
  memberId: string;
}

function FAQ({ PHPSESSID, username, memberId }: lProps) {
  return (
    <div className="FAQ">
      <LeftModal PHPSESSID={PHPSESSID} username={username} />
      <FAQModal />
    </div>
  );
}

export default FAQ;
