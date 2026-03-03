export type TestimonialItem = {
  id: string;
  name: string;
  text: string;
  rating: number;
  imageSrc: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};
