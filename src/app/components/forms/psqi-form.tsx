"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import FormQuestion from "@/components/form-question"
import Link from "next/link"

export default function PSQIForm() {
  const [responses, setResponses] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const questions = [
    {
      id: "q1",
      text: "Thời gian bạn thường đi ngủ là mấy giờ?",
      scale: 4,
    },
    {
      id: "q2",
      text: "Bạn mất bao lâu để ngủ được sau khi đi ngủ?",
      scale: 4,
    },
    {
      id: "q3",
      text: "Bạn thường ngủ được bao lâu mỗi đêm?",
      scale: 4,
    },
    {
      id: "q4",
      text: "Bạn cảm thấy chất lượng giấc ngủ của mình như thế nào?",
      scale: 4,
    },
    {
      id: "q5",
      text: "Bạn thường thức dậy giữa đêm hoặc sáng sớm bao nhiêu lần?",
      scale: 4,
    },
    {
      id: "q6",
      text: "Bạn cảm thấy mệt mỏi hoặc thiếu năng lượng trong ngày bao nhiêu lần?",
      scale: 4,
    },
    {
      id: "q7",
      text: "Bạn cảm thấy buồn ngủ trong ngày bao nhiêu lần?",
      scale: 4,
    },
    {
      id: "q8",
      text: "Bạn gặp khó khăn trong việc giữ sự tập trung bao nhiêu lần?",
      scale: 4,
    },
    {
      id: "q9",
      text: "Bạn bị chậm phản ứng hoặc gặp tai nạn bao nhiêu lần?",
      scale: 4,
    },
    {
      id: "q10",
      text: "Bạn cảm thấy lo lắng hoặc căng thẳng về giấc ngủ bao nhiêu lần?",
      scale: 4,
    },
    {
      id: "q11",
      text: "Bạn sử dụng thuốc ngủ bao nhiêu lần mỗi tuần?",
      scale: 4,
    },
    {
      id: "q12",
      text: "Bạn sử dụng rượu để giúp ngủ bao nhiêu lần mỗi tuần?",
      scale: 4,
    },
    {
      id: "q13",
      text: "Bạn sử dụng caffeine sau 3 giờ chiều bao nhiêu lần mỗi tuần?",
      scale: 4,
    },
    {
      id: "q14",
      text: "Bạn sử dụng thuốc lá gần giờ ngủ bao nhiêu lần mỗi tuần?",
      scale: 4,
    },
    {
      id: "q15",
      text: "Bạn uống nước gần giờ ngủ bao nhiêu lần mỗi tuần?",
      scale: 4,
    },
    {
      id: "q16",
      text: "Bạn gặp khó khăn trong việc ngủ do đau hoặc khó chịu bao nhiêu lần?",
      scale: 4,
    },
    {
      id: "q17",
      text: "Bạn gặp khó khăn trong việc ngủ do quá nóng hoặc quá lạnh bao nhiêu lần?",
      scale: 4,
    },
    {
      id: "q18",
      text: "Bạn gặp khó khăn trong việc ngủ do tiếng ồn bao nhiêu lần?",
      scale: 4,
    },
    {
      id: "q19",
      text: "Bạn gặp khó khăn trong việc ngủ do các vấn đề khác bao nhiêu lần?",
      scale: 4,
    },
  ]

  const handleResponse = (questionId: string, value: number) => {
    setResponses({ ...responses, [questionId]: value })
  }

  const handleSubmit = () => {
    if (Object.keys(responses).length === questions.length) {
      const total = Object.values(responses).reduce((a, b) => a + b, 0)

      const existingResults = JSON.parse(localStorage.getItem("assessmentResults") || "[]")
      const newResult = {
        formId: "psqi",
        formName: "PSQI - Chất Lượng Giấc Ngủ",
        score: total,
        maxScore: 76,
        timestamp: new Date().toISOString(),
      }
      existingResults.push(newResult)
      localStorage.setItem("assessmentResults", JSON.stringify(existingResults))

      setSubmitted(true)
      console.log("PSQI Score:", total)
    }
  }

  const progress = (Object.keys(responses).length / questions.length) * 100

  return (
    <div>
      <Card className="p-8 bg-white shadow-lg mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">PSQI - Chất Lượng Giấc Ngủ</h1>
        <p className="text-lg text-gray-600 mb-6">Thang đánh giá chất lượng giấc ngủ Pittsburgh</p>

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
            Cảm ơn bạn đã hoàn thành biểu mẫu PSQI. Dữ liệu của bạn đã được lưu.
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
