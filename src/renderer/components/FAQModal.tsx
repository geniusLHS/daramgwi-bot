import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoingLogin from './DoingLogin';
import Login from './Login';
import Store from 'electron-store';
import QandA from './InformationItem';
import LeftModal from './LeftModal';
import InformationItem from './InformationItem';
import FAQItem from './FAQItem';

const FAQs = [
  {
    Q: '자습 신청 및 벌점 내역 페이지에서 현재 상태가 업데이트 되지 않습니다.',
    A: '세션이 만료된 것일 수 있으니, 로그아웃 뒤 다시 로그인 해주세요.',
  },
  {
    Q: '자습 신청 페이지에서 신청 칸에 아무것도 적혀있지 않습니다.',
    A: '다람쥐봇은 학생 현황 관리 시스템의 정보를 그대로 보여주는 역할을 합니다. 만약 그 곳에 아무 정보가 없다면, 다람쥐봇에서도 볼 수 없습니다.',
  },
  {
    Q: '입력한 학번과 비밀번호를 개발자가 알 수 있나요?',
    A: '알 수 없습니다.',
  },
  {
    Q: '소스코드를 볼 수 있나요?',
    A: '다람쥐봇의 소스코드는 github에 공개되어 있습니다.\nhttps://github.com/geniusLHS/daramgwi-bot',
  },
  {
    Q: '공휴일 자습 신청은 어떻게 하나요?',
    A: '2022년에는 한글날 대체공휴일 (10/10) 이후로 공휴일이 더 이상 남아있지 않아서 구현하지 않았습니다.',
  },
  {
    Q: '자습 신청시 잔여 카운트(남은 사람 수)는 알 수 없나요?',
    A: '잔여 카운트 조회 기능은 대부분의 경우 의미가 없다고 생각되어 구현하지 않았습니다. 남은 자리가 없을 경우에 신청 시도는 실패할 것이므로, 이를 통해 남은 자리가 없다는 것을 알 수 있습니다.',
  },
  {
    Q: '아이디와 비밀번호를 저장하여 자동 입력할 수 있나요?',
    A: '기술 상의 문제로 구현하지 못했습니다.',
  },
];

function FAQModal() {
  return (
    <div className="FAQModal">
      <div className="title">FAQ</div>
      <div className="FAQList">
        {FAQs.map((it, idx) => (
          <FAQItem Q={it.Q} A={it.A} key={idx} />
        ))}
      </div>
    </div>
  );
}

export default FAQModal;
