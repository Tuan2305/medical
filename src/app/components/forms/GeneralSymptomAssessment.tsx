import React, { useState } from 'react';
import { GeneralSymptomAnswers, FormComponentProps, GeneralSymptomQuestion } from '../../interface/forms';

const generalSymptomQuestions: GeneralSymptomQuestion[] = [
  { id: 1, text: "Tôi cảm thấy nóng nảy và lo âu hơn thường lệ." },
  { id: 2, text: "Tôi cảm thấy sợ vô cớ." },
  { id: 3, text: "Tôi dễ bối rối và cảm thấy hoảng sợ." },
  { id: 4, text: "Tôi cảm thấy như bị ngã và vỡ ra từng mảnh." },
  { id: 5, text: "Tôi cảm thấy mọi thứ đều tốt và không có suy nghĩ tiêu cực." },
  { id: 6, text: "Tay và chân tôi lắc lư, run lên." },
  { id: 7, text: "Tôi đang khó chịu vì đau đầu, đau cổ, đau lưng." },
  { id: 8, text: "Tôi cảm thấy yếu và dễ mệt mỏi." },
  { id: 9, text: "Tôi cảm thấy bình tĩnh và có thể ngồi yên một cách dễ dàng." },
  { id: 10, text: "Tôi cảm thấy tim mình đập nhanh." },
  { id: 11, text: "Tôi đang khó chịu vì cơn hoa mắt, chóng mặt." },
  { id: 12, text: "Tôi bị ngất và có lúc cảm thấy gần như thế." },
  { id: 13, text: "Tôi có thể thở ra, hít vào một cách dễ dàng." },
  { id: 14, text: "Tôi cảm thấy tê buốt, như có kiến bò ở đầu ngón tay, ngón chân." },
  { id: 15, text: "Tôi đang khó chịu vì đau dạ dày và đầy bụng." },
  { id: 16, text: "Tôi luôn cần phải đi đái." },
  { id: 17, text: "Bàn tay tôi thường khô và ẩm." },
  { id: 18, text: "Mặt tôi thường nóng và đỏ." },
  { id: 19, text: "Tôi ngủ dễ dàng và luôn có một giấc ngủ tốt." },
  { id: 20, text: "Tôi thường có ác mộng." },
];

const GeneralSymptomAssessment: React.FC<FormComponentProps<GeneralSymptomAnswers>> = ({
  onNext,
  onPrev,
  initialData,
}) => {
  const [answers, setAnswers] = useState<GeneralSymptomAnswers>(initialData || {});

  const handleAnswerChange = (questionId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const isFormValid = (): boolean => {
    return generalSymptomQuestions.every(q => answers[q.id] !== undefined);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-800 text-center">
        Bậc thang đánh giá lo âu ZUNG
      </h2>
      <p className="text-gray-700 mb-6 text-center text-lg">
        Dưới đây là 20 câu phát biểu mô tả một số triệu chứng của cơ thể. Ở mỗi câu, hãy chọn mức độ phù hợp nhất
        với tình trạng mà bạn cảm thấy trong vòng hai tuần vừa qua.
        <br />
        Vui lòng không bỏ sót câu nào.
      </p>

      <div className="space-y-6">
        {generalSymptomQuestions.map((question) => (
          <div key={question.id} className="border border-gray-200 p-4 rounded-md bg-gray-50">
            <p className="text-lg font-semibold text-gray-800 mb-3">
              <span className="text-blue-600 mr-2">{question.id}.</span> {question.text}
            </p>
            <div className="flex flex-wrap gap-4 justify-around md:justify-start">
              {[1, 2, 3, 4].map(score => (
                <label key={score} className="flex items-center space-x-2 cursor-pointer text-lg">
                  <input
                    type="radio"
                    name={`q${question.id}`}
                    value={score}
                    checked={answers[question.id] === score}
                    onChange={() => handleAnswerChange(question.id, score)}
                    className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">
                    {score === 1 && "Không có"}
                    {score === 2 && "Đôi khi"}
                    {score === 3 && "Thường xuyên"}
                    {score === 4 && "Luôn luôn"}
                  </span>
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
            isFormValid()
              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              : 'bg-blue-300 text-gray-100 cursor-not-allowed'
          }`}
        >
          Tiếp theo
        </button>
      </div>
    </div>
  );
};

export default GeneralSymptomAssessment;
