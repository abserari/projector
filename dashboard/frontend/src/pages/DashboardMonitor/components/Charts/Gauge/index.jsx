import { Axis, Chart, Coord, Geom, Guide, Shape } from 'bizcharts';
import React from 'react';
import autoHeight from '../autoHeight';

const { Arc, Html, Line } = Guide;

const defaultFormatter = val => {
  switch (val) {
    case '2':
      return '优';

    case '4':
      return '良';

    case '6':
      return '中';

    case '8':
      return '差';

    default:
      return '';
  }
};

if (Shape.registerShape) {
  Shape.registerShape('point', 'pointer', {
    drawShape(cfg, group) {
      let point = cfg.points[0];
      point = this.parsePoint(point);
      const center = this.parsePoint({
        x: 0,
        y: 0,
      });
      group.addShape('line', {
        attrs: {
          x1: center.x,
          y1: center.y,
          x2: point.x,
          y2: point.y,
          stroke: cfg.color,
          lineWidth: 2,
          lineCap: 'round',
        },
      });
      return group.addShape('circle', {
        attrs: {
          x: center.x,
          y: center.y,
          r: 6,
          stroke: cfg.color,
          lineWidth: 3,
          fill: '#fff',
        },
      });
    },
  });
}

const Gauge = props => {
  const {
    title,
    height = 1,
    percent,
    forceFit = true,
    formatter = defaultFormatter,
    color = '#2F9CFF',
    bgColor = '#F0F2F5',
  } = props;
  const cols = {
    value: {
      type: 'linear',
      min: 0,
      max: 500,
      tickCount: 6,
      nice: true,
    },
  };
  const data = [
    {
      value: percent / 10,
    },
  ];

  const renderHtml = () => `
  <div style="width: 300px;text-align: center;font-size: 12px!important;">
    <div style="font-size: 14px; color: rgba(0,0,0,0.43);margin: 0;">${title}</div>
    <div style="font-size: 24px;color: rgba(0,0,0,0.85);margin: 0;">
      ${(data[0].value * 10).toFixed(2)}
    </div>
  </div>`;

  const textStyle = {
    fontSize: 12,
    fill: 'rgba(0, 0, 0, 0.65)',
    textAlign: 'center',
  };
  return (
    <Chart height={height} data={data} scale={cols} padding={[-16, 0, 16, 0]} forceFit={forceFit}>
      <Coord type="polar" startAngle={-1.25 * Math.PI} endAngle={0.25 * Math.PI} radius={0.8} />
      <Axis name="1" line={undefined} />
      <Axis
        line={undefined}
        tickLine={undefined}
        subTickLine={undefined}
        name="value"
        zIndex={2}
        label={{
          offset: -12,
          formatter,
          textStyle,
        }}
      />
      <Guide>
        <Line
          start={[50, 1.00]}
          end={[50, 0.95]}
          lineStyle={{
            stroke: color,
            lineDash: undefined,
            lineWidth: 2,
          }}
        />
        <Line
          start={[100, 1.00]}
          end={[100, 0.95]}
          lineStyle={{
            stroke: color,
            lineDash: undefined,
            lineWidth: 3,
          }}
        />
        <Line
          start={[150, 1.00]}
          end={[150, 0.95]}
          lineStyle={{
            stroke: color,
            lineDash: undefined,
            lineWidth: 3,
          }}
        />
        <Arc
          start={[200, 1.00]}
          end={[200, 0.95]}
          style={{
            stroke: bgColor,
            lineWidth: 10,
          }}
        />
        <Arc
          start={[300, 1.00]}
          end={[300, 0.95]}
          style={{
            stroke: bgColor,
            lineWidth: 10,
          }}
        />
        <Arc
          start={[0, 0.965]}
          end={[data[0].value, 0.965]}
          style={{
            stroke: color,
            lineWidth: 10,
          }}
        />
        <Html position={['50%', '95%']} html={renderHtml()} />
      </Guide>
      <Geom
        line={false}
        type="point"
        position="value*1"
        shape="pointer"
        color={color}
        active={false}
      />
    </Chart>
  );
};

export default autoHeight()(Gauge);