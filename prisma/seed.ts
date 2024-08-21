import { PrismaClient } from "@prisma/client";
import { mockUsers } from "../src/utils/server/mock-users";
import { mockCompanies } from "../src/utils/server/mock-companies";
import { Person, User } from "../src/utils/common/person";
import { CompanyName, Company } from "../src/utils/common/company";

const prisma = new PrismaClient();

async function main() {
  // Add companies into the database
  for (const companyName of Object.values(CompanyName)) {
    const company: Company | null = mockCompanies[companyName];
    if (company) {
      await prisma.company.create({
        data: company,
      });
    }
  }

  // Add users into the database
  for (const person of Object.values(Person)) {
    const user: User | null = mockUsers[person];
    if (user) {
      await prisma.user.create({
        data: {
          name: user.name,
          title: user.title,
          backgroundImageUrl: user.backgroundImageUrl,
          profilePictureUrl: user.profilePictureUrl,
          followers: user.followers,
          following: user.following,
          companies: {
            connect: user.companyIds?.map((id: number) => ({ id })),
          },
        },
      });
    }
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
