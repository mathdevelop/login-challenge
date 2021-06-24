import React, { useState, useEffect } from 'react';
import './styles.scss';

export default function Alert(props) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  }, []);

  if(open)
    return <div className={'alert alert--' + props.type}>{ props.children }</div>;

  return null;
}