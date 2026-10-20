export type StudyMode = 'full' | 'summary' | 'review' | 'focus';

export interface LessonSection {
  id: string;
  title: string;
  pdfPage: number;
  content: string; // Markdown or rich HTML text
  summary: string; // For quick summary mode
  keyTakeaways: string[];
  citation?: string;
  isEducationalHelper?: boolean;
}

export interface LessonModule {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  pdfPages: number[];
  icon: string;
  estimatedMinutes: number;
  sections: LessonSection[];
  interactiveComponent?: 'coffee-chart' | 'supply-demand' | 'ecommerce-chart' | 'money-calc' | 'knowledge-graph' | 'business-sim';
}

export interface CoffeeMetric {
  metric: string;
  unit: string;
  scValue: number;
  nonScValue: number;
  diffPercent: string;
  note: string;
}

export interface TetPriceMetric {
  category: string;
  changePercent: number;
  description: string;
}

export interface EcommerceMetric {
  platform: string;
  gmvBillionUsd: number;
  marketSharePercent: number;
  gmvGrowthPercent: number;
}

export interface MoneyMetric {
  indicator: string;
  valuePercent: number;
  targetOrComparison: string;
  description: string;
}

export interface Flashcard {
  id: string;
  moduleId: string;
  question: string;
  answer: string;
  explanation: string;
  pdfPage: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export type QuestionType = 'single' | 'multiple' | 'true_false' | 'fill_blank' | 'matching' | 'case_study' | 'essay';

export interface MatchingPair {
  term: string;
  definition: string;
}

export interface QuizQuestion {
  id: string;
  moduleId: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: number | number[] | boolean | string;
  matchingPairs?: MatchingPair[];
  explanation: string;
  pdfPage: number;
  rubric?: string[]; // For essay
  sampleAnswer?: string; // For essay
}

export interface StudyNote {
  id: string;
  moduleId: string;
  sectionId?: string;
  pdfPage?: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export interface UserProgress {
  completedModules: string[];
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  totalStudySeconds: number;
  masteredFlashcardIds: string[];
  strugglingFlashcardIds: string[];
  quizResults: {
    quizId: string;
    score: number;
    total: number;
    percentage: number;
    timestamp: number;
    mistakeQuestionIds: string[];
  }[];
  bookmarks: string[]; // sectionIds or lessonIds
  earnedBadgeIds: string[];
}

export interface AcademicReference {
  id: number;
  authors: string;
  year: number;
  title: string;
  publication?: string;
  volumeIssue?: string;
  url?: string;
  accessDate?: string;
  summary: string;
  pdfPagesCited: number[];
}
