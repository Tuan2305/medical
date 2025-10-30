"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import FormQuestion from "@/components/form-question"
import Link from "next/link"

export default function ZungForm() {
  const [responses, setResponses] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const questions = [
    { id: "q1", text: "Tôi cảm thấy buồn và chán nản", scale: 4 },
    { id: "q2", text: "Buổi sáng là thời gian tồi tệ nhất trong ngày của tôi", scale: 4 },
    { id: "q3", text: "Tôi có những cơn khóc hoặc muốn khóc", scale: 4 },
    { id: "q4", text: "Tôi khó ngủ vào ban đêm", scale: 4 },
    { id: "q5", text: "Tôi ăn ít hơn so với trước đây", scale: 4 },
    { id: "q6", text: "Tôi không còn thích những hoạt động tình dục", scale: 4 },
    { id: "q7", text: "Tôi nhận thấy rằng tôi đang giảm cân", scale: 4 },
    { id: "q8", text: "Tôi bị táo bón", scale: 4 },
    { id: "q9", text: "Tim tôi đập nhanh hơn bình thường", scale: 4 },
    { id: "q10", text: "Tôi mệt mỏi mà không có lý do", scale: 4 },
    { id: "q11", text: "Tâm trí tôi không rõ ràng như trước đây", scale: 4 },
    { id: "q12", text: "Tôi khó thực hiện công việc của tôi như trước đây", scale: 4 },
    { id: "q13", text: "Tôi cảm thấy bồn chồn và không thể ngồi yên", scale: 4 },
    { id: "q14", text: "Tôi cảm thấy không hy vọng về tương lai", scale: 4 },
    { id: "q15", text: "Tôi dễ bị kích động hơn bình thường", scale: 4 },
    { id: "q16", text: "Tôi thấy khó khăn trong việc đưa ra quyết định", scale: 4 },
    { id: "q17", text: "Tôi cảm thấy mình vô dụng và không cần thiết", scale: 4 },
    { id: "q18", text: "Tôi cảm thấy cuộc sống của tôi không đầy đủ", scale: 4 },
    { id: "q19", text: "Tôi cảm thấy rằng những người khác sẽ tốt hơn nếu tôi chết", scale: 4 },
    { id: "q20", text: "Tôi không còn thích những điều mà tôi thường thích", scale: 4 },
  ]

  const handleResponse = (questionId: string, value: number) => {
    setResponses({ ...responses, [questionId]: value })
  }

  const handleSubmit = () => {
    if (Object.keys(responses).length === questions.length) {
      const total = Object.values(responses).reduce((a, b) => a + b, 0)

      const existingResults = JSON.parse(localStorage.getItem("assessmentResults") || "[]")
      const newResult = {
        formId: "zung",
        formName: "ZUNG - Thang Tự Đánh Giá Trầm Cảm",
        score: total,
        maxScore: 80,
        timestamp: new Date().toISOString(),
      }
      existingResults.push(newResult)
      localStorage.setItem("assessmentResults", JSON.stringify(existingResults))

      setSubmitted(true)
      console.log("Zung Score:", total)
    }
  }

  const progress = (Object.keys(responses).length / questions.length) * 100

  return (
    <div>
      <Card className="p-8 bg-white shadow-lg mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">ZUNG - Thang Tự Đánh Giá Trầm Cảm</h1>
        <p className="text-lg text-gray-600 mb-6">Vui lòng chỉ ra tần suất mà mỗi câu phát biểu áp dụng cho bạn</p>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-gray-700">Tiến Độ</span>
            <span className="text-lg font-semibold text-blue-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </Card>

      {!submitted ? (
        <>
          <div className="space-y-6 mb-8">
            {questions.map((question, index) => (
              <FormQuestion
                key={question.id}
                number={index + 1}
                text={question.text}
                scale={question.scale}
                value={responses[question.id] || 0}
                onChange={(value) => handleResponse(question.id, value)}
              />
            ))}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={Object.keys(responses).length !== questions.length}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-lg py-6"
          >
            Gửi Biểu Mẫu
          </Button>
        </>
      ) : (
        <Card className="p-8 bg-green-50 border-2 border-green-200">
          <h2 className="text-2xl font-bold text-green-900 mb-4">✓ Biểu Mẫu Đã Gửi</h2>
          <p className="text-lg text-green-800 mb-6">
            Cảm ơn bạn đã hoàn thành biểu mẫu Zung. Dữ liệu của bạn đã được lưu.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Link href="/results" className="flex-1">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6">Xem Kết Quả</Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white text-lg py-6">
                Quay Lại Trang Chủ
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  )
}
