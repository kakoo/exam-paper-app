"use client";
import { useEffect, useState } from 'react';

interface ExamItem {
  id: number;
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

const APIComponent: React.FC = () => {
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
    <div>
      {examList ? (
        <div>
        <h2>시험지 목록</h2>
        {examList.map((examItem) => (
        <ul key={examItem.id}>
            <li>{examItem.shortTitle}</li>
            <li>{examItem.section.name} - {examItem.subject.name}</li>
            <li>공개여부 : {examItem.isVisible == true ? '공개됨' : '비공개'}</li>
        </ul>
        ))}  
      </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default APIComponent;