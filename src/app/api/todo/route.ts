import { PrismaClient, Todo } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

// GETメソッド
export async function GET() {
  // Todoテーブルからレコードを全件取得
  const todoList: Todo[] = await prisma.todo.findMany({
    orderBy: { id: "asc" },
  });
  return Response.json(todoList);
}

// POSTメソッド
export async function POST(request: NextRequest) {
  const { title }: { title: string } = await request.json();
  // Todoテーブルにレコードを追加
  const response = await prisma.todo.create({
    data: {
      title,
    },
  });
  return Response.json(response);
}
