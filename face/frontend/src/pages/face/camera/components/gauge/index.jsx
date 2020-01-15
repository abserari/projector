import { Component } from 'react';
import { registerShape, Chart, Axis, Coord, Guide, Series } from 'viser-react';
import { connect } from 'dva';

import styles from './index.less';

class Gauge extends Component {
  state = {
    scale: [
      {
        dataKey: 'value',
        min: 0,
        max: 1500,
        tickInterval: 200,
        nice: false,
      },
    ],
  };

  renderShape = registerShape('point', 'pointer', {
    draw(cfg, container) {
      let point = cfg.points[0];
      point = this.parsePoint(point);
      const center = this.parsePoint({
        x: 0,
        y: 0,
      });
      container.addShape('line', {
        attrs: {
          x1: center.x,
          y1: center.y,
          x2: point.x,
          y2: point.y + 15,
          stroke: cfg.color,
          lineWidth: 2,
          lineCap: 'round',
        },
      });

      return container.addShape('circle', {
        attrs: {
          x: center.x,
          y: center.y,
          r: 4.75,
          stroke: cfg.color,
          lineWidth: 2.5,
          fill: '#fff',
        },
      });
    },
  });

  render() {
    const { personInfo } = this.props;
    let data = [
      {
        value: personInfo.timeSpend / 1,
      },
    ];
    return (
      <div>
        <Chart forceFit className={styles.gauge} height={320} data={data} scale={this.state.scale}>
          <Coord type="polar" startAngle={-202.5} endAngle={22.5} radius={0.75} />
          <Axis
            dataKey="value"
            zIndex={2}
            line={null}
            label={{
              offset: -16,
              textStyle: {
                fontSize: 12,
                textAlign: 'center',
                textBaseline: 'middle',
              },
            }}
            subTickCount={4}
            subTickLine={{
              length: -8,
              stroke: '#fff',
              strokeOpacity: 1,
            }}
            tickLine={{
              length: -17,
              stroke: '#fff',
              strokeOpacity: 1,
            }}
            grid={null}
          />
          <Axis dataKey="1" show={false} />
          <Series gemo="point" position="value*1" shape="pointer" color="#1890FF" active={false} />
          <Guide
            type="arc"
            zIndex={0}
            top={false}
            start={[0, 0.945]}
            end={[1500, 0.945]}
            style={{
              stroke: '#CBCBCB',
              lineWidth: 4,
            }}
          />
          <Guide
            type="arc"
            zIndex={1}
            start={[0, 0.945]}
            end={[data[0].value, 0.945]}
            style={{
              stroke: '#1890FF',
              lineWidth: 4,
            }}
          />
          <Guide
            type="html"
            position={['50%', '100%']}
            html={`
              <div style="text-align: center;">
                <p style="font-size: 16px; color: #545454;margin: 0;">处理时间</p>
                <p style="font-size: 30px; color: #545454;margin: 0;">${data[0].value}ms</p>
              </div>
            `}
          />
        </Chart>
      </div>
    );
  }
}

export default connect(({ personInfo }) => ({
  personInfo: personInfo,
}))(Gauge);
