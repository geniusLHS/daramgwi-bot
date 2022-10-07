import moment from 'moment';
import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckScoreItem from './CheckScoreItem';

interface lProps {
  PHPSESSID: string;
  username: string;
  memberId: string;
}

function CheckScoreModal({ PHPSESSID, username, memberId }: lProps) {
  const [scoreList, setScoreList] = useState([
    // {
    //   date: '2022-06-24',
    //   content: '[여] 아침 체크 점호 지각 및 불참',
    //   point: '1',
    // },
    {
      date: '...',
      content: '로딩중',
      point: '...',
    },
  ]);
  const [totalScore, setTotalScore] = useState('...');

  window.electron.ipcRenderer.once('reply-getScoreList', (arg) => {
    // console.log(arg);
    let resultRaw = arg as string;

    let pTotal = resultRaw
      .split('<strong class="c_lrd">')[1]
      .split('</strong>')[0]
      .trim();

    // console.log(pTotal);
    let pList: { date: string; content: string; point: string }[] | null = [];
    let pListRawText = resultRaw
      .split(
        '<table class="table crrtSeatBoard rewardTable rewardTable3 v_m">'
      )[1]
      .split('</table>')[0];

    // console.log(pListRawText);
    // // console.log(resultRaw.split('내용 포인트 부과교사 ')[1]);
    // let result = '벌점 목록 ( 합계 ' + pTotal + '점 )\n';
    let year = moment().year();
    let month = moment().month();
    // console.log(pListRawText);
    let pListRaw: string[] = [''];

    // 1. 만약 y년이고 3월~12월인 경우
    // 'y-'으로만 split하면 된다.
    // 2. 만약 y년이고 1월~2월인 경우
    // '(y-1)-'으로 먼저 split한 뒤 첫번쨰 원소를 'y-'으로 split하는 과정을 거친다.

    if (month >= 3) {
      pListRaw = pListRawText.split(year.toString() + '-');
    } else if (month <= 2) {
      pListRaw = pListRawText.split((year - 1).toString() + '-');
      if (pListRaw.length > 0)
        pListRaw = pListRaw[0]
          .split(year.toString() + '-')
          .concat(pListRaw.slice(1));
    }

    for (let i = 1; i < pListRaw.length; i++) {
      let item = pListRaw[i];
      pList[i] = { date: '01-01', content: '새해', point: '-1' };
      pList[i].date = item.substring(0, 5);
      pList[i].content = item
        .split('<td class="text-left">')[1]
        .split('</td>')[0]
        .replaceAll('\t', '')
        .replaceAll('\n', '');
      pList[i].point = item
        .split('<td class="text-left">')[1]
        .split('<td>')[1]
        .split('</td>')[0]
        .replaceAll('\t', '')
        .replaceAll('\n', '');
    }
    // console.log(pList);
    setScoreList(pList);
    setTotalScore(pTotal);
  });

  useEffect(() => getScoreList(PHPSESSID, memberId), []);

  return (
    <div className="CheckScoreModal">
      <div className="title">벌점 내역 (총 {totalScore}점)</div>
      <div className="CheckScoreList">
        {scoreList.map((it, idx) => (
          <CheckScoreItem scoreItem={it} />
        ))}
      </div>
    </div>
  );
}

function getScoreList(PHPSESSID: string, memberId: string) {
  window.electron.ipcRenderer.sendMessage('getScoreList', [
    PHPSESSID,
    memberId,
  ]);
}

export default CheckScoreModal;
