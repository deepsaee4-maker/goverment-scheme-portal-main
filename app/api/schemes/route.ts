import { prisma } from "@/lib/prisma";
import { errorResponse } from "@/lib/api-response";
import { schemeSchema } from "@/lib/validators";

export async function GET() {
  try {
    const schemes = await prisma.scheme.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(schemes);
  } catch {
    return errorResponse("Failed to fetch schemes", 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schemeSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0]?.message ?? "Invalid payload");
    }

    const scheme = await prisma.scheme.create({
      data: parsed.data,
      include: { category: true },
    });

    return Response.json(scheme, { status: 201 });
  } catch {
    return errorResponse("Failed to create scheme", 500);
  }
}
