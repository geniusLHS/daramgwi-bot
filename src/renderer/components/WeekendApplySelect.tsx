import React, { useRef, useState, useMemo } from 'react';
import LeftModal from './LeftModal';

interface lProps {
  selectClass: number;
  setSelectClass: (setlectClass: number) => void;
  setApplyPregress: (applyProgress: number) => void;
}

const classList = [
  { className: '대강당', classNumber: 18 },
  { className: '2-1교실', classNumber: 100 },
  { className: '2-2교실', classNumber: 99 },
  { className: '2-3교실', classNumber: 98 },
  { className: '2-4교실', classNumber: 97 },
  { className: '그룹스터디룸1(506)', classNumber: 96 },
  { className: '그룹스터디룸2(505)', classNumber: 95 },
  { className: '그룹스터디룸3(504)', classNumber: 94 },
  { className: '그룹스터디룸4(503)', classNumber: 93 },
  { className: '일반지구과학실험실(602)', classNumber: 102 },
  { className: '천문학실험실(707)', classNumber: 106 },
  { className: '기숙사호실', classNumber: 20 },
  { className: '시청각실', classNumber: 19 },
  { className: '여명스토리(108)', classNumber: 56 },
  { className: '음악실1(101)', classNumber: 53 },
  { className: '음악실2(102)', classNumber: 54 },
  { className: '1-1교실', classNumber: 60 },
  { className: '1-2교실', classNumber: 61 },
  { className: '1-3교실', classNumber: 62 },
  { className: '1-4교실', classNumber: 63 },
  { className: '1-5교실', classNumber: 64 },
  { className: '1-6교실', classNumber: 65 },
  { className: '다목적강의실(204)', classNumber: 59 },
  { className: '미술실(203)', classNumber: 58 },
  { className: '체육관', classNumber: 113 },
  { className: '세미나실1', classNumber: 67 },
  { className: '세미나실2', classNumber: 68 },
  { className: '세미나실3', classNumber: 69 },
  { className: '세미나실4', classNumber: 70 },
  { className: '세미나실5', classNumber: 71 },
  { className: '세미나실6', classNumber: 72 },
  { className: '오픈스터디룸', classNumber: 73 },
  { className: '온라인스터디룸', classNumber: 74 },
  { className: '독서실', classNumber: 17 },
  { className: '3-1교실', classNumber: 114 },
  { className: '3-2교실', classNumber: 115 },
  { className: '3-3교실', classNumber: 117 },
  { className: '3-4교실', classNumber: 116 },
  { className: '3-5교실', classNumber: 118 },
  { className: '3-6교실(베이징)', classNumber: 123 },
  { className: '2-5교실(집현전)', classNumber: 125 },
  { className: '2-6교실(훈민정음)', classNumber: 126 },
];

function WeekendApplySelect({
  selectClass,
  setSelectClass,
  setApplyPregress,
}: lProps) {
  return (
    <div className="WeekendApplySelect">
      <select
        className="selectClass"
        onChange={(e) => {
          // console.log(e.target.value);
          setSelectClass(Number(e.target.value));
        }}
      >
        {classList.map((it) => (
          <option
            key={it.classNumber}
            value={it.classNumber}
            selected={selectClass == it.classNumber}
          >
            {it.className}
          </option>
        ))}
      </select>
      <div className="Buttons">
        <div className="div-WeekendApplyButton">
          <button
            className="WeekendApplyButton"
            onClick={() => {
              setApplyPregress(1);
            }}
          >
            신청
          </button>
        </div>
        <div className="div-WeekendApplyButton2">
          <button
            className="WeekendApplyButton2"
            onClick={() => {
              setSelectClass(20);
              setApplyPregress(1);
            }}
          >
            호실 신청
          </button>
        </div>
      </div>
    </div>
  );
}

export default WeekendApplySelect;
