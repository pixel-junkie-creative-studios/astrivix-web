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
      return (
        <div className="w-full min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-2xl font-mono tracking-widest uppercase mb-4">ASTRIVIX CORP</h1>
          <p className="text-white/60 text-sm max-w-md mb-6 leading-relaxed">
            {this.state.error?.message || "An unexpected rendering glitch occurred."}
          </p>
          <button 
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }} 
            className="px-6 py-3 bg-white text-black font-bold text-xs tracking-widest uppercase rounded-full hover:bg-zinc-200 transition-colors"
          >
            Reset Experience
          </button>
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
