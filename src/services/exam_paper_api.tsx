export const fetchExamList = async (): Promise<any> => {
    try {
        const response = await fetch(`/api/exam-papers?participant=${process.env.NEXT_PUBLIC_API_ID}`,{
          method: "GET",
          cache: "no-store",
        });
        const jsonData = await response.json();
        return jsonData.data.sort((a:any, b:any) => b.executionYear - a.executionYear);
    } catch (error) {
        console.error('Error get data:', error);
    }
};

export const fetchExamDetail = async (examId: string): Promise<any> => {
    try {
        const response = await fetch(`/api/exam-paper/${examId}?participant=${process.env.NEXT_PUBLIC_API_ID}`,{
          method: "GET",
          cache: "no-store",
        });
        const jsonData = await response.json();
        return jsonData.data;
    } catch (error) {
        console.error('Error get data:', error);
    }
};

export const updateExamInfo = async (examId: string, newData: any): Promise<any> => {
    try {
        const response = await fetch(`/api/exam-paper/${examId}?participant=${process.env.NEXT_PUBLIC_API_ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        });

        // 응답 확인
        if (response.ok) {
            console.log('Data updated successfully!');
        } else {
            console.error('Failed to update data:', response.statusText);
        }
    } catch (error) {
        console.error(`Error updating exam info for ID ${examId}:`, error);
        throw error;
    }
};