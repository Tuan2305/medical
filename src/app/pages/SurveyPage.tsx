import React, { useState } from 'react';
import PatientInfo from '../components/forms/PatientInfo';
import GeneralSymptomAssessment from '../components/forms/GeneralSymptomAssessment';
import PSQISurvey from '../components/forms/PSQISurvey';
import ZungSDS from '../components/forms/ZungSDS';
import BeckBDI from '../components/forms/BeckBDI';
import DASS21 from '../components/forms/DASS21';
import ResultsPage from '../components/results/ResultsPage';
import type { FullSurveyData, PatientInfoData, GeneralSymptomAnswers, PSQISurveyData, ZungSDSAnswers, BeckBDIAnswers, DASS21Answers } from '../interface/forms';

const TOTAL_STEPS = 6;

const SurveyPage: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<FullSurveyData>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleNext = <T extends keyof FullSurveyData>(key: T, data: FullSurveyData[T]) => {
    setFormData(prev => ({ ...prev, [key]: data }));
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmitAll = (finalData: DASS21Answers) => {
    const finalFormData: FullSurveyData = { ...formData, dass21: finalData };
    setFormData(finalFormData);
    console.log("Dữ liệu khảo sát hoàn chỉnh:", finalFormData);
    
    // TODO: Gửi dữ liệu lên server
    // await submitSurveyData(finalFormData);
    
    setShowResults(true);
  };

  const handleRestart = () => {
    setStep(0);
    setFormData({});
    setShowResults(false);
  };

  // Hiển thị trang kết quả nếu đã hoàn thành
  if (showResults) {
    return <ResultsPage surveyData={formData} onRestart={handleRestart} />;
  }

  const renderForm = () => {
    switch (step) {
      case 0:
        return (
          <PatientInfo
            onNext={(data: PatientInfoData) => handleNext('patientInfo', data)}
            initialData={formData.patientInfo}
          />
        );
      case 1:
        return (
          <GeneralSymptomAssessment
            onNext={(data: GeneralSymptomAnswers) => handleNext('generalSymptoms', data)}
            onPrev={handlePrev}
            initialData={formData.generalSymptoms}
          />
        );
      case 2:
        return (
          <PSQISurvey
            onNext={(data: PSQISurveyData) => handleNext('psqiSurvey', data)}
            onPrev={handlePrev}
            initialData={formData.psqiSurvey}
          />
        );
      case 3:
        return (
          <ZungSDS
            onNext={(data: ZungSDSAnswers) => handleNext('zungSDS', data)}
            onPrev={handlePrev}
            initialData={formData.zungSDS}
          />
        );
      case 4:
        return (
          <BeckBDI
            onNext={(data: BeckBDIAnswers) => handleNext('beckBDI', data)}
            onPrev={handlePrev}
            initialData={formData.beckBDI}
          />
        );
      case 5:
        return (
          <DASS21
            onNext={handleSubmitAll}
            onPrev={handlePrev}
            initialData={formData.dass21}
          />
        );
      default:
        return (
          <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8 text-center text-xl font-semibold">
            <p>Khảo sát đã hoàn tất hoặc đang chờ xử lý.</p>
            <button
              onClick={handleRestart}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg font-semibold"
            >
              Bắt đầu khảo sát mới
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
    
      <main className="container mx-auto px-4 py-8">
        {renderForm()}
        {step < TOTAL_STEPS && (
          <div className="mt-8 text-center text-gray-700 text-lg font-medium">
            Tiến độ: Bước {step + 1} / {TOTAL_STEPS}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SurveyPage;