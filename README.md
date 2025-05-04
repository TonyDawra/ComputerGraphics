# Advance Snake

An arcade-style, web-based “Snake” game with shooting mechanics, level progression, and an engaging backstory.

---

## Table of Contents

1. [Game Concept & Scope](#game-concept--scope)  
2. [Story](#story)  
3. [Features & Mechanics](#features--mechanics)  
4. [Controls](#controls)  
5. [Game World & Levels](#game-world--levels)  
6. [Player Interface](#player-interface)  
7. [Technical Details](#technical-details)  
8. [Assets & Animation](#assets--animation)  
9. [Sounds](#sounds)  
10. [Future Improvements](#future-improvements)  

---

## Game Concept & Scope

**Title:** Advance Snake  
**Genre:** Arcade  
**Platform:** Web (HTML5, JavaScript)  

You guide a growing snake through three abstract grid-based levels. Eat food to grow, avoid collisions, and shoot obstacles. Survive all three levels to win!

---

## Story

After a lifetime of bullying for being small and colorful, the lone snake stumbles upon a mystical sun-snake statue deep in the jungle. Upon touching it, he’s transported to a divine realm. The gods decree: “Eat as many apples as possible to grow strong—and claim your revenge.” Thus begins the snake’s epic journey to become mighty and vindicated.

---

## Features & Mechanics

- **Movement**  
  - Grid-based movement using the arrow keys.  
- **Growth Mechanic**  
  - Each food item eaten makes the snake longer.  
- **Shooting Mechanic**  
  - Press **Spacebar** to fire bullets in the current moving direction.  
- **Collision Detection**  
  - Game over if the snake collides with:
    - Itself  
    - Canvas edges  
    - Level-specific obstacles  
- **Level Progression**  
  - Three distinct levels; clearing all three triggers victory.  

---

## Controls

| Action            | Key        |
|-------------------|------------|
| Move Up           | ↑ Arrow    |
| Move Down         | ↓ Arrow    |
| Move Left         | ← Arrow    |
| Move Right        | → Arrow    |
| Shoot             | Spacebar   |
| Pause             | P          |
| Resume            | R          |
| Mute / Unmute     | M          |

---

## Game World & Levels

- **Grid Layout**  
  - The playfield is a clean, grid-based canvas. Each tick moves the snake one cell.  
- **Food Placement**  
  - Apples spawn at random free cells each time one is eaten.  
- **Obstacles**  
  - Each level introduces new static obstacles to avoid.  
- **Level Goals**  
  - Eat a target number of apples to unlock the next level.

---

## Player Interface

- **Game Menu**  
  - How to Play instructions, Pause, Resume, Mute.  
- **Scoreboard**  
  - Current score per level; cumulative total shown at the end.  
- **Win / Lose Messages**  
  - Dynamic prompts with final score and encouragement to replay.  
- **Confirmations**  
  - Prompt before resetting or reloading
