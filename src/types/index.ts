// Signup
export type SignupRequestBody = {
  email: string;
  password: string;
};

export type SignupResponseBody = {
  data: {
    access: string;
    refresh: string;
  };
  status: number;
  ok: string;
}; // Based on the Swagger spec

// Refresh
export type RefreshRequestBody = undefined; // No request body

export type RefreshResponseBody = string; // Based on the Swagger spec

export type SubmitFormRequestBody = Omit<
  DataEntity,
  "form_id" | "created_at"
> & {
  form_id?: string;
  sections: SectionsEntity[];
};

export type SubmitFormResponseBody = string; // Based on the Swagger spec

// Get Form
export type GetFormRequestBody = undefined; // No request body

export type GetFormResponseBody = string; // Based on the Swagger spec

// Update Form
export type UpdateFormRequestBody = SubmitFormRequestBody; // Assuming the same request body as Create Form

export type UpdateFormResponseBody = string; // Based on the Swagger spec

// Delete Form
export type DeleteFormRequestBody = undefined; // No request body

export type DeleteFormResponseBody = string; // Based on the Swagger spec

// Get Forms
export type GetFormsRequestBody = undefined; // No request body

export type GetFormsResponseBody = string; // Based on the Swagger spec

// Generic error response export type
export type ErrorResponse = {
  detail: {
    loc: (string | number)[];
    msg: string;
    type: string;
  }[];
};

export type SectionError = {
  title: string;
  type: string;
  properties: string[];
};

export type FormError = {
  form_title: string;
  description: string;
  form_type: string;
  sections: SectionError[];
};

export type FormModifyResponse = {
  data: Record<string, any>;
  status: number;
  ok: string;
}; // Based on the Swagger spec

export interface FormListApiResponse {
  ok: boolean;
  status: number;
  data: Data;
}
export interface FormApiResponse {
  ok: boolean;
  status: number;
  data: DataEntity;
}
export interface Data {
  totla_quantity: number;
  data?: DataEntity[] | null;
}
export interface DataEntity {
  form_id: string;
  form_type: string;
  form_title: string;
  description: string;
  sections?: SectionsEntity[] | null;
  created_at: number;
}
export interface SectionsEntity {
  title: string;
  type: string;
  required: boolean;
  properties?: (string | null)[] | null;
}
