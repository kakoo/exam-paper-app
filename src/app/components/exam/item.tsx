"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Layout, Radio, Button, Form, Input, message, Space } from 'antd';

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
  const id = searchParams.get('id');

  const [examItem, setExamData] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  const onFinish = () => {
    message.success('Submit success!');
  };
  
  const onFinishFailed = () => {
    message.error('Submit failed!');
  };
  
  const onList = () => {
     form.setFieldsValue({
       url: '/',
     });
  };

  const onChangeShow = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setIsVisible(e.target.value);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/exam-paper/${id}?participant=${process.env.NEXT_PUBLIC_API_ID}`,{
          method: "GET",
          cache: "no-store",
        });
        const jsonData = await response.json();
        setExamData(jsonData.data);
        setIsVisible(jsonData.data.isVisible);
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
        rules={[{ required: true }, { type: 'string', min: 2 }]}
      >
        <Input defaultValue={examItem.title} />
      </Form.Item>
      <Form.Item
        name="highSchoolYear"
        label="학년"
        rules={[{ required: true }, { type: 'number', min: 1 }]}
      >
        <Input defaultValue={examItem.highSchoolYear} />
      </Form.Item>
      <Form.Item label="공개여부">
          <Radio.Group onChange={onChangeShow} value={isVisible}>
            <Radio value={true}> 공개 </Radio>
            <Radio value={false}> 비공개 </Radio>
          </Radio.Group>
        </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            수정
          </Button>
          <Button htmlType="button" onClick={onList}>
            목록으로 
          </Button>
        </Space>
      </Form.Item>
    </Form>
    </Layout>
  );
};

export default ExamItemComponent;
