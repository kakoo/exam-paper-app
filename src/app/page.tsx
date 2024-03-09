import React from 'react';
import { Layout } from 'antd';
import APIComponent from './components/common/api';

export default function Home() {
  return (
    <Layout style={{ margin: '20px 50px' }}>
      <APIComponent />
    </Layout>
  );
}
