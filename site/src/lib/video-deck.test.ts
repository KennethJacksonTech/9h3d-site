import assert from "node:assert/strict";
import { test } from "node:test";
import {
  KAREN_WOLFRAM_RECENT,
  PREVIOUS_GRID_COUNT,
  swapFeatured,
  takeDeck,
} from "./video-deck";

const deck = takeDeck(KAREN_WOLFRAM_RECENT);

test("the deck is the newest episode plus nine previous videos", () => {
  assert.equal(PREVIOUS_GRID_COUNT, 9);
  assert.equal(deck.length, 10);
  assert.equal(deck[0].videoId, "O50d_WHjBto");
  assert.equal(deck[1].videoId, "3-SZkomWwJo");
});

test("choosing a previous video swaps it into the player", () => {
  const swapped = swapFeatured(deck, 0);
  assert.equal(swapped[0].videoId, "3-SZkomWwJo");
  assert.equal(swapped[1].videoId, "O50d_WHjBto");
  assert.equal(swapped[2].videoId, deck[2].videoId);
  assert.equal(deck[0].videoId, "O50d_WHjBto");
});

test("swapping the last grid cell exchanges only that cell", () => {
  const swapped = swapFeatured(deck, 8);
  assert.equal(swapped[0].videoId, deck[9].videoId);
  assert.equal(swapped[9].videoId, deck[0].videoId);
  assert.equal(swapped[8].videoId, deck[8].videoId);
});

test("a grid index outside the deck leaves the order alone", () => {
  assert.equal(swapFeatured(deck, 9), deck);
  assert.equal(swapFeatured(deck, -1), deck);
});
