import React, { useState } from 'react';
import type { BeckBDIAnswers, FormComponentProps } from '../../interface/forms';
import { beckQuestions } from '../../constants/beckQuestions';


const BeckBDI: React.FC<FormComponentProps<BeckBDIAnswers>> = ({ onNext, onPrev, initialData }) => {
  const [answers, setAnswers] = useState<BeckBDIAnswers>(initialData || {});

  const handleAnswerChange = (questionId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const isFormValid = (): boolean => {
    return beckQuestions.every(q => answers[q.id] !== undefined);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-800 text-center">Thang điểm trầm cảm Beck (BDI)</h2>
      <p className="text-gray-700 mb-6 text-center text-lg">
        Vui lòng đọc từng nhóm câu phát biểu, sau đó chọn câu nào mô tả đúng nhất cảm giác của bạn trong hai tuần qua, bao gồm cả hôm nay.
        <br/>
        Hãy chọn một câu duy nhất trong mỗi nhóm.
      </p>

      <div className="space-y-8">
        {beckQuestions.map((group) => (
          <div key={group.id} className="border border-gray-200 p-4 rounded-md bg-gray-50">
            <p className="text-xl font-bold text-gray-900 mb-3 text-blue-700">
              {group.id}. {group.title}
            </p>
            <div className="space-y-3">
              {group.options.map((option, index) => ( // Thêm index vào key để tránh lỗi khi có cùng value
                <label key={`${group.id}-${option.value}-${index}`} className="flex items-start space-x-3 cursor-pointer text-lg">
                  <input
                    type="radio"
                    name={`beck_q${group.id}`}
                    value={option.value}
                    checked={answers[group.id] === option.value}
                    onChange={() => handleAnswerChange(group.id, option.value)}
                    className="w-5 h-5 mt-1 text-blue-600 focus:ring-blue-500 flex-shrink-0"
                  />
                  <span className="text-gray-800">{option.text}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onPrev}
          className="bg-gray-400 text-white px-6 py-3 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 text-lg font-semibold"
        >
          Quay lại
        </button>
        <button
          onClick={() => onNext(answers)}
          disabled={!isFormValid()}
          className={`px-6 py-3 rounded-md text-lg font-semibold ${
            isFormValid() ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' : 'bg-blue-300 text-gray-100 cursor-not-allowed'
          }`}
        >
          Tiếp theo
        </button>
      </div>
    </div>
  );
};

export default BeckBDI;