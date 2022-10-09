import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoingLogin from './DoingLogin';
import Login from './Login';
import Store from 'electron-store';
import QandA from './InformationItem';
import LeftModal from './LeftModal';
import InformationItem from './InformationItem';
import moment from 'moment';

const informations = [
  { name: '프로그램 이름', info: 'Daramjwi Bot' },
  { name: '버전', info: '1.1' },
  { name: '개발자', info: '37기 이현서' },
  { name: 'License', info: 'MIT License' },
  { name: 'Build date', info: '2022-10-09' },
];

function InformationModal() {
  return (
    <div className="InformationModal">
      <div className="title">Information</div>
      <div className="InformationList">
        {informations.map((it, idx) => (
          <InformationItem name={it.name} info={it.info} key={idx} />
        ))}
      </div>
    </div>
  );
}

export default InformationModal;
