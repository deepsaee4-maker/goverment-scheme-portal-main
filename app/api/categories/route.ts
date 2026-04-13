import { prisma } from "@/lib/prisma";
import { errorResponse } from "@/lib/api-response";
import { categorySchema } from "@/lib/validators";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    return Response.json(categories);
  } catch {
    return errorResponse("Failed to fetch categories", 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = categorySchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0]?.message ?? "Invalid payload");
    }

    const category = await prisma.category.create({ data: parsed.data });
    return Response.json(category, { status: 201 });
  } catch {
    return errorResponse("Failed to create category", 500);
  }
}
