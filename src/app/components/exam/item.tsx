"use client";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation"
import { useEffect, useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Layout, Radio, Button, Form, Input, message, Space } from 'antd';
import PDFPreviewComponent from '../common/pdf/preview'

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
  const url = `/api/exam-paper/${id}?participant=${process.env.NEXT_PUBLIC_API_ID}`;

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
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values), // 사용자가 입력한 데이터를 JSON 형식으로 변환하여 body에 넣음
        });

        // 응답 확인
        if (response.ok) {
            console.log('Data updated successfully!');
        } else {
            console.error('Failed to update data:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating data:', error);
    } finally {
        setLoading(false);
    }
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
