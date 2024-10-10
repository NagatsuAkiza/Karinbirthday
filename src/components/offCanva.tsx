"use client";

import React, { useState } from "react";

const OffcanvasBottom: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={onClose}>
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center">
              <h5 className="offcanvas-title">Offcanvas Bottom</h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close">
                &times; {/* Simbol untuk menutup */}
              </button>
            </div>
            <div className="offcanvas-body mt-2">
              <p>Your offcanvas content goes here...</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const App: React.FC = () => {
  const [isOffcanvasOpen, setOffcanvasOpen] = useState(false);

  const toggleOffcanvas = () => setOffcanvasOpen((prev) => !prev);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        type="button"
        onClick={toggleOffcanvas}>
        Toggle Bottom Offcanvas
      </button>

      <OffcanvasBottom isOpen={isOffcanvasOpen} onClose={() => setOffcanvasOpen(false)} />
    </div>
  );
};

export default App;
