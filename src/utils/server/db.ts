import { Person } from "@/utils/common/person";
import { mockUsers } from "@/utils/server/mock-users";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPersonFromDB = async (person: Person) => {
  const user = await prisma.user.findFirst({
    where: { name: person },
    include: { companies: true },
  });
  return user;
};
