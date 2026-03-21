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

export const safeDecode = (value?: string) => {
  if (!value) {
    return undefined;
  }

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

export const toTitleCase = (value: string) => {
  return value
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
