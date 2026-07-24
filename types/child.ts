export type Gender = "MALE" | "FEMALE";

export interface Child {
  id: string;
  name: string;
  birthDate: string; // ISO date string, e.g. "2018-05-14"
  gender: Gender;
}

export interface CreateChildRequest {
  name: string;
  birthDate: string; // ISO date string dari input type="date"
  gender: Gender;
}

export type UpdateChildRequest = Partial<CreateChildRequest>;