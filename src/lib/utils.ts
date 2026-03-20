import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface IOpenGraphMetadata {
  title: string;
  description: string;
  image: string;
}

export const generateOpenGraphMetadata = ({ title, description, image }: IOpenGraphMetadata) => {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      image,
    },
  };
};
