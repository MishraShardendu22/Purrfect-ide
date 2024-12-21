"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useUser } from '@clerk/nextjs'
import React from 'react'
import { useCodeEditorStore } from '../store/useCodeEditor';

const RunButton = () => {
  const { user } = useUser();
  const { runCode, language, isRunning } = useCodeEditorStore();

  const handleRunCode = () => {
    if (!isRunning) {
      runCode();
    }
  };

  return (
    <div>
      <button 
        onClick={handleRunCode} 
        disabled={isRunning}
      >
        {isRunning ? 'Running...' : 'Run Code'}
      </button>
    </div>
  )
}

export default RunButton;
