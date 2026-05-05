import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  info?: ErrorInfo;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught error:", error, info);
    this.setState({ hasError: true, error, info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black text-white p-8">
          <div className="max-w-lg">
            <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
            <p className="mb-3">The application encountered an error during rendering.</p>
            <pre className="text-xs whitespace-pre-wrap bg-white/10 p-3 rounded">
              {this.state.error?.message}
            </pre>
            <p className="mt-3 text-xs opacity-70">Check the browser console for more details.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
