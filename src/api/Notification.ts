import api from "./index";

export type ContactFormPayload = {
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export const sendEmail = async (payload: ContactFormPayload) => {
  return api.post("/notification/email", payload);
};
