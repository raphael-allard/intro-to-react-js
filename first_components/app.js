function WelcomeFunc ({name, children}) {
  return <h1>{name}: {children}</h1>;
};

class Welcome extends React.Component {
  render() {
    return <h1>{this.props.name}: {this.props.children}</h1>
  }
};

class Clock extends React.Component {
  constructor (props) {
    super(props);
    this.state = {date: new Date()};
    this.timer = null;
  }

  componentDidMount () {
    window.setInterval((this.tick.bind(this)), 1000);
  }

  componentWillUnmount () {
    window.clearInterval(this.timer);
  }

  tick () {
    this.setState({date: new Date()});
  }

  render () {
    return <div>
             Il est {this.state.date.toLocaleTimeString()}, le {this.state.date.toLocaleDateString()}
           </div>
  }
};

class Incrementer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {n: props.start, timer: null};
    this.toggle = this.toggle.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount () {
    this.play();
  }

  componentWillUnmount () {
    window.clearInterval(this.state.timer);
  }

  play () {
    window.clearInterval(this.state.timer);
    this.setState({timer: window.setInterval((this.increment.bind(this)), 1000)});
  }

  pause () {
    window.clearInterval(this.state.timer);
    this.setState({timer: null});
  }

  reset () {
    this.pause();
    this.play();
    this.setState((state, props) => ({n: props.start}));
  }

  increment () {
    this.setState((state, props) => ({n: this.state.n + props.step}));
  }

  toggle () {
    return this.state.timer ? this.pause() : this.play();
  }

  label () {
    return this.state.timer ? "pause" : "play";
  }

  render() {
    return <div>
             Valeur: {this.state.n}
             <button onClick={this.toggle}>{this.label()}</button>
             <button onClick={this.reset}>reset</button>
           </div>
  }
};

Incrementer.defaultProps = {
  start: 0,
  step: 1
}

function Home () {
  return <div>
           <Welcome name="Raphaël">Bienvenue sur ReactJs</Welcome>
           <Welcome name="Clélia">Bienvenue sur ReactJs</Welcome>
           <Clock />
           <Incrementer start={0} />
           <Incrementer start={10} step={10} />
         </div>
};

ReactDOM.render(<Home />, document.querySelector('#app'));
