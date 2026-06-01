export interface IBackendProfile {
  heightCm?: number;
  goal?: 'fat_loss' | 'muscle_gain' | 'strength' | 'general_fitness';
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: string;
}

export interface IBackendSettings {
  unitPreference?: 'metric' | 'imperial';
}

export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  profile: IBackendProfile | null;
  settings: IBackendSettings | null;
  createdAt: string;
  updatedAt: string;
}

export interface IProfileResponse {
  data: IUserProfile;
}

export interface IUpdateProfilePayload {
  heightCm?: number;
  goal?: 'fat_loss' | 'muscle_gain' | 'strength' | 'general_fitness';
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: string;
}

export interface IUpdateSettingsPayload {
  unitPreference?: 'metric' | 'imperial';
}
