import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoingLogin from './DoingLogin';
import Login from './Login';
import Store from 'electron-store';

interface lProps {
  Q: string;
  A: string;
}

function FAQItem({ Q, A }: lProps) {
  return (
    <div className="FAQItem">
      <h1 className="Q">{Q}</h1>
      <h1 className="A">{A}</h1>
    </div>
  );
}

export default FAQItem;
