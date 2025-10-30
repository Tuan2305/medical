// app/components/forms/PatientInfo.tsx
import React, { useState } from 'react';
import { PatientInfoProps, PatientInfoData } from '../../interface/forms';

const PatientInfo: React.FC<PatientInfoProps> = ({ onNext, initialData }) => {
  const [formData, setFormData] = useState<PatientInfoData>(
    initialData || {
      fullName: '',
      yearOfBirth: '', // Cập nhật tên trường và giá trị khởi tạo
      gender: '',
      address: '',
      occupation: '',
      diagnosis: '',
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'number' ? (value === '' ? '' : parseInt(value)) : value // Xử lý input type="number"
    }));
  };

  const isFormValid = (): boolean => {
    // Kiểm tra các trường bắt buộc
    return formData.fullName.trim() !== '' &&
           formData.yearOfBirth !== '' && // Cập nhật tên trường
           formData.gender !== '' &&
           formData.address.trim() !== '' &&
           formData.occupation.trim() !== '';
  };

  // Lấy năm hiện tại và giới hạn cho năm sinh
  const currentYear = new Date().getFullYear();
  const minYear = 1900; // Năm thấp nhất hợp lý
  const maxYear = currentYear; // Năm cao nhất là năm hiện tại

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">PHIẾU KHẢO SÁT SỨC KHỎẺ</h1>
      <p className="text-gray-700 mb-6 text-center text-lg">
        Vui lòng điền thông tin cá nhân và trả lời các câu hỏi dưới đây.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Hàng 1: Họ và tên & Năm sinh */}
        <div>
          <label htmlFor="fullName" className="block text-lg font-medium text-gray-900 mb-2">Họ và tên bệnh nhân:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="Nhập họ và tên"
            required
          />
        </div>
        <div>
          <label htmlFor="yearOfBirth" className="block text-lg font-medium text-gray-900 mb-2">Năm sinh:</label>
          <input
            type="number" // Đổi từ "date" sang "number"
            id="yearOfBirth"
            name="yearOfBirth"
            value={formData.yearOfBirth}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="VD: 1990" // Placeholder chỉ hiển thị năm
            min={minYear} // Giới hạn năm tối thiểu
            max={maxYear} // Giới hạn năm tối đa
            required
          />
        </div>

        {/* Hàng 2: Giới tính & Địa chỉ */}
        <div>
          <label htmlFor="gender" className="block text-lg font-medium text-gray-900 mb-2">Giới tính:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
            required
          >
            <option value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>
        <div>
          <label htmlFor="address" className="block text-lg font-medium text-gray-900 mb-2">Địa chỉ:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="Nhập địa chỉ"
            required
          />
        </div>

        {/* Hàng 3: Nghề nghiệp (chiếm toàn bộ chiều rộng) */}
        <div className="md:col-span-2"> {/* Thêm md:col-span-2 để nó chiếm toàn bộ chiều rộng trên màn hình lớn */}
          <label htmlFor="occupation" className="block text-lg font-medium text-gray-900 mb-2">Nghề nghiệp:</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="Nhập nghề nghiệp"
            required
          />
        </div>

        {/* Hàng 4: Chẩn đoán (chiếm toàn bộ chiều rộng) */}
        <div className="md:col-span-2">
          <label htmlFor="diagnosis" className="block text-lg font-medium text-gray-900 mb-2">Chẩn đoán (Bác sĩ điền):</label>
          <textarea
            id="diagnosis"
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg h-24"
            placeholder="Để trống hoặc bác sĩ điền vào"
            readOnly // Đặt là chỉ đọc cho bệnh nhân
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <button
          onClick={() => onNext(formData)}
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

export default PatientInfo;