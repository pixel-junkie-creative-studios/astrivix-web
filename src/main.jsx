import React, { Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class RootErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Root React Error Boundary caught error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      // Auto-retry reset after 1.5 seconds if transient error occurs
      setTimeout(() => {
        this.setState({ hasError: false, error: null });
      }, 1500);

      return (
        <div className="w-full min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-8 text-center">
          <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-white animate-spin mb-6" />
          <h1 className="text-xl font-mono tracking-widest uppercase mb-2">ASTRIVIX CORP</h1>
          <p className="text-white/40 text-xs font-mono tracking-wider">Optimizing experience...</p>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <RootErrorBoundary>
    <App />
  </RootErrorBoundary>
)
