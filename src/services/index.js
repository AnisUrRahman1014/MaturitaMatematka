const baseURL = 'https://maturita-matematika-backend.vercel.app';

export const API = {
  // User
  addToFavorite: `${baseURL}/user/addToFavorites`,
  removeFromFavorite:(questionId)=> `${baseURL}/user/removeFromFavorites/${questionId}`,
  checkIsFavorite:(questionId) => `${baseURL}/user/checkIsFavorite/${questionId}` ,
  getQuizHistory: `${baseURL}/user/getQuizHistory`,
  getAllFavorites: `${baseURL}/user/getFavorites`,

  // Categories:
  getCategories: `${baseURL}/category/getAllCategories`,

  // Questions:
  getQuestions: `${baseURL}/questions/getQuizQuestions`,
  getAllCategoryQuestions: `${baseURL}/questions/getAllCategoryQuestions`,

  // Quiz:
  submitQuiz: `${baseURL}/quiz/submitQuiz`
};
