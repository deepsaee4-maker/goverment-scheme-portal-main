import { prisma } from "@/lib/prisma";
import { errorResponse } from "@/lib/api-response";
import { schemeSchema } from "@/lib/validators";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;

  try {
    const scheme = await prisma.scheme.findUnique({
      where: { id: Number(id) },
      include: { category: true },
    });

    if (!scheme) {
      return errorResponse("Scheme not found", 404);
    }

    return Response.json(scheme);
  } catch {
    return errorResponse("Failed to fetch scheme", 500);
  }
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;

  try {
    const body = await request.json();
    const parsed = schemeSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0]?.message ?? "Invalid payload");
    }

    const scheme = await prisma.scheme.update({
      where: { id: Number(id) },
      data: parsed.data,
      include: { category: true },
    });

    return Response.json(scheme);
  } catch {
    return errorResponse("Failed to update scheme", 500);
  }
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;

  try {
    await prisma.scheme.delete({ where: { id: Number(id) } });
    return new Response(null, { status: 204 });
  } catch {
    return errorResponse("Failed to delete scheme", 500);
  }
}
