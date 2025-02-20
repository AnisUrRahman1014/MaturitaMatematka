const baseURL = 'https://maturita-matematika-backend.vercel.app';

export const API = {
  // User
  addToFavorite:(questionId)=> `${baseURL}/user/addToFavorites/${questionId}`,
  removeFromFavorite:(questionId)=> `${baseURL}/user/removeFromFavorites/${questionId}`,
  checkIsFavorite:(questionId) => `${baseURL}/user/checkIsFavorite/${questionId}` ,
  getQuizHistory: `${baseURL}/user/getQuizHistory`,

  // Categories:
  getCategories: `${baseURL}/category/getAllCategories`,

  // Questions:
  getQuestions: `${baseURL}/questions/getQuizQuestions`,

  // Quiz:
  submitQuiz: `${baseURL}/quiz/submitQuiz`
};
