import { type Express, type Request, type Response } from "express";
import { db } from "./database";
import { postsTable } from "./db/schema";
import { eq } from "drizzle-orm";

export const initializeAPI = (app: Express) => {

  // GET all posts
  app.get("/posts", async (req: Request, res: Response) => {
    const posts = await db.select().from(postsTable);
    res.send(posts);
  });

  // POST new post
  app.post("/posts", async (req: Request, res: Response) => {
    const newPost = await db
      .insert(postsTable)
      .values({ content: req.body.content })
      .returning();

    res.send(newPost[0]);
  });

  // PUT update post
  app.put("/posts/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const updatedPost = await db
      .update(postsTable)
      .set({ content: req.body.content })
      .where(eq(postsTable.id, id))
      .returning();

    if (updatedPost.length === 0) {
      res.status(404).send("Post not found");
      return;
    }

    res.send(updatedPost[0]);
  });

  // DELETE post
  app.delete("/posts/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    await db
      .delete(postsTable)
      .where(eq(postsTable.id, id));

    res.send({ id });
  });
};