import React from "react";
import { Link } from "react-router-dom";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null, hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error,errorInfo)
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'80px'}}>
          <img style={{width:'64px',height:'64px'}} src={require('./error.png')} />
          <h3 style={{textAlign:"center",paddingTop:'10px'}}>出错了,哭....</h3>
          <a href='/movie' style={{paddingTop:'20px'}}>返回首页</a>
          {/* <details style={{ whiteSpace: "pre-wrap",margin:'10px',width:'100%' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            { this.state.errorInfo && this.state.errorInfo.componentStack}
          </details> */}
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
