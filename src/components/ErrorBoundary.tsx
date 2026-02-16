import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, Text, Button } from '@tremor/react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Card className="h-full flex flex-col items-center justify-center p-6 bg-red-50 border-red-200">
          <AlertTriangle className="h-10 w-10 text-red-500 mb-4" />
          <Text className="text-red-700 font-medium mb-2">Widget failed to load</Text>
          <Button 
            variant="secondary" 
            color="red" 
            icon={RefreshCcw}
            onClick={this.handleRetry}
          >
            Retry
          </Button>
        </Card>
      );
    }

    return this.children;
  }
}

export default ErrorBoundary;
