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

const AlertPopup: React.FC<AlertPopupProps> = ({
  type,
  title,
  description,
  onClose,
}) => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    setVisible(true);
    
    // Auto-dismiss après 5 secondes pour success et info
    if (type === "success" || type === "info") {
      const duration = 5000;
      const interval = 50;
      const step = (interval / duration) * 100;
      
      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(progressTimer);
            handleClose();
            return 0;
          }
          return prev - step;
        });
      }, interval);
      
      return () => clearInterval(progressTimer);
    }
  }, [type]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 400);
  };

  const getAlertStyles = () => {
    const base = "relative overflow-hidden backdrop-blur-md";
    switch (type) {
      case "error":
        return `${base} bg-gradient-to-br from-red-50 to-red-100/80 border border-red-200/50 shadow-lg shadow-red-500/10`;
      case "success":
        return `${base} bg-gradient-to-br from-emerald-50 to-green-100/80 border border-emerald-200/50 shadow-lg shadow-emerald-500/10`;
      case "info":
        return `${base} bg-gradient-to-br from-blue-50 to-cyan-100/80 border border-blue-200/50 shadow-lg shadow-blue-500/10`;
      case "warning":
        return `${base} bg-gradient-to-br from-amber-50 to-orange-100/80 border border-amber-200/50 shadow-lg shadow-amber-500/10`;
      default:
        return `${base} bg-white border border-gray-200/50`;
    }
  };

  const getIconStyles = () => {
    switch (type) {
      case "error":
        return "text-red-500 bg-red-100/50 p-2 rounded-xl";
      case "success":
        return "text-emerald-500 bg-emerald-100/50 p-2 rounded-xl";
      case "info":
        return "text-blue-500 bg-blue-100/50 p-2 rounded-xl";
      case "warning":
        return "text-amber-500 bg-amber-100/50 p-2 rounded-xl";
      default:
        return "text-gray-500 bg-gray-100/50 p-2 rounded-xl";
    }
  };

  const getTextStyles = () => {
    switch (type) {
      case "error":
        return "text-red-900";
      case "success":
        return "text-emerald-900";
      case "info":
        return "text-blue-900";
      case "warning":
        return "text-amber-900";
      default:
        return "text-gray-900";
    }
  };

  const getProgressBarColor = () => {
    switch (type) {
      case "error":
        return "bg-red-400";
      case "success":
        return "bg-emerald-400";
      case "info":
        return "bg-blue-400";
      case "warning":
        return "bg-amber-400";
      default:
        return "bg-gray-400";
    }
  };

  const icons = {
    error: <XCircle className="w-6 h-6" />,
    success: <CheckCircle2 className="w-6 h-6" />,
    info: <Info className="w-6 h-6" />,
    warning: <AlertTriangle className="w-6 h-6" />,
  };

  return (
    <>
      {/* Backdrop overlay subtil */}
      <div className="fixed inset-0 z-40 pointer-events-none">
        <div 
          className={`absolute inset-0 transition-opacity duration-400 ${
            visible ? "opacity-5" : "opacity-0"
          } bg-black`}
        />
      </div>

      {/* Alert principale */}
      <div
        className={`fixed left-1/2 transform -translate-x-1/2 top-6 z-50 transition-all duration-100 ease-out ${
          visible 
            ? "translate-y-0 opacity-100 scale-100" 
            : "-translate-y-8 opacity-0 scale-95"
        }`}
      >
        <div
          className={`${getAlertStyles()} rounded-2xl w-[90vw] max-w-md min-h-[80px] flex items-start p-4 space-x-4`}
        >
          {/* Icône avec animation pulse pour les erreurs */}
          <div className={`${getIconStyles()} flex-shrink-0 ${type === 'error' ? 'animate-pulse' : ''}`}>
            {icons[type]}
          </div>

          {/* Contenu */}
          <div className="flex-1 min-w-0">
            <h4 className={`text-base font-bold ${getTextStyles()} leading-tight`}>
              {title}
            </h4>
            {description && (
              <p className={`text-sm mt-2 ${getTextStyles()} opacity-80 leading-relaxed`}>
                {description}
              </p>
            )}
          </div>

          {/* Bouton fermer avec hover élégant */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 hover:bg-white/60 rounded-lg p-1.5 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Barre de progression pour auto-dismiss */}
          {(type === "success" || type === "info") && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/5 rounded-b-2xl overflow-hidden">
              <div
                className={`h-full ${getProgressBarColor()} transition-all duration-75 ease-linear rounded-b-2xl`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Effet de brillance subtil */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>
      </div>
    </>
  );
};

export default AlertPopup;