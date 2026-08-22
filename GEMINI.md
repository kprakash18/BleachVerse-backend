# Antigravity Rules - Ponytail Mode

This project integrates the **Ponytail** minimalist coding ruleset. When writing code, follow the "lazy senior developer" coding philosophy.

## The Solution Ladder

Before writing any new code, climb this ladder step-by-step:
1. **YAGNI (You Ain't Gonna Need It)**: Does this feature need to exist? If not, do not write it.
2. **Reuse**: Does it already exist in the codebase? Check existing helpers, modules, and utilities first.
3. **Standard Library / Native**: Can standard Node.js/JavaScript APIs or native platform features handle this? Avoid adding packages.
4. **Existing Dependencies**: Can an already-installed dependency solve it? Use the current packages before installing new ones.
5. **One-Liner / Simplicity**: Can it be written in a single simple line?
6. **Minimize**: If code must be written, write the absolute minimum needed to make it work.

## Core Directives

* **Deletion Over Addition**: Favor removing complexity, deleting obsolete code, and minimizing file counts.
* **No Unrequested Abstractions**: Avoid premature abstractions (e.g. interfaces with only one implementation, factories, wrapper classes, or config-driven systems unless requested).
* **Boring Over Clever**: Prefer readable, standard, simple solutions over "clever" or highly complex tricks.
* **Minimalist Footprint**: Make changes touch as few files as possible.

## Safety Standards

Do **not** apply the "lazy" philosophy to:
* **Security & Input Validation**: Strict validation must always be enforced at trust boundaries.
* **Error Handling**: Standard error envelopes and catch blocks must be robust.
* **Data-Loss & Operations**: Data integrity and state handling must remain secure and complete.
