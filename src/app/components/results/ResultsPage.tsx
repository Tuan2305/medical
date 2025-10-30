
import React from 'react';
import type { FullSurveyData } from '../../interface/forms';

interface ResultsPageProps {
  surveyData: FullSurveyData;
  onRestart: () => void;
}

interface AssessmentResult {
  name: string;
  score: number;
  maxScore: number;
  interpretation: string;
  level: 'normal' | 'mild' | 'moderate' | 'severe';
  color: string;
  recommendations: string[];
}

const ResultsPage: React.FC<ResultsPageProps> = ({ surveyData, onRestart }) => {
  const calculatePSQIScore = (): AssessmentResult => {
    if (!surveyData.psqiSurvey) return { name: 'PSQI', score: 0, maxScore: 21, interpretation: 'Chưa hoàn thành', level: 'normal', color: 'gray', recommendations: [] };

    let totalScore = 0;
    const data = surveyData.psqiSurvey;
    totalScore += parseInt(data.q9_overall_quality || '0');

    let latencyScore = 0;
    if (data.q2_latency <= 15) latencyScore = 0;
    else if (data.q2_latency <= 30) latencyScore = 1;
    else if (data.q2_latency <= 60) latencyScore = 2;
    else latencyScore = 3;
    totalScore += latencyScore;
 
    totalScore += parseInt(data.q5_a || '0') + parseInt(data.q5_b || '0') + parseInt(data.q5_c || '0');
    totalScore += parseInt(data.q6_sleep_meds || '0');
    totalScore += parseInt(data.q7_driving_difficulty || '0');
    totalScore += parseInt(data.q8_motivation_difficulty || '0');
    
    let level: 'normal' | 'mild' | 'moderate' | 'severe' = 'normal';
    let interpretation = '';
    let color = '';
    let recommendations: string[] = [];
    
    if (totalScore <= 5) {
      level = 'normal';
      interpretation = 'Chất lượng giấc ngủ tốt';
      color = 'green';
      recommendations = ['Duy trì thói quen ngủ hiện tại', 'Tiếp tục lối sống lành mạnh'];
    } else if (totalScore <= 10) {
      level = 'mild';
      interpretation = 'Chất lượng giấc ngủ kém nhẹ';
      color = 'yellow';
      recommendations = ['Thiết lập thói quen đi ngủ đều đặn', 'Tránh caffeine trước khi ngủ', 'Tạo môi trường ngủ thoải mái'];
    } else if (totalScore <= 15) {
      level = 'moderate';
      interpretation = 'Chất lượng giấc ngủ kém vừa';
      color = 'orange';
      recommendations = ['Tham khao ý kiến bác sĩ', 'Thực hiện vệ sinh giấc ngủ', 'Xem xét liệu pháp hành vi nhận thức'];
    } else {
      level = 'severe';
      interpretation = 'Chất lượng giấc ngủ rất kém';
      color = 'red';
      recommendations = ['Cần được thăm khám và điều trị chuyên khoa', 'Có thể cần nghiên cứu giấc ngủ', 'Thảo luận về các lựa chọn điều trị'];
    }
    
    return { name: 'PSQI - Chất Lượng Giấc Ngủ', score: totalScore, maxScore: 21, interpretation, level, color, recommendations };
  };

  const calculateZungScore = (): AssessmentResult => {
    if (!surveyData.zungSDS) return { name: 'Zung SDS', score: 0, maxScore: 80, interpretation: 'Chưa hoàn thành', level: 'normal', color: 'gray', recommendations: [] };
    
    const totalScore = Object.values(surveyData.zungSDS).reduce((sum, score) => sum + score, 0);
    
    let level: 'normal' | 'mild' | 'moderate' | 'severe' = 'normal';
    let interpretation = '';
    let color = '';
    let recommendations: string[] = [];
    
    if (totalScore < 50) {
      level = 'normal';
      interpretation = 'Không có triệu chứng trầm cảm';
      color = 'green';
      recommendations = ['Duy trì sức khỏe tinh thần tốt', 'Tiếp tục hoạt động xã hội'];
    } else if (totalScore < 60) {
      level = 'mild';
      interpretation = 'Trầm cảm nhẹ';
      color = 'yellow';
      recommendations = ['Tăng cường hoạt động thể chất', 'Duy trì kết nối xã hội', 'Theo dõi tình trạng'];
    } else if (totalScore < 70) {
      level = 'moderate';
      interpretation = 'Trầm cảm vừa';
      color = 'orange';
      recommendations = ['Tham khảo ý kiến chuyên gia tâm lý', 'Xem xét liệu pháp tâm lý', 'Có thể cần hỗ trợ y tế'];
    } else {
      level = 'severe';
      interpretation = 'Trầm cảm nặng';
      color = 'red';
      recommendations = ['Cần được thăm khám và điều trị ngay', 'Có thể cần dùng thuốc', 'Theo dõi chặt chẽ tình trạng'];
    }
    
    return { name: 'Zung SDS - Tự Đánh Giá Trầm Cảm', score: totalScore, maxScore: 80, interpretation, level, color, recommendations };
  };

  const calculateBeckScore = (): AssessmentResult => {
    if (!surveyData.beckBDI) return { name: 'Beck BDI', score: 0, maxScore: 63, interpretation: 'Chưa hoàn thành', level: 'normal', color: 'gray', recommendations: [] };
    
    const totalScore = Object.values(surveyData.beckBDI).reduce((sum, score) => sum + score, 0);
    
    let level: 'normal' | 'mild' | 'moderate' | 'severe' = 'normal';
    let interpretation = '';
    let color = '';
    let recommendations: string[] = [];
    
    if (totalScore <= 13) {
      level = 'normal';
      interpretation = 'Trầm cảm tối thiểu';
      color = 'green';
      recommendations = ['Duy trì sức khỏe tinh thần tốt', 'Tiếp tục lối sống tích cực'];
    } else if (totalScore <= 19) {
      level = 'mild';
      interpretation = 'Trầm cảm nhẹ';
      color = 'yellow';
      recommendations = ['Tăng cường hoạt động thể chất', 'Tham gia hoạt động xã hội', 'Quản lý stress hiệu quả'];
    } else if (totalScore <= 28) {
      level = 'moderate';
      interpretation = 'Trầm cảm vừa';
      color = 'orange';
      recommendations = ['Tham khảo ý kiến chuyên gia', 'Liệu pháp tâm lý nhận thức hành vi', 'Theo dõi định kỳ'];
    } else {
      level = 'severe';
      interpretation = 'Trầm cảm nặng';
      color = 'red';
      recommendations = ['Cần điều trị chuyên khoa ngay lập tức', 'Có thể cần thuốc antidepressant', 'Hỗ trợ tâm lý chuyên sâu'];
    }
    
    return { name: 'Beck BDI - Thang Trầm Cảm Beck', score: totalScore, maxScore: 63, interpretation, level, color, recommendations };
  };

  const calculateDASS21Score = (): AssessmentResult => {
    if (!surveyData.dass21) return { name: 'DASS-21', score: 0, maxScore: 126, interpretation: 'Chưa hoàn thành', level: 'normal', color: 'gray', recommendations: [] };
    
    const totalScore = Object.values(surveyData.dass21).reduce((sum, score) => sum + score, 0);
    
    // DASS-21 có 3 subscales: Depression, Anxiety, Stress (mỗi scale 7 câu)
    let level: 'normal' | 'mild' | 'moderate' | 'severe' = 'normal';
    let interpretation = '';
    let color = '';
    let recommendations: string[] = [];
    
    if (totalScore <= 42) {
      level = 'normal';
      interpretation = 'Mức độ bình thường';
      color = 'green';
      recommendations = ['Duy trì sức khỏe tinh thần tốt', 'Tiếp tục các hoạt động tích cực'];
    } else if (totalScore <= 63) {
      level = 'mild';
      interpretation = 'Mức độ nhẹ';
      color = 'yellow';
      recommendations = ['Học kỹ thuật thư giãn', 'Tăng cường hoạt động thể chất', 'Quản lý thời gian hiệu quả'];
    } else if (totalScore <= 84) {
      level = 'moderate';
      interpretation = 'Mức độ vừa';
      color = 'orange';
      recommendations = ['Tham khảo ý kiến chuyên gia', 'Học kỹ thuật coping', 'Xem xét liệu pháp tâm lý'];
    } else {
      level = 'severe';
      interpretation = 'Mức độ nặng';
      color = 'red';
      recommendations = ['Cần được đánh giá và điều trị chuyên khoa', 'Có thể cần can thiệp y tế', 'Hỗ trợ tâm lý chuyên sâu'];
    }
    
    return { name: 'DASS-21 - Lo Âu, Trầm Cảm & Stress', score: totalScore, maxScore: 126, interpretation, level, color, recommendations };
  };

  const calculateGeneralSymptomScore = (): AssessmentResult => {
    if (!surveyData.generalSymptoms) return { name: 'Zung Anxiety', score: 0, maxScore: 80, interpretation: 'Chưa hoàn thành', level: 'normal', color: 'gray', recommendations: [] };
    
    const totalScore = Object.values(surveyData.generalSymptoms).reduce((sum, score) => sum + score, 0);
    
    let level: 'normal' | 'mild' | 'moderate' | 'severe' = 'normal';
    let interpretation = '';
    let color = '';
    let recommendations: string[] = [];
    
    if (totalScore < 45) {
      level = 'normal';
      interpretation = 'Lo âu bình thường';
      color = 'green';
      recommendations = ['Duy trì trạng thái tinh thần tốt', 'Tiếp tục lối sống lành mạnh'];
    } else if (totalScore < 60) {
      level = 'mild';
      interpretation = 'Lo âu nhẹ';
      color = 'yellow';
      recommendations = ['Học kỹ thuật thư giãn', 'Tập thiền hoặc yoga', 'Duy trì režim ngủ đều đặn'];
    } else if (totalScore < 75) {
      level = 'moderate';
      interpretation = 'Lo âu vừa';
      color = 'orange';
      recommendations = ['Tham khảo ý kiến chuyên gia', 'Liệu pháp thư giãn cơ bắp', 'Xem xét hỗ trợ tâm lý'];
    } else {
      level = 'severe';
      interpretation = 'Lo âu nặng';
      color = 'red';
      recommendations = ['Cần được thăm khám chuyên khoa ngay', 'Có thể cần điều trị bằng thuốc', 'Liệu pháp tâm lý chuyên sâu'];
    }
    
    return { name: 'Zung Anxiety - Đánh Giá Lo Âu', score: totalScore, maxScore: 80, interpretation, level, color, recommendations };
  };

  const results = [
    calculatePSQIScore(),
    calculateZungScore(),
    calculateBeckScore(),
    calculateDASS21Score(),
    calculateGeneralSymptomScore(),
  ].filter(result => result.score > 0 || result.interpretation !== 'Chưa hoàn thành');

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-100 border-green-300 text-green-800';
      case 'yellow': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'orange': return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'red': return 'bg-red-100 border-red-300 text-red-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getProgressColor = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'orange': return 'bg-orange-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-700 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Kết Quả Đánh Giá Sức Khỏe Tâm Thần</h1>
          <p className="text-center text-blue-100 mt-2 text-lg">Tóm tắt kết quả đánh giá của {surveyData.patientInfo?.fullName || 'Bệnh nhân'}</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Thông tin bệnh nhân */}
        {surveyData.patientInfo && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Thông Tin Bệnh Nhân</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-lg">
              <div>
                <span className="font-semibold text-gray-700">Họ và tên:</span>
                <span className="ml-2 text-gray-900">{surveyData.patientInfo.fullName}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Năm sinh:</span>
                <span className="ml-2 text-gray-900">{surveyData.patientInfo.dob}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Giới tính:</span>
                <span className="ml-2 text-gray-900">
                  {surveyData.patientInfo.gender === 'male' ? 'Nam' : 
                   surveyData.patientInfo.gender === 'female' ? 'Nữ' : 'Khác'}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Địa chỉ:</span>
                <span className="ml-2 text-gray-900">{surveyData.patientInfo.address}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Nghề nghiệp:</span>
                <span className="ml-2 text-gray-900">{surveyData.patientInfo.occupation}</span>
              </div>
              {surveyData.patientInfo.diagnosis && (
                <div className="md:col-span-2 lg:col-span-3">
                  <span className="font-semibold text-gray-700">Chẩn đoán:</span>
                  <span className="ml-2 text-gray-900">{surveyData.patientInfo.diagnosis}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Kết quả đánh giá */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {results.map((result, index) => (
            <div key={index} className={`border-2 rounded-lg p-6 ${getColorClasses(result.color)}`}>
              <h3 className="text-xl font-bold mb-3">{result.name}</h3>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold">Điểm số: {result.score}/{result.maxScore}</span>
                  <span className="text-lg font-bold">{result.interpretation}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(result.color)}`}
                    style={{ width: `${(result.score / result.maxScore) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-lg">Khuyến nghị:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx} className="text-base">{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Biểu đồ tổng quan */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tổng Quan Kết Quả</h2>
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-48 text-lg font-medium text-gray-700 truncate">{result.name}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <div
                    className={`h-6 rounded-full transition-all duration-500 ${getProgressColor(result.color)}`}
                    style={{ width: `${(result.score / result.maxScore) * 100}%` }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-800">
                    {result.score}/{result.maxScore}
                  </span>
                </div>
                <div className="w-32 text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getColorClasses(result.color)}`}>
                    {result.interpretation}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Khuyến nghị chung */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Khuyến Nghị Chung</h2>
          <div className="space-y-3 text-lg text-blue-800">
            <p>• <strong>Nếu bạn có bất kỳ lo lắng nào về kết quả:</strong> Hãy thảo luận với bác sĩ điều trị để được tư vấn chuyên sâu.</p>
            <p>• <strong>Theo dõi định kỳ:</strong> Các kết quả đánh giá có thể thay đổi theo thời gian, nên được theo dõi định kỳ.</p>
            <p>• <strong>Lối sống lành mạnh:</strong> Duy trì chế độ ăn uống cân bằng, tập thể dục đều đặn và ngủ đủ giấc.</p>
            <p>• <strong>Hỗ trợ xã hội:</strong> Duy trì mối quan hệ tích cực với gia đình và bạn bè.</p>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => window.print()}
            className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-lg font-semibold shadow-lg"
          >
            📄 In Kết Quả
          </button>
          <button
            onClick={onRestart}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg font-semibold shadow-lg"
          >
            🔄 Khảo Sát Mới
          </button>
        </div>

        {/* Ghi chú */}
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            * Kết quả này chỉ mang tính chất tham khảo. Để có chẩn đoán chính xác và phương pháp điều trị phù hợp, 
            vui lòng tham khảo ý kiến của bác sĩ chuyên khoa.
          </p>
          <p className="text-sm mt-2">
            Ngày đánh giá: {new Date().toLocaleDateString('vi-VN')}
          </p>
        </div>
      </main>
    </div>
  );
};

export default ResultsPage;