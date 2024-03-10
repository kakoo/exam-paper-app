"use client";
import React, { useEffect, useState, useRef} from 'react';
import { Pagination } from 'antd';
import * as pdfjs from 'pdfjs-dist';
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFPreviewComponent: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  
    const [numPages, setNumPages] = useState<number>(1);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // PDF 문서의 페이지 수를 가져오는 함수
        const fetchNumPages = async () => {
            try {
                const pdf = await pdfjs.getDocument(pdfUrl).promise;
                setNumPages(pdf.numPages * 10);
            } catch (error) {
                console.error('Error fetching PDF:', error);
            }
        };
        
        fetchNumPages();
    }, [pdfUrl]);

    useEffect(() => {
        // 선택된 페이지를 Canvas에 렌더링하는 함수
        const renderPage = async () => {
            try {
                const pdf = await pdfjs.getDocument(pdfUrl).promise;
                const page = await pdf.getPage(pageNumber);
                const canvas = canvasRef.current!;

                if (!canvas) {
                    console.log("canvas error");
                    return;
                }

                const context = canvas.getContext('2d')!;
                const viewport = page.getViewport({ scale: 1.5 });
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };
                await page.render(renderContext).promise;
            } catch (error) {
                console.error('Error rendering PDF page:', error);
            }
        };

        renderPage();
    }, [pdfUrl, pageNumber]);

    // 페이지 변경 이벤트 핸들러
    const onPageChange = (page: number) => {
        setPageNumber(page);
    };

    return (
        <div style={{ margin: '20px 50px' }}>
            {/* Canvas 요소를 사용하여 PDF 렌더링 */}
            <canvas ref={canvasRef} />
            {/* 페이지네이션 UI */}
            <Pagination current={pageNumber} onChange={onPageChange} total={numPages} />
        </div>
    );
};

export default PDFPreviewComponent;