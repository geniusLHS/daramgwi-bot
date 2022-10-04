import React, { useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface lProps {
  scoreItem: { date: string; content: string; point: string };
}

function CheckScoreItem({ scoreItem }: lProps) {
  return (
    <div className="CheckScoreItem">
      <span className="date">{scoreItem.date}</span>
      <span className="content">{scoreItem.content}</span>
      <span className="point">{scoreItem.point}점</span>
    </div>
  );
}

export default CheckScoreItem;
