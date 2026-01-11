import { and, eq, lte, or } from "drizzle-orm";
import { db } from "../db/database.js";
import { collection, flashcard, revision, user } from "../db/schema.js";

export const getFlashcards = async (request, response) => {
  try {
    const params = request.params;

    const [targetCollection] = await db
      .select()
      .from(collection)
      .where(eq(collection.id, params.id));

    const [requestingUser] = await db.select().from(user).where(eq(user.id, request.user.userId))

    if (
      !targetCollection.public &&
      targetCollection.userId != request.user.userId && !requestingUser.admin
    ) {
      response.status(403).json({
        error: "Unauthorized to get flashcards...",
      });
    }

    const selectedFlashcards = await db
      .select()
      .from(flashcard)
      .where(eq(flashcard.collectionId, targetCollection.id));

    response.status(200).json(selectedFlashcards);
  } catch (error) {
    console.error(error);
    response.status(500).json({
      error: "Failed to get flashcards...",
    });
  }
};

export const getFlashcardsToLearn = async (request, response) => {
  try {
    const params = request.params;

    const [targetCollection] = await db
      .select()
      .from(collection)
      .where(eq(collection.id, params.id));

    const [requestingUser] = await db.select().from(user).where(eq(user.id, request.user.userId))

    if (targetCollection.userId != request.user.userId && !requestingUser.admin) {
      response.status(403).json({
        error: "Unauthorized to get flashcards...",
      });
    }

    let now = new Date();

    const JOUR_EN_MS = 24 * 60 * 60 * 1000;

    const levelToDate = {
      1: new Date(now.getTime() - 1 * JOUR_EN_MS),
      2: new Date(now.getTime() - 2 * JOUR_EN_MS),
      3: new Date(now.getTime() - 4 * JOUR_EN_MS),
      4: new Date(now.getTime() - 8 * JOUR_EN_MS),
      5: new Date(now.getTime() - 16 * JOUR_EN_MS),
    };

    const selectedFlashcards = await db
      .select()
      .from(flashcard)
      .innerJoin(revision, eq(flashcard.id, revision.flashcardId))
      .where(
        and(
          eq(flashcard.collectionId, targetCollection.id),
          eq(revision.userId, request.user.userId),
          or(
            and(
              eq(revision.level, 1),
              lte(revision.lastRevisionDate, levelToDate[1])
            ),
            and(
              eq(revision.level, 2),
              lte(revision.lastRevisionDate, levelToDate[2])
            ),
            and(
              eq(revision.level, 3),
              lte(revision.lastRevisionDate, levelToDate[3])
            ),
            and(
              eq(revision.level, 4),
              lte(revision.lastRevisionDate, levelToDate[4])
            ),
            and(
              eq(revision.level, 5),
              lte(revision.lastRevisionDate, levelToDate[5])
            )
          )
        )
      );

    response.status(200).json(
      selectedFlashcards.map((item) => ({
        id: item.flashcard.id,
        frontText: item.flashcard.frontText,
        backText: item.flashcard.backText,
        collectionId: item.flashcard.collectionId,
        frontURL: item.flashcard.frontURL,
        backURL: item.flashcard.backURL,
        createdAt: item.flashcard.createdAt
      }))
    );
  } catch (error) {
    console.error(error);
    response.status(500).json({
      error: "Failed to get flashcards to learn...",
    });
  }
};
