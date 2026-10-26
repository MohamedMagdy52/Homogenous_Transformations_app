import {Component,ReactNode} from 'react';
export class AppBoundary extends Component<{children:ReactNode},{error:string|null}> {
  state:{error:string|null}={error:null};
  static getDerivedStateFromError(error:Error){return {error:error.message};}
  render(){return this.state.error?<div role="alert" style={{padding:32,color:'#dce7f6'}}><h2>The visualization encountered an error</h2><p>Please copy this message when reporting the problem:</p><pre style={{whiteSpace:'pre-wrap'}}>{this.state.error}</pre><button onClick={()=>this.setState({error:null})}>Restart visualization</button></div>:this.props.children;}
}
