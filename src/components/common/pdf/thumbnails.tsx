import pdfjs from 'pdfjs-dist';

export const pdfThumbnails = async (pdfUrl: string): Promise<any> => {
    try {
        console.log(pdfUrl);

        const pdf = await pdfjs.getDocument(pdfUrl).promise;
        const thumbnailUrls: string[] = [];

        console.log(pdf);

        // 각 페이지에 대해 이미지를 생성하고 URL로 변환
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 0.5 }); // 썸네일 크기 조절
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({ canvasContext: context, viewport });

            // 이미지 데이터를 base64로 변환하여 URL 생성
            const thumbnailUrl = canvas.toDataURL('image/png');
            thumbnailUrls.push(thumbnailUrl);
        }

        return thumbnailUrls;
    } catch (error) {
        console.error('Error fetching PDF thumbnails:', error);
    }
};