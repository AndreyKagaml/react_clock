import { Component } from 'react';

type Props = {
  clockName: string;
};

type State = {
  today: Date;
};

export class Clock extends Component<Props, State> {
  state: Readonly<State> = {
    today: new Date(),
  };

  timerId!: number;

  componentDidMount(): void {
    this.timerId = window.setInterval(() => {
      const now = new Date();

      // eslint-disable-next-line no-console
      console.log(now.toUTCString().slice(-12, -4));
      this.setState({ today: now });
    }, 1000);
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps.clockName !== this.props.clockName) {
      // eslint-disable-next-line no-console
      console.warn(
        `Renamed from ${prevProps.clockName} to ${this.props.clockName}`,
      );
    }
  }

  componentWillUnmount(): void {
    window.clearInterval(this.timerId);
  }

  render() {
    const { clockName } = this.props;

    return (
      <div className="Clock">
        <strong className="Clock__name">{clockName}</strong>

        {' time is '}

        <span className="Clock__time">
          {this.state.today.toUTCString().slice(-12, -4)}
        </span>
      </div>
    );
  }
}
