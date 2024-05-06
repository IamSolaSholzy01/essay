import prisma from "@/lib/db";
import { NextRequest } from "next/server";
interface Application {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  country: string;
  street: string;
  bio?: string;
  school: string;
  state: string;
  city: string;
  department: string;
  level: string;
  title: string;
  summary: string;
  comments?: string;
}
export async function POST(request: NextRequest) {
  const body: Application = await request.json();
  if (!body) {
    return Response.json({ message: "No body provided" });
  }
  if (!body.email) {
    return Response.json({ message: "No email provided" });
  }

  try {
    await prisma.application
      .create({
        data: {
          ...body,
        },
      })
      .then((r) => {
        return {
          message: "Your application has been received. Thank you!",
          body: r,
        };
      });
  } catch (error) {}

  return Response.json({ message: "Received response", body });
}
