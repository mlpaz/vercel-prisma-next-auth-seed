"use client";
import React from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "react-feather";
import { ToastContext } from "../ToastProvider";
import styles from "./Toast.module.css";

export const NOTICE: string = "notice";
export const WARNING: string = "warning";
export const SUCCESS: string = "success";
export const ERROR: string = "error";

const ICONS_BY_VARIANT = new Map([
  [NOTICE, Info],
  [WARNING, AlertTriangle],
  [SUCCESS, CheckCircle],
  [ERROR, AlertOctagon],
]);

export interface IToast {
  id: string;
  children: React.ReactNode;
  variant: string;
}

function Toast({ id, variant, children }: IToast) {
  const { dismissToast }: any = React.useContext(ToastContext);
  const Icon = ICONS_BY_VARIANT.get(variant) || Info;

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>
      <p className={styles.content}>{children}</p>
      <button
        className={styles.closeButton}
        onClick={() => dismissToast(id)}
        aria-label="Dismiss message"
        aria-live="off"
      >
        <X size={24} />
      </button>
    </div>
  );
}

export default Toast;
