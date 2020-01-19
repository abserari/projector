import { Component } from 'react';
import styles from './seat.less';

class Seat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log();
    return (
      <div
        className={`${styles.seat} ${this.props.select ? styles.background : ''} ${
          this.props.index == 5 || this.props.index == 15 ? styles.seat_margin : null
        }`}
      >
        {this.props.picked ? this.props.name : ''}
      </div>
    );
  }
}

export default Seat;
