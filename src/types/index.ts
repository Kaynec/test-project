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

// Form
export type SubmitFormRequestBody = {
  form_type: "public" | "private" | null;
  form_title: string;
  description: string;
  sections: {
    title: string;
    type: string;
    required: boolean;
    properties: Record<string, unknown>[];
  }[];
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
