"use client";
import React, { useEffect, useState, useRef } from 'react';
import * as pdfjs from 'pdfjs-dist';
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFPreviewComponent: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // PDF 파일 로드
    pdfjs.getDocument(pdfUrl)
      .promise.then(pdf => {
        // 첫 번째 페이지 가져오기
        return pdf.getPage(1);
      })
      .then(page => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // 캔버스에 렌더링
        const viewport = page.getViewport({ scale: 1 });
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context!,
          viewport: viewport
        };
        return page.render(renderContext).promise;
      })
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        console.error('PDF 파일 로드 오류:', error);
      });
  }, []);

  return (
    <div style={{ margin: '20px 50px' }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <canvas ref={canvasRef}></canvas>
      )}
    </div>
  );
};

export default PDFPreviewComponent;