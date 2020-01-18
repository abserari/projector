import { Component } from 'react';
import { Row } from 'antd';

import styles from './seatList.less';
import Seat from './seat';

class Seats extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    seatData: [],
    person: {
      name: '李劲松',
      location: [0, 0],
    },
  };

  componentWillMount() {
    // const {
    //   location: {
    //     query: { person },
    //   },
    // } = this.props;
    const person = {
      seat: '2 排 13 座',
    };
    let seat = person.seat
      .replace(/[^0-9]/gi, ' ')
      .split(' ')
      .filter(function(e) {
        return e.replace(/(\r\n|\n|\r)/gm, '');
      });
    this.setState({
      person: {
        name: person.name,
        location: [+seat[0] - 1, +seat[1] - 1],
      },
    });
  }

  renderSeats() {
    let seats = [];
    for (let i = 0; i < 18; i++) {
      seats.push(this.renderRowSeats());
    }

    if (this.state.person) {
      seats[this.state.person.location[0]].props.children[this.state.person.location[1]] = (
        <Seat name={this.state.person.name} select={true} picked={true}></Seat>
      );

      if (this.state.person.location[0] - 1 >= 0) {
        seats[this.state.person.location[0] - 1].props.children[this.state.person.location[1]] = (
          <Seat name={this.state.person.name} picked={true}></Seat>
        );
      }

      if (this.state.person.location[0] + 1 <= 17) {
        seats[this.state.person.location[0] + 1].props.children[this.state.person.location[1]] = (
          <Seat name={this.state.person.name} picked={true}></Seat>
        );
      }

      if (this.state.person.location[1] - 1 >= 0) {
        seats[this.state.person.location[0]].props.children[this.state.person.location[1] - 1] = (
          <Seat name={this.state.person.name} picked={true}></Seat>
        );
      }

      if (this.state.person.location[1] + 1 <= 21) {
        seats[this.state.person.location[0]].props.children[this.state.person.location[1] + 1] = (
          <Seat name={this.state.person.name} picked={true}></Seat>
        );
      }
    }

    return seats;
  }

  renderRowSeats() {
    let seats = [];
    for (let i = 0; i < 22; i++) {
      if (i === 5 || i === 15) {
        seats.push(
          <div className={styles.seat_margin}>
            <Seat></Seat>
          </div>,
        );
      } else {
        seats.push(<Seat></Seat>);
      }
    }

    return <div className={styles.row_seats}>{seats}</div>;
  }

  render() {
    return <div className={styles.background}>{this.renderSeats()}</div>;
  }
}

export default Seats;
