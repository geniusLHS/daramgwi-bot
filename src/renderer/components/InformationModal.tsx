import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoingLogin from './DoingLogin';
import Login from './Login';
import Store from 'electron-store';
import QandA from './InformationItem';
import LeftModal from './LeftModal';
import InformationItem from './InformationItem';

const informations = [
  { name: '프로그램 이름', info: 'Daramjwi Bot' },
  { name: '버전', info: '1.0' },
  { name: '개발자', info: '37기 이현서' },
  { name: '개발에 사용된 도구', info: 'React + electron' },
  { name: 'License', info: 'MIT License' },
  { name: '마지막 빌드일', info: '2020-10-??' },
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
