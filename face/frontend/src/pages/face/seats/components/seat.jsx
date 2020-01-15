import { Component } from 'react';
import { Row, Col, Card } from 'antd';
import styles from './seat.less';

class Seat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`${styles.seat} ${this.props.select ? styles.background : ''}`}>
        {this.props.picked ? this.props.name : ''}
      </div>
    );
  }
}

export default Seat;
