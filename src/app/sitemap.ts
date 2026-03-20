import { getBodyParts } from '@/features/body-parts/services/use-get-body-parts';
import { getEquipments } from '@/features/equipments/services/use-get-equipments';
import { getExercises } from '@/features/exercises/services/use-get-exercises';
import { getTargetMuscles } from '@/features/target-muscles/services/use-get-target-muscles';
import type { MetadataRoute } from 'next';

const siteUrl = 'https://bodyworks.akshatjaiswal.me';
const sitemapPageSize = 1000;

async function getAllExercises(): Promise<IExercise[]> {
  const firstPage = await getExercises(sitemapPageSize, 1);

  const exercises = [...firstPage.data];
  const totalPages = firstPage.totalPages || Math.ceil(firstPage.totalExercises / sitemapPageSize);

  for (let page = 2; page <= totalPages; page += 1) {
    const nextPage = await getExercises(sitemapPageSize, page);
    exercises.push(...nextPage.data);
  }

  return exercises;
}

async function getAllBodyParts(): Promise<IBodyPart[]> {
  const bodyParts = await getBodyParts(sitemapPageSize);
  return bodyParts.data;
}

async function getAllEquipments(): Promise<IEquipment[]> {
  const equipments = await getEquipments(sitemapPageSize);
  return equipments.data;
}

async function getAllTargetMuscles(): Promise<ITargetMuscle[]> {
  const targetMuscles = await getTargetMuscles(sitemapPageSize);
  return targetMuscles.data;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [exercises, bodyParts, equipments, targetMuscles] = await Promise.all([
    getAllExercises(),
    getAllBodyParts(),
    getAllEquipments(),
    getAllTargetMuscles(),
  ]);

  return [
    {
      url: siteUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: siteUrl + '/exercises',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: siteUrl + '/body-parts',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: siteUrl + '/equipments',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: siteUrl + '/target-muscles',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: siteUrl + '/routines',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: siteUrl + '/routine-category',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...exercises.map((exercise) => ({
      url: siteUrl + '/exercises/' + exercise.id_,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...bodyParts.map((bodyPart) => ({
      url: siteUrl + '/body-parts/' + encodeURIComponent(bodyPart.bodyPart),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...equipments.map((equipment) => ({
      url: siteUrl + '/equipments/' + encodeURIComponent(equipment.equipment),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...targetMuscles.map((targetMuscle) => ({
      url: siteUrl + '/target-muscles/' + encodeURIComponent(targetMuscle.targetMuscle),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
