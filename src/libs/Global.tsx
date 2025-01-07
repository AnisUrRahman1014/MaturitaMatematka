export const section = (
  flexSize: number,
  flexDir: 'row' | 'column' = 'row',
) => ({
  flex: flexSize,
  flexDirection: flexDir,
  // backgroundColor: 'blue',
});

export type Question = {
  id: string;
  question: string;
  type: 'simple' | 'arrange';
  correctAnswer: string;
  explanation: string;
  options: string[];
};

export type Answer = {
  id: string;
  question: string;
  type: 'simple' | 'arrange';
  correctAnswer: string;
  givenAnswer: string;
  isCorrect: boolean;
  explanation: string;
  options: string[];
};

export type QuizResultData = {
  category: string;
  correctAnswerCount: number;
  incorrectAnswerCount: number;
  totalQuestions: number;
  score: number;
};
