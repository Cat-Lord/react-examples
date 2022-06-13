import type { FishingGround } from "../graphql/generated/graphql-gen";

// Attendance object that gets send to server
export type Attendance = {
  fishingGround: FishingGround;
  numberOfVisits: number;
  catches: NewCatch[];
};

export type AttendanceContextProps = {
  allFish: Fish[];
  allFishingGround: FishingGround[];
  catches: NewCatch[];
  setCatches: Dispatch<SetStateAction<NewCatch[]>>;
};

// Form Values
export type AttendanceFormValues = AddCatchFormValues & {
  selectedFishingGround: string;
  numberOfVisits: number;
};

export type AddCatchFormValues = {
  selectedFish: string;
  caughtFishAmount: number;
  caughtFishTotalWeight: number;
};


export type CreateAttendanceProps = {
  attendances: Attendance[];

  isSubmitting?: boolean;
  initialFormValues?: AttendanceFormValues;
  handleSubmit: (values: AttendanceFormValues, actions: FormikHelpers<AttendanceFormValues>) => Promise<void>;
  validate: (values: AttendanceFormValues) => FormikErrors<AttendanceFormValues> | undefined;
};


export type AddCatchProps = {
  isSubmitting?: boolean;
};

export type AddCatchFormProps = {
  addCatchToTable: (event: React.MouseEvent<HTMLElement>) => Promise<void>;
  isSubmitting?: boolean;
};