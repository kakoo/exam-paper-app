import React from 'react';
import { Layout } from 'antd';
import ExamListComponent from '../components/exam/list';

export default function Home() {
  return (
    <Layout style={{ margin: '20px 50px' }}>
      <ExamListComponent />
    </Layout>
  );
}
