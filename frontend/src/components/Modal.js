import React from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';

export const Modal = () => {
  const { isModalOpen, modalData, closeModal } = useStore(
    (state) => ({
      isModalOpen: state.isModalOpen,
      modalData: state.modalData,
      closeModal: state.closeModal,
    }),
    shallow
  );

  if (!isModalOpen || !modalData) return null;

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <div className="modal-header">
          <h2>Pipeline Analysis</h2>
          <button className="modal-close-btn" onClick={closeModal}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-stat">
            <span className="modal-stat-label">Nodes</span>
            <span className="modal-stat-value">{modalData.num_nodes}</span>
          </div>
          <div className="modal-stat">
            <span className="modal-stat-label">Edges</span>
            <span className="modal-stat-value">{modalData.num_edges}</span>
          </div>
          <div className="modal-stat">
            <span className="modal-stat-label">Is DAG</span>
            <span className="modal-stat-value">
              {modalData.is_dag ? (
                <div className="dag-status success">
                  <CheckCircle size={18} /> Yes
                </div>
              ) : (
                <div className="dag-status error">
                  <XCircle size={18} /> No
                </div>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
