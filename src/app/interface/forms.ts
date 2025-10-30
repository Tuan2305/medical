export interface FormComponentProps<T = unknown> {
  onNext: (data: T) => void;
  onPrev: () => void;
  initialData?: T;
}

// PatientInfo
export interface PatientInfoData {
  fullName: string;
  dob: string;
  gender: 'male' | 'female' | 'other' | '';
  address: string;
  occupation: string;
  diagnosis: string;
}

export interface PatientInfoProps {
  onNext: (data: PatientInfoData) => void;
  initialData?: PatientInfoData;
}

// GeneralSymptomAssessment
export interface GeneralSymptomQuestion {
  id: number;
  text: string;

}

export type GeneralSymptomAnswers = Record<number, number>; // { 1: 2, 2: 4, ... }

// PSQISurvey
export interface PSQISurveyData {
  q1_bedtime: string;
  q2_latency: number;
  q3_waketime: string;
  q4_sleep_hours: number;
  q5_a: "0" | "1" | "2" | "3" | undefined;
  q5_b: "0" | "1" | "2" | "3" | undefined;
  q5_c: "0" | "1" | "2" | "3" | undefined;
  q5_d: "0" | "1" | "2" | "3" | undefined;
  q5_e: "0" | "1" | "2" | "3" | undefined;
  q5_f: "0" | "1" | "2" | "3" | undefined;
  q5_g: "0" | "1" | "2" | "3" | undefined;
  q5_h: "0" | "1" | "2" | "3" | undefined;
  q5_i: "0" | "1" | "2" | "3" | undefined;
  q5_j: "0" | "1" | "2" | "3" | undefined; 
  q5_j_description?: string;
  q6_sleep_meds: "0" | "1" | "2" | "3" | undefined;
  q7_driving_difficulty: "0" | "1" | "2" | "3" | undefined;
  q8_motivation_difficulty: "0" | "1" | "2" | "3" | undefined;
  q9_overall_quality: "0" | "1" | "2" | "3" | undefined;
}

// ZungSDS
export interface ZungQuestion {
  id: number;
  text: string;
}

export type ZungSDSAnswers = Record<number, number>;

// BeckBDI 
export interface BeckOption {
  value: number;
  text: string;
}

export interface BeckQuestionGroup {
  id: number;
  title: string;
  options: BeckOption[];
}

export type BeckBDIAnswers = Record<number, number>; 

// DASS21
export interface DASS21Question {
  id: number;
  text: string;
  // Có thể thêm category: 'D' | 'A' | 'S'; để phân loại câu hỏi
}

export type DASS21Answers = Record<number, number>; 

export interface FullSurveyData {
  patientInfo?: PatientInfoData;
  generalSymptoms?: GeneralSymptomAnswers;
  psqiSurvey?: PSQISurveyData;
  zungSDS?: ZungSDSAnswers;
  beckBDI?: BeckBDIAnswers;
  dass21?: DASS21Answers;
}