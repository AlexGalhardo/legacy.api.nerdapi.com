/*
  Warnings:

  - A unique constraint covering the columns `[cover_image]` on the table `games` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[igdb_url]` on the table `games` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[metacritic_url]` on the table `games` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "games_cover_image_key" ON "games"("cover_image");

-- CreateIndex
CREATE UNIQUE INDEX "games_igdb_url_key" ON "games"("igdb_url");

-- CreateIndex
CREATE UNIQUE INDEX "games_metacritic_url_key" ON "games"("metacritic_url");
