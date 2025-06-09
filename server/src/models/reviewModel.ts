export interface Review {
  id: number;
  strainId: string;
  userId: string;
  rating: number;
  text: string;
  upvotes: number;
  downvotes: number;
  flagged: boolean;
}

let reviews: Review[] = [];
let nextId = 1;

function moderate(text: string): boolean {
  const banned = ['badword', 'offensive'];
  const regex = new RegExp(banned.join('|'), 'i');
  return regex.test(text);
}

export function createReview(data: Omit<Review, 'id' | 'upvotes' | 'downvotes' | 'flagged'>): Review {
  const review: Review = {
    id: nextId++,
    upvotes: 0,
    downvotes: 0,
    flagged: moderate(data.text),
    ...data
  };
  reviews.push(review);
  return review;
}

export function updateReview(id: number, data: Partial<Omit<Review, 'id'>>): Review | undefined {
  const review = reviews.find(r => r.id === id);
  if (!review) return undefined;
  if (data.text !== undefined) {
    review.flagged = moderate(data.text);
  }
  Object.assign(review, data);
  return review;
}

export function getReviewsForStrain(strainId: string): { reviews: Review[]; averageRating: number; voteCount: number } {
  const list = reviews.filter(r => r.strainId === strainId && !r.flagged);
  const totalRating = list.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = list.length ? totalRating / list.length : 0;
  const voteCount = list.reduce((sum, r) => sum + r.upvotes - r.downvotes, 0);
  return { reviews: list, averageRating, voteCount };
}

export function resetReviews() {
  reviews = [];
  nextId = 1;
}
