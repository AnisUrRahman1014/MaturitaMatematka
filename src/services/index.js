const baseURL = 'https://maturita-matematika-backend.vercel.app';

export const API = {
  addToFavorite: `${baseURL}/addToFavorite/`,

  // Categories:
  getCategories: `${baseURL}/category/getAllCategories`,

  // Questions:
  getQuestions: `${baseURL}/questions/getQuizQuestions`,
};
