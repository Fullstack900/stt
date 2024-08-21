import { Company, CompanyName } from "../common/company";

export const mockCompanies: { [key in CompanyName]: Company | null } = {
  [CompanyName.CompanyA]: {
    name: "Seven Sigma Group",
  },
  [CompanyName.CompanyB]: {
    name: "Facebook",
  },
  [CompanyName.CompanyC]: {
    name: "Google",
  },
};
