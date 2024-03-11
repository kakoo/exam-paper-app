import React from 'react';
import { Layout } from 'antd';
import ExamListComponent from '../../components/exam/item';

export default function Item() {
  return (
    <Layout style={{ margin: '20px 50px' }}>
      <ExamListComponent />
    </Layout>
  );
}
