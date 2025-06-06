
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  sectionName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ContentErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Content Error Boundary caught an error:', error, errorInfo);
    console.error('Section:', this.props.sectionName);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-8 text-center bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Content Loading Error</h2>
          <p className="text-red-600">
            Something went wrong loading this section{this.props.sectionName && `: ${this.props.sectionName}`}.
          </p>
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-red-700 font-medium">Error Details</summary>
            <pre className="mt-2 text-sm bg-red-100 p-2 rounded overflow-auto">
              {this.state.error?.toString()}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ContentErrorBoundary;
