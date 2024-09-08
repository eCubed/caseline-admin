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
  normalizedName: string;
}

export interface EditCaseModel {
  id: number;
  name: string;
  normalizedName: string;
  body: string;
  assertions: EditAssertionModel[];
}

export interface DisplayCaseModel {
  name: string
  normalizedName: string;
  body: string;
  assertions: DisplayAssertionModel[];
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

export interface DisplayAssertionModel {
  name: string
  body: string;
  evidences: DisplayEvidenceModel[];
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

export interface DisplayEvidenceModel {
  body: string;
  incidentDate?: Date;
}

export interface EditEvidenceModel {
  id: number;
  body: string;
  incidentDate?: Date;
  weight: number;
}
