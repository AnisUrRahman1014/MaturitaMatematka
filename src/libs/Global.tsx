export const section = (
  flexSize: number,
  flexDir: 'row' | 'column' = 'row',
) => ({
  flex: flexSize,
  flexDirection: flexDir,
  // backgroundColor: 'blue',
});

export const formattedDate = (date: Date) => {
  const options = {year: 'numeric', month: 'long', day: 'numeric'};
  return date.toLocaleDateString('en-US', options);
};

export type Question = {
  id: string;
  question: string;
  type: 'choices' | 'order';
  correctAnswer: string;
  explanation: string;
  options: string[];
};

export type Answer = {
  id: string;
  question: string;
  type: 'choices' | 'order';
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
  questions: Answer[];
  date: string;
};
