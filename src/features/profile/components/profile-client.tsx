'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useProfile } from '@/features/profile/services/use-get-profile';
import { useUpdateProfile } from '@/features/profile/services/use-patch-profile';
import { useUpdateSettings } from '@/features/profile/services/use-patch-settings';
import { useError } from '@/hooks/use-error';
import { useQueryErrorHandler } from '@/hooks/use-query-error-handler';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ruler, Save, Settings, User } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const profileSchema = z.object({
  heightCm: z
    .string()
    .refine(
      (val) => val === '' || (!isNaN(Number(val)) && Number(val) >= 50 && Number(val) <= 300),
      { message: 'Height must be between 50 and 300 cm' },
    ),
  goal: z.enum(['muscle_gain', 'fat_loss', 'strength', 'general_fitness']).optional(),
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
});

const settingsSchema = z.object({
  unitPreference: z.enum(['metric', 'imperial']),
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type SettingsFormValues = z.infer<typeof settingsSchema>;

const GOALS = [
  { value: 'muscle_gain', label: 'Build Muscle' },
  { value: 'fat_loss', label: 'Lose Fat' },
  { value: 'strength', label: 'Build Strength' },
  { value: 'general_fitness', label: 'General Fitness' },
] as const;

const EXPERIENCE_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
] as const;

const cardBaseClass =
  'relative overflow-hidden rounded-2xl border border-black/20 bg-gray-50 p-6 shadow-lg shadow-amber-900/20 transition-all duration-300 hover:shadow-xl dark:border-gray-800 dark:bg-black dark:shadow-pink-500/20';

const topHighlightClass =
  'pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-500/70 to-transparent dark:via-pink-400/60';

const sectionIconClass =
  'flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-gray-800';

const inputClass =
  'border-black/20 bg-white pl-10 text-amber-900 placeholder:text-amber-600/40 focus-visible:border-amber-600 focus-visible:ring-amber-400/40 dark:border-gray-800 dark:bg-black dark:text-white dark:placeholder:text-gray-600 dark:focus-visible:border-pink-400 dark:focus-visible:ring-pink-400/30';

const labelClass = 'font-montserrat text-sm font-semibold text-amber-800 dark:text-gray-300';

export default function ProfileClient() {
  const { isLoading, data: profile, error, refetch, isRefetching } = useProfile();
  const updateProfile = useUpdateProfile();
  const updateSettings = useUpdateSettings();
  const { handleError } = useError();

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      heightCm: '',
      goal: undefined,
      experienceLevel: undefined,
    },
  });

  const settingsForm = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      unitPreference: 'metric',
    },
  });

  useEffect(() => {
    if (profile) {
      profileForm.reset({
        heightCm: profile.profile?.heightCm ? String(profile.profile.heightCm) : '',
        goal: profile.profile?.goal || undefined,
        experienceLevel: profile.profile?.experienceLevel || undefined,
      });
      settingsForm.reset({
        unitPreference: profile.settings?.unitPreference || 'metric',
      });
    }
  }, [profile, profileForm, settingsForm]);

  useQueryErrorHandler(error, refetch);

  const onProfileSubmit = (values: ProfileFormValues) => {
    updateProfile.mutate(
      {
        heightCm: values.heightCm === '' ? undefined : Number(values.heightCm),
        goal: values.goal,
        experienceLevel: values.experienceLevel,
      },
      {
        onError: (err) => handleError(err, { title: 'Failed to update profile' }),
      },
    );
  };

  const onSettingsSubmit = (values: SettingsFormValues) => {
    updateSettings.mutate(
      { unitPreference: values.unitPreference },
      {
        onError: (err) => handleError(err, { title: 'Failed to update settings' }),
      },
    );
  };

  if (isLoading || isRefetching) {
    return (
      <div className='h-full w-full pb-12'>
        <Skeleton className='mb-4 h-10 w-1/3 rounded-xl' />
        <Skeleton className='mb-8 h-6 w-1/2 rounded-xl' />
        <div className='grid grid-cols-1 items-start gap-8 lg:grid-cols-12'>
          <div className='flex flex-col gap-8 lg:col-span-8'>
            <Skeleton className='h-96 w-full rounded-2xl' />
            <Skeleton className='h-40 w-full rounded-2xl' />
          </div>
          <div className='sticky top-24 flex flex-col gap-6 lg:col-span-4'>
            <Skeleton className='h-72 w-full rounded-2xl' />
          </div>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className='h-full w-full pb-12'>
      <header className='mb-8'>
        <h1 className='font-poppins text-3xl font-bold text-amber-900 dark:text-white'>
          Profile & Settings
        </h1>
        <p className='font-montserrat mt-1 text-amber-700 dark:text-gray-400'>
          Manage your account details and application preferences.
        </p>
      </header>

      <div className='grid grid-cols-1 items-start gap-8 lg:grid-cols-12'>
        <div className='flex flex-col gap-8 lg:col-span-8'>
          {/* Account Settings */}
          <section className={cardBaseClass}>
            <div className={topHighlightClass} />
            <div className='mb-6 flex items-center gap-3'>
              <div className={sectionIconClass}>
                <User className='h-5 w-5 text-amber-700 dark:text-pink-400' />
              </div>
              <h2 className='font-poppins text-xl font-bold text-amber-900 dark:text-white'>
                Account Settings
              </h2>
            </div>

            <Form {...profileForm}>
              <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className='space-y-6'>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  {/* Read-only fields */}
                  <div className='flex flex-col gap-2'>
                    <label className={labelClass}>Full Name</label>
                    <div className='relative'>
                      <User className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-amber-600/50 dark:text-gray-500' />
                      <Input
                        defaultValue={profile.name}
                        disabled
                        className={`${inputClass} opacity-70`}
                      />
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label className={labelClass}>Email Address</label>
                    <div className='relative'>
                      <User className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-amber-600/50 dark:text-gray-500' />
                      <Input
                        type='email'
                        defaultValue={profile.email}
                        disabled
                        className={`${inputClass} opacity-70`}
                      />
                    </div>
                  </div>

                  {/* Editable fields */}
                  <FormField
                    control={profileForm.control}
                    name='heightCm'
                    render={({ field }) => (
                      <FormItem className='flex flex-col gap-2'>
                        <FormLabel className={labelClass}>Height (cm)</FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <Ruler className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-amber-600/50 dark:text-gray-500' />
                            <Input
                              type='number'
                              placeholder='e.g. 175'
                              {...field}
                              className={inputClass}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className='text-xs text-red-600 dark:text-red-400' />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name='experienceLevel'
                    render={({ field }) => (
                      <FormItem className='flex flex-col gap-2'>
                        <FormLabel className={labelClass}>Experience Level</FormLabel>
                        <Select value={field.value || ''} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className='border-black/20 bg-white text-amber-900 dark:border-gray-800 dark:bg-black dark:text-white'>
                              <SelectValue placeholder='Select level' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {EXPERIENCE_LEVELS.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
                                {level.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className='text-xs text-red-600 dark:text-red-400' />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name='goal'
                    render={({ field }) => (
                      <FormItem className='flex flex-col gap-2 md:col-span-2'>
                        <FormLabel className={labelClass}>Primary Goal</FormLabel>
                        <Select value={field.value || ''} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className='border-black/20 bg-white text-amber-900 dark:border-gray-800 dark:bg-black dark:text-white'>
                              <SelectValue placeholder='Select a goal' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {GOALS.map((g) => (
                              <SelectItem key={g.value} value={g.value}>
                                {g.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className='text-xs text-red-600 dark:text-red-400' />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='flex justify-end'>
                  <Button
                    type='submit'
                    disabled={updateProfile.isPending}
                    className='flex items-center gap-2 bg-amber-700 text-white transition-all hover:bg-amber-800 active:scale-95 dark:bg-pink-700 dark:hover:bg-pink-800'
                  >
                    <Save className='h-4 w-4' />
                    {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </Form>
          </section>

          {/* App Preferences */}
          <section className={cardBaseClass}>
            <div className={topHighlightClass} />
            <div className='mb-6 flex items-center gap-3'>
              <div className={sectionIconClass}>
                <Settings className='h-5 w-5 text-amber-700 dark:text-pink-400' />
              </div>
              <h2 className='font-poppins text-xl font-bold text-amber-900 dark:text-white'>
                App Preferences
              </h2>
            </div>

            <Form {...settingsForm}>
              <form onSubmit={settingsForm.handleSubmit(onSettingsSubmit)} className='space-y-6'>
                <div className='flex items-center justify-between rounded-xl border border-black/20 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
                  <div className='flex flex-col'>
                    <span className='font-montserrat text-sm font-semibold text-amber-900 dark:text-white'>
                      Unit System
                    </span>
                    <span className='font-montserrat text-xs text-amber-700 dark:text-gray-400'>
                      Select your preferred measurement units.
                    </span>
                  </div>
                  <FormField
                    control={settingsForm.control}
                    name='unitPreference'
                    render={({ field }) => (
                      <FormItem className='space-y-0'>
                        <FormControl>
                          <div className='flex items-center rounded-lg border border-black/20 bg-gray-50 p-1 dark:border-gray-800 dark:bg-gray-900'>
                            <button
                              type='button'
                              onClick={() => {
                                field.onChange('metric');
                                settingsForm.handleSubmit(onSettingsSubmit)();
                              }}
                              className={`font-montserrat rounded-md px-4 py-1.5 text-sm font-medium transition-all ${
                                field.value === 'metric'
                                  ? 'bg-amber-700 text-white shadow-sm dark:bg-pink-700'
                                  : 'text-amber-700 hover:text-amber-900 dark:text-gray-400 dark:hover:text-white'
                              }`}
                            >
                              Metric
                            </button>
                            <button
                              type='button'
                              onClick={() => {
                                field.onChange('imperial');
                                settingsForm.handleSubmit(onSettingsSubmit)();
                              }}
                              className={`font-montserrat rounded-md px-4 py-1.5 text-sm font-medium transition-all ${
                                field.value === 'imperial'
                                  ? 'bg-amber-700 text-white shadow-sm dark:bg-pink-700'
                                  : 'text-amber-700 hover:text-amber-900 dark:text-gray-400 dark:hover:text-white'
                              }`}
                            >
                              Imperial
                            </button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </section>
        </div>

        {/* Right sidebar */}
        <div className='sticky top-24 flex flex-col gap-6 lg:col-span-4'>
          <div className='relative overflow-hidden rounded-2xl border border-black/20 bg-gray-50 p-6 shadow-lg shadow-amber-900/20 dark:border-gray-800 dark:bg-black dark:shadow-pink-500/20'>
            <div className={topHighlightClass} />
            <div className='absolute -top-10 -right-10 h-32 w-32 rounded-full bg-amber-500/10 blur-xl dark:bg-pink-500/10' />
            <div className='relative z-10 flex flex-col items-center gap-2 text-center'>
              <div className='mb-2 h-24 w-24 overflow-hidden rounded-full border-4 border-white/50 shadow-lg dark:border-gray-700'>
                <Image
                  src='/img.webp'
                  alt='Profile avatar'
                  width={96}
                  height={96}
                  className='h-full w-full object-cover'
                />
              </div>
              <span className='font-montserrat inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold tracking-wider text-amber-900 uppercase dark:bg-gray-800 dark:text-pink-400'>
                Pro Member
              </span>
              <h3 className='font-poppins mt-2 text-lg font-bold text-amber-900 dark:text-white'>
                {profile.name}
              </h3>
              <p className='font-montserrat text-sm text-amber-700 dark:text-gray-400'>
                {profile.profile?.experienceLevel
                  ? `${profile.profile.experienceLevel.charAt(0).toUpperCase() + profile.profile.experienceLevel.slice(1)} Athlete`
                  : 'Fitness Enthusiast'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
