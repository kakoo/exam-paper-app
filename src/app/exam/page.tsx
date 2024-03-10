import React from 'react';
import { Layout } from 'antd';
import ExamListComponent from '../components/exam/item';
import PDFPreviewComponent from '../components/common/pdf/preview'

export default function Item() {
  const pdfUrl = "https://firebasestorage.googleapis.com/v0/b/orzo-contents.appspot.com/o/resources%2FW8biGyiVginV3JfdsI5Z%2F%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8-%E1%84%92%E1%85%A1%E1%86%AB%E1%84%86%E1%85%AE%E1%86%AB.pdf?alt=media&token=4401a6bf-f8c0-4408-b27c-67fbda3594af";
  
  return (
    <Layout style={{ margin: '20px 50px' }}>
      <ExamListComponent />
      <PDFPreviewComponent pdfUrl={pdfUrl}/>
    </Layout>
  );
}
