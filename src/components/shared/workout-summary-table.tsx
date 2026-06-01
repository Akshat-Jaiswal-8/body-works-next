import { memo } from 'react';

interface IworkoutSummary {
  MainGoal: string;
  WorkoutType: string;
  TrainingLevel: string;
  ProgramDuration: string;
  DaysPerWeek: number;
  TimePerWorkout: string;
  EquipmentRequired: string;
  TargetGender: string;
}

export const WorkoutSummaryTable = memo(({ data }: { data: IworkoutSummary }) => {
  const keys: (keyof IworkoutSummary)[] = Object.keys(data) as (keyof IworkoutSummary)[];

  return (
    <table className='w-full xl:text-xl'>
      <tbody>
        {keys.map((key) => (
          <tr
            className='border-b border-dashed border-amber-900 last:border-none dark:border-gray-600'
            key={key}
          >
            <td className='font-montserrat border-r border-dashed border-amber-900 p-4 font-semibold text-amber-700 dark:border-gray-600 dark:text-gray-200'>
              {key}
            </td>
            <td className='text-amber-70 font-montserrat p-4 font-semibold text-amber-700 dark:text-gray-200'>
              {data[key]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

WorkoutSummaryTable.displayName = 'WorkoutSummaryTable';
