export interface CreateCaseModel {
  name: string;
  body: string;
}

export interface UpdateCaseModel {
  name: string;
  body: string;
}

export interface PublicCaseDisplayModel {
  name: string;
  normalizedName: string;
}

export interface AdminCaseDisplayModel {
  id: number;
  name: string;
}

export interface EditCaseModel {
  id: number;
  name: string;
  normalizedName: string;
  body: string;
  assertions: EditAssertionModel[];
}

export interface CreateAssertionModel {
  name: string;
  body: string;
  caseId: number;
}

export interface UpdateAssertionModel {
  name: string;
  body: string;
}

export interface EditAssertionModel {
  id: number;
  name: string;
  body: string;
  evidences: EditEvidenceModel[];
}

export interface CreateEvidenceModel {
  body: string;
  incidentDate?: Date;
  weight: number;
  assertionId: number;
}

export interface UpdateEvidenceModel {
  body: string;
  incidentDate?: Date;
  weight: number;
}

export interface EditEvidenceModel {
  id: number;
  body: string;
  incidentDate?: Date;
  weight: number;
}
