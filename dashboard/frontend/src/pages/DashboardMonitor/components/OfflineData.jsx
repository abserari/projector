import { Card, Col, Row, Tabs } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { TimelineChart, Pie } from './Charts';
import NumberInfo from './NumberInfo';
import styles from '../style.less';

const CustomTab = ({ data, currentTabKey: currentKey }) => (
  <Row
    gutter={0}
    style={{
      width: 138,
      margin: '8px 0',
    }}
    type="flex"
  >
    <Col span={12}>
    </Col>
    <Col
      span={12}
      style={{
        paddingTop: 36,
      }}
    >
    </Col>
  </Row>
);

const { TabPane } = Tabs;

const OfflineData = ({ activeKey, loading, offlineData, offlineChartData, handleTabChange }) => (
  <Card
    loading={loading}
    className={styles.offlineCard}
    bordered={false}
    style={{
      marginTop: 32,
    }}
  >
    <Tabs activeKey={activeKey} onChange={handleTabChange}>
      {offlineData.map(shop => (
        <TabPane tab={<CustomTab data={shop} currentTabKey={activeKey} />} key={shop.name}>
          <div
            style={{
              padding: '0 24px',
            }}
          >
            <TimelineChart
              height={400}
              data={offlineChartData}
              titleMap={{
                y1: formatMessage({
                  id: 'dashboardanalysis.analysis.traffic',
                }),
              }}
            />
          </div>
        </TabPane>
      ))}
    </Tabs>
  </Card>
);

export default OfflineData;
