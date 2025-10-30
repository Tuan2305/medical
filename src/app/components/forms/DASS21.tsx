import React, { useState } from 'react';
import  type { DASS21Answers, FormComponentProps } from '../../interface/forms';
import {dass21Questions} from '../../constants/dass21Questions';

const DASS21: React.FC<FormComponentProps<DASS21Answers>> = ({ onNext, onPrev, initialData }) => {
  const [answers, setAnswers] = useState<DASS21Answers>(initialData || {});

  const handleAnswerChange = (questionId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const isFormValid = (): boolean => {
    return dass21Questions.every(q => answers[q.id] !== undefined);
  };

  const scoreOptions = [
    "0 - Không phù hợp với tôi một chút nào",
    "1 - Phù hợp với tôi một phần hoặc đôi khi",
    "2 - Phù hợp với tôi khá nhiều hoặc thường xuyên",
    "3 - Hoàn toàn phù hợp với tôi hoặc hầu hết thời gian",
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-800 text-center">Thang điểm DASS-21</h2>
      <p className="text-gray-700 mb-6 text-center text-lg">
        Vui lòng đọc kỹ mỗi câu và chọn lựa chọn phù hợp nhất mô tả trải nghiệm của bạn trong tuần vừa qua.
        <br/>
        Không có câu trả lời đúng hay sai.
      </p>

      <div className="space-y-6">
        {dass21Questions.map((question) => (
          <div key={question.id} className="border border-gray-200 p-4 rounded-md bg-gray-50">
            <p className="text-lg font-semibold text-gray-800 mb-3">
              <span className="text-blue-600 mr-2">{question.id}.</span> {question.text}
            </p>
            <div className="flex flex-wrap gap-4 justify-around md:justify-start">
              {[0, 1, 2, 3].map(score => (
                <label key={score} className="flex items-center space-x-2 cursor-pointer text-base">
                  <input
                    type="radio"
                    name={`dass_q${question.id}`}
                    value={score}
                    checked={answers[question.id] === score}
                    onChange={() => handleAnswerChange(question.id, score)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{scoreOptions[score]}</span>
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
          Hoàn thành
        </button>
      </div>
    </div>
  );
};

export default DASS21;