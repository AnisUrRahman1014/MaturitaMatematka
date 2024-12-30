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
