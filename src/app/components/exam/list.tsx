"use client";
import { useEffect, useState } from 'react';
import { List } from 'antd';

interface ExamItem {
  id: string;
  explanationPDFDownloadURL : string;
  shortTitle: string;
  section : {
    name: string
  };
  subject : {
    name: string
  };
  isVisible : boolean;
}

const ExamListComponent: React.FC = () => {
  const [examList, setExamsData] = useState<ExamItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/exam-papers?participant=${process.env.NEXT_PUBLIC_API_ID}`,{
          method: "GET",
          cache: "no-store",
        });
        const jsonData = await response.json();
        setExamsData(jsonData.data.sort((a:any, b:any) => b.executionYear - a.executionYear));
      } catch (error) {
        console.error('Error get data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <List
      bordered
      dataSource={examList}
      renderItem={(examItem : ExamItem) => (
        <List.Item>
          <img
            width={150}
            alt="pdf"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
          <List.Item.Meta
              style={{ "padding": "10px"}}
              title={<a href={"/exam?id=" + examItem.id}>{examItem.shortTitle} <br/>{examItem.section.name} - {examItem.subject.name}</a>}
              description= {examItem.isVisible == true ? '공개여부 : 공개됨' : '공개여부 : 비공개'}
          />
        </List.Item>
      )}
    />
  );
};

export default ExamListComponent;