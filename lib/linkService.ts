import { prisma } from "./db";
import { generateCode } from "@/utils/generateCode";
import { isValidUrl } from "@/utils/validateUrl";

export async function createLink(targetUrl: string, customCode?: string) {
  if (!isValidUrl(targetUrl)) {
    throw new Error("Invalid URL");
  }

  let code = customCode || generateCode(6);

  // Ensure unique code
  const exists = await prisma.link.findUnique({ where: { code } });

  if (exists) {
    if (customCode) {
      throw new Error("Code already exists");
    }
    code = generateCode(6); // regenerate if random collided
  }

  const link = await prisma.link.create({
    data: {
      code,
      targetUrl,
    },
  });

  return link;
}

export async function getLink(code: string) {
  return prisma.link.findUnique({ where: { code } });
}

export async function getAllLinks() {
  return prisma.link.findMany({
    where: { deleted: false },
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteLink(code: string) {
  return prisma.link.update({
    where: { code },
    data: { deleted: true },
  });
}

export async function incrementClick(code: string) {
  return prisma.link.update({
    where: { code },
    data: {
      totalClicks: { increment: 1 },
      lastClicked: new Date(),
    },
  });
}
