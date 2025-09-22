"use client";
import React, { useEffect, useState } from "react";
import { X, XCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";

type AlertType = "error" | "success" | "info" | "warning";

interface AlertPopupProps {
  type: AlertType;
  title: string;
  description?: string;
  onClose: () => void;
}

const icons = {
  error: <XCircle className="w-6 h-6 text-red-600" />,
  success: <CheckCircle2 className="w-6 h-6 text-green-600" />,
  info: <Info className="w-6 h-6 text-blue-600" />,
  warning: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
};

const AlertPopup: React.FC<AlertPopupProps> = ({
  type,
  title,
  description,
  onClose,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // active l’animation au montage
    setVisible(true);
  }, []);

  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 top-0 z-50 transition-all duration-200 ease-out ${
        visible ? "translate-y-4 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm w-[90vw] max-w-md p-4 flex items-start space-x-3">
        <div>{icons[type]}</div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 300); // attend la fin de l’anim
          }}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5"/>
        </button>
      </div>
    </div>
  );
};

export default AlertPopup;
