import { PrismaClient, Todo } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

// PATCHメソッド
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const { updateType, updateTodo }: { updateType: string; updateTodo: Todo } =
    await request.json();
  // updateTypeの値によって処理を分岐
  switch (updateType) {
    // 「完了」ボタンを押した時の処理
    case "complete": {
      const response = await prisma.todo.update({
        where: {
          id,
        },
        data: {
          completed: true,
          completedAt: new Date(),
        },
      });
      return Response.json(response);
    }

    // 「戻す」ボタンを押した時の処理
    case "incomplete": {
      const response = await prisma.todo.update({
        where: {
          id,
        },
        data: {
          completed: false,
          completedAt: null,
        },
      });
      return Response.json(response);
    }

    // 「保存」ボタンを押した時の処理（タイトルのみ更新）
    case "saveTitle": {
      const response = await prisma.todo.update({
        where: {
          id,
        },
        data: {
          title: updateTodo.title,
        },
      });
      return Response.json(response);
    }

    // 「保存」ボタンを押した時の処理（ToDoを更新）
    case "saveTodo": {
      const response = await prisma.todo.update({
        where: {
          id,
        },
        data: {
          title: updateTodo.title,
          dayLimit: updateTodo.dayLimit,
          memo: updateTodo.memo,
        },
      });
      return Response.json(response);
    }
  }
}

// DELETEメソッド
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const response = await prisma.todo.delete({
    where: {
      id,
    },
  });
  return Response.json(response);
}
