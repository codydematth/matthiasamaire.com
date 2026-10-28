'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import styles from './city.module.css';

export default function CityDialog({ children, onClose, labelledBy }: {
  children: ReactNode;
  onClose: () => void;
  labelledBy: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current!;
    element.showModal();
    return () => element.close();
  }, []);
  return <dialog ref={dialog} className={styles.scrim} aria-labelledby={labelledBy}
    onCancel={onClose}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    {children}
  </dialog>;
}
