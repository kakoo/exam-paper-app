"use client";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation"
import { useEffect, useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Layout, Radio, Button, Form, Input, message, Space } from 'antd';
import { fetchExamDetail, updateExamInfo } from '../../services/exam_paper_api';
import PDFPreviewComponent from '../common/pdf/preview';

interface Item {
  id: string;
  explanationPDFDownloadURL : string;
  title: string;
  isVisible : boolean;
  highSchoolYear : number;
}

const ExamItemComponent = () => {
  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [examItem, setExamData] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const id = searchParams.get('id');

  const onFinishFailed = () => {
    message.error('시험지 정보를 확인해주세요.');
  };
  
  const onList = () => {
    router.push("/");
  };

  const onChangeShow = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setIsVisible(e.target.value);
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
        values.isVisible = isVisible;
        console.log(values);
        await updateExamInfo(id, values);
    } catch (error) {
        console.error('Error updating data:', error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const examDetail = await fetchExamDetail(id);
        setExamData(examDetail);
        setIsVisible(examDetail.isVisible);
      } catch (error) {
        console.error('Error get data:', error);
      }
    }
    if (id) {
      fetchData();
    }
  }, [id]);

  if (!examItem) {
    return <div>Loading...</div>;
  }

  return (
    <Layout style={{ margin: '20px 50px' }}>
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{ padding: '20px' }}
    >
      <Form.Item
        name="title"
        label="시험지 제목"
        rules={[{ required: true, message: '제목을 입력하세요.' }]}
      >
        <Input defaultValue={examItem.title} value={examItem.title} />
      </Form.Item>
      <Form.Item
        name="highSchoolYear"
        label="학년"
        rules={[{ required: true, message: '학년을 입력하세요.' }]}
      >
        <Input defaultValue={examItem.highSchoolYear} value={examItem.highSchoolYear} />
      </Form.Item>
      <Form.Item label="공개여부">
          <Radio.Group onChange={onChangeShow} value={isVisible}>
            <Radio value={true}> 공개 </Radio>
            <Radio value={false}> 비공개 </Radio>
          </Radio.Group>
        </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            수정
          </Button>
          <Button htmlType="button" onClick={onList}>
            목록으로 
          </Button>
        </Space>
      </Form.Item>
    </Form>
    <PDFPreviewComponent pdfUrl={examItem.explanationPDFDownloadURL}/>
    </Layout>
  );
};

export default ExamItemComponent;
