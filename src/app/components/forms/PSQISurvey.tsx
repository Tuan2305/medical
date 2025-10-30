// app/components/forms/PSQISurvey.tsx
import React, { useState } from 'react';
import { FormComponentProps, PSQISurveyData } from '../../interface/forms';

// Cập nhật các câu hỏi phụ của Q5 để dễ lặp lại
const q5SubQuestions = [
  { id: 'a', text: "Không thể ngủ được trong vòng 30 phút." },
  { id: 'b', text: "Tỉnh dậy lúc nửa đêm hoặc quá sớm vào buổi sáng." },
  { id: 'c', text: "Phải thức dậy để đi vệ sinh." },
  { id: 'd', text: "Khó thở." },
  { id: 'e', text: "Ho hoặc ngáy to." },
  { id: 'f', text: "Cảm thấy lạnh." },
  { id: 'g', text: "Cảm thấy nóng." },
  { id: 'h', text: "Có ác mộng." },
  { id: 'i', text: "Thấy đau." },
  { id: 'j', text: "Lý do khác, hãy mô tả:" },
];

const PSQISurvey: React.FC<FormComponentProps<PSQISurveyData>> = ({ onNext, onPrev, initialData }) => {
  const [answers, setAnswers] = useState<PSQISurveyData>(
    initialData || {
      q1_bedtime: '',
      q2_latency: 0,
      q3_waketime: '',
      q4_sleep_hours: 0,
      q5_a: undefined, q5_b: undefined, q5_c: undefined, q5_d: undefined, q5_e: undefined,
      q5_f: undefined, q5_g: undefined, q5_h: undefined, q5_i: undefined, q5_j: undefined,
      q6_sleep_meds: undefined,
      q7_driving_difficulty: undefined,
      q8_motivation_difficulty: undefined,
      q9_overall_quality: undefined,
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setAnswers(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleRadioChange = (name: keyof PSQISurveyData, value: string) => {
    setAnswers(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = (): boolean => {
    // Kiểm tra các trường bắt buộc
    const requiredFields: (keyof PSQISurveyData)[] = [
      'q1_bedtime', 'q2_latency', 'q3_waketime', 'q4_sleep_hours',
      'q5_a', 'q5_b', 'q5_c', 'q5_d', 'q5_e', 'q5_f', 'q5_g', 'q5_h', 'q5_i',
      'q6_sleep_meds', 'q7_driving_difficulty', 'q8_motivation_difficulty', 'q9_overall_quality'
    ];

    for (const field of requiredFields) {
      if (answers[field] === undefined || (typeof answers[field] === 'string' && (answers[field] as string).trim() === '')) {
        return false;
      }
    }
    // Riêng q5_j, nếu có mô tả thì q5_j cũng phải được chọn
    if (answers.q5_j_description && answers.q5_j === undefined) {
      return false;
    }

    return true;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-800 text-center">Thang đánh giá chất lượng giấc ngủ Pittsburgh (PSQI)</h2>
      <p className="text-gray-700 mb-6 text-center text-lg">
        Các câu hỏi sau đây chỉ liên quan đến thói quen đi ngủ thường ngày của bạn trong tháng vừa qua.
        <br/>
        Vui lòng trả lời về tình trạng giấc ngủ của mình gần đúng nhất với tình trạng của bạn trong đa số ngày và đêm của tháng vừa qua. Xin hãy trả lời tất cả các câu hỏi.
      </p>

      {/* Question 1 */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
        <label htmlFor="q1_bedtime" className="block text-lg font-semibold text-gray-900 mb-2">
          1. Trong tháng qua bạn thường lên giường đi ngủ lúc mấy giờ?
        </label>
        <input
          type="time"
          id="q1_bedtime"
          name="q1_bedtime"
          value={answers.q1_bedtime}
          onChange={handleInputChange}
          className="w-full md:w-1/3 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
          required
        />
        <p className="text-sm text-gray-600 mt-1">Giờ đi ngủ thường là:</p>
      </div>

      {/* Question 2 */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
        <label htmlFor="q2_latency" className="block text-lg font-semibold text-gray-900 mb-2">
          2. Trong tháng qua, mỗi đêm bạn thường mất bao nhiêu phút mới chợp mắt được?
        </label>
        <input
          type="number"
          id="q2_latency"
          name="q2_latency"
          value={answers.q2_latency === 0 ? '' : answers.q2_latency} // Hiển thị rỗng nếu 0
          onChange={handleInputChange}
          className="w-full md:w-1/3 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
          min="0"
          placeholder="Số phút"
          required
        />
      </div>

      {/* Question 3 */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
        <label htmlFor="q3_waketime" className="block text-lg font-semibold text-gray-900 mb-2">
          3. Trong tháng qua bạn thường dậy buổi sáng (RA KHỎI GIƯỜNG) lúc mấy giờ?
        </label>
        <input
          type="time"
          id="q3_waketime"
          name="q3_waketime"
          value={answers.q3_waketime}
          onChange={handleInputChange}
          className="w-full md:w-1/3 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
          required
        />
        <p className="text-sm text-gray-600 mt-1">Là:</p>
      </div>

      {/* Question 4 */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
        <label htmlFor="q4_sleep_hours" className="block text-lg font-semibold text-gray-900 mb-2">
          4. Trong tháng qua, mỗi đêm bạn thường ngủ được mấy tiếng đồng hồ?
        </label>
        <input
          type="number"
          id="q4_sleep_hours"
          name="q4_sleep_hours"
          value={answers.q4_sleep_hours === 0 ? '' : answers.q4_sleep_hours} // Hiển thị rỗng nếu 0
          onChange={handleInputChange}
          className="w-full md:w-1/3 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
          min="0"
          max="24"
          step="0.5"
          placeholder="Số giờ"
          required
        />
        <p className="text-sm text-gray-600 mt-1">Số giờ ngủ được mỗi đêm thường là:</p>
      </div>

      {/* Question 5 */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
        <p className="text-lg font-semibold text-gray-900 mb-3">
          5. Trong tháng qua, bạn có thường gặp các vấn đề sau gây mất ngủ không?
        </p>
        {q5SubQuestions.map((item) => (
          <div key={item.id} className="mb-4">
            <p className="text-base text-gray-800 mb-2 font-medium">{item.id}. {item.text}</p>
            {item.id === 'j' && (
              <input
                type="text"
                name={`q5_j_description`}
                value={answers.q5_j_description || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md text-base mb-2"
                placeholder="Mô tả lý do khác"
              />
            )}
            <div className="flex flex-wrap gap-4 mt-2">
              <label className="flex items-center space-x-2 cursor-pointer text-base">
                <input
                  type="radio"
                  name={`q5_${item.id}`}
                  value="0"
                  checked={answers[`q5_${item.id}`] === "0"}
                  onChange={() => handleRadioChange(`q5_${item.id}` as keyof PSQISurveyData, "0")}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Không</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer text-base">
                <input
                  type="radio"
                  name={`q5_${item.id}`}
                  value="1"
                  checked={answers[`q5_${item.id}`] === "1"}
                  onChange={() => handleRadioChange(`q5_${item.id}` as keyof PSQISurveyData, "1")}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Ít hơn 1 lần/tuần</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer text-base">
                <input
                  type="radio"
                  name={`q5_${item.id}`}
                  value="2"
                  checked={answers[`q5_${item.id}`] === "2"}
                  onChange={() => handleRadioChange(`q5_${item.id}` as keyof PSQISurveyData, "2")}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">1-2 lần/tuần</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer text-base">
                <input
                  type="radio"
                  name={`q5_${item.id}`}
                  value="3"
                  checked={answers[`q5_${item.id}`] === "3"}
                  onChange={() => handleRadioChange(`q5_${item.id}` as keyof PSQISurveyData, "3")}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">3 hoặc hơn 3 lần/tuần</span>
              </label>
            </div>
          </div>
        ))}
        {/* Câu hỏi phụ cho "Lý do khác" */}
        {answers.q5_j_description && (
            <p className="text-base text-gray-800 mt-4 mb-2 font-medium">Trong tháng qua, vấn đề này có thường gây mất ngủ cho bạn không?</p>
        )}
      </div>

      {/* Question 6 */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
        <p className="text-lg font-semibold text-gray-900 mb-3">
          6. Trong tháng qua, bạn có thường phải sử dụng thuốc ngủ không (sử dụng theo đơn hoặc tự mua về dùng)?
        </p>
        <div className="flex flex-wrap gap-4">
          {["0", "1", "2", "3"].map(val => (
            <label key={val} className="flex items-center space-x-2 cursor-pointer text-lg">
              <input
                type="radio"
                name="q6_sleep_meds"
                value={val}
                checked={answers.q6_sleep_meds === val}
                onChange={() => handleRadioChange('q6_sleep_meds', val)}
                className="w-5 h-5 text-blue-600"
                required
              />
              <span className="text-gray-700">
                {val === "0" && "Không"}
                {val === "1" && "Ít hơn 1 lần/tuần"}
                {val === "2" && "1-2 lần/tuần"}
                {val === "3" && "3 hoặc hơn 3 lần/tuần"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Question 7 */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
        <p className="text-lg font-semibold text-gray-900 mb-3">
          7. Trong tháng qua, bạn có hay gặp khó khăn để giữ đầu óc tỉnh táo lúc lái xe, lúc ăn hay lúc tham gia vào các hoạt động xã hội hay không?
        </p>
        <div className="flex flex-wrap gap-4">
          {["0", "1", "2", "3"].map(val => (
            <label key={val} className="flex items-center space-x-2 cursor-pointer text-lg">
              <input
                type="radio"
                name="q7_driving_difficulty"
                value={val}
                checked={answers.q7_driving_difficulty === val}
                onChange={() => handleRadioChange('q7_driving_difficulty', val)}
                className="w-5 h-5 text-blue-600"
                required
              />
              <span className="text-gray-700">
                {val === "0" && "Không"}
                {val === "1" && "Ít hơn 1 lần/tuần"}
                {val === "2" && "1-2 lần/tuần"}
                {val === "3" && "3 hoặc hơn 3 lần/tuần"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Question 8 */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
        <p className="text-lg font-semibold text-gray-900 mb-3">
          8. Trong tháng qua, bạn có hay gặp khó khăn để duy trì hứng thú hoàn thành các công việc không?
        </p>
        <div className="flex flex-wrap gap-4">
          {["0", "1", "2", "3"].map(val => (
            <label key={val} className="flex items-center space-x-2 cursor-pointer text-lg">
              <input
                type="radio"
                name="q8_motivation_difficulty"
                value={val}
                checked={answers.q8_motivation_difficulty === val}
                onChange={() => handleRadioChange('q8_motivation_difficulty', val)}
                className="w-5 h-5 text-blue-600"
                required
              />
              <span className="text-gray-700">
                {val === "0" && "Không khó khăn gì"}
                {val === "1" && "Cũng hơi khó"}
                {val === "2" && "Ở một chừng mực nào đó cũng khó khăn"}
                {val === "3" && "Đó là một khó khăn lớn"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Question 9 */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
        <p className="text-lg font-semibold text-gray-900 mb-3">
          9. Trong tháng qua, nhìn chung bạn đánh giá về chất lượng giấc ngủ của mình như thế nào?
        </p>
        <div className="flex flex-wrap gap-4">
          {["0", "1", "2", "3"].map(val => (
            <label key={val} className="flex items-center space-x-2 cursor-pointer text-lg">
              <input
                type="radio"
                name="q9_overall_quality"
                value={val}
                checked={answers.q9_overall_quality === val}
                onChange={() => handleRadioChange('q9_overall_quality', val)}
                className="w-5 h-5 text-blue-600"
                required
              />
              <span className="text-gray-700">
                {val === "0" && "Rất tốt"}
                {val === "1" && "Tương đối tốt"}
                {val === "2" && "Tương đối kém"}
                {val === "3" && "Rất kém"}
              </span>
            </label>
          ))}
        </div>
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

export default PSQISurvey;