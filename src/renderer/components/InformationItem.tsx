import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoingLogin from './DoingLogin';
import Login from './Login';
import Store from 'electron-store';

interface lProps {
  name: string;
  info: string;
}

function InformationItem({ name, info }: lProps) {
  return (
    <div className="InformationItem">
      <h1 className="name">{name}</h1>
      <h1 className="info">{info}</h1>
    </div>
  );
}

export default InformationItem;
