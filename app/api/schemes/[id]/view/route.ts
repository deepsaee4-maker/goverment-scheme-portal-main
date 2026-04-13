import { prisma } from "@/lib/prisma";
import { errorResponse } from "@/lib/api-response";

type Params = {
  params: Promise<{ id: string }>;
};

export async function POST(_: Request, { params }: Params) {
  const { id } = await params;

  try {
    const updated = await prisma.scheme.update({
      where: { id: Number(id) },
      data: { views: { increment: 1 } },
      select: { id: true, views: true },
    });

    return Response.json(updated);
  } catch {
    return errorResponse("Failed to increment view count", 500);
  }
}
