# TreeTrav.bin

<p align="center">
  <strong>Interactive binary tree traversal: build a tree and step through orders.</strong><br>
  Vanilla HTML, CSS, and JavaScript. No build step.
</p>

<p align="center">
  <a href="https://case-study-4-dsa-g3.vercel.app/">Live Demo</a>
  &nbsp;&middot;&nbsp;
  <a href="https://cikeyz.github.io/treetrav-bin/">GitHub Pages</a>
  &nbsp;&middot;&nbsp;
  <a href="#quick-start">Quick Start</a>
  &nbsp;&middot;&nbsp;
  <a href="#project-structure">Structure</a>
  &nbsp;&middot;&nbsp;
  <a href="#license">License</a>
</p>

<p align="center">
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white">
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?logo=css&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=111111">
  <img alt="License MIT" src="https://img.shields.io/badge/License-MIT-22c55e?logo=open-source-initiative&logoColor=white">
</p>

## Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [License](#license)
- [Course Note](#course-note)

## Overview

TreeTrav.bin lets you generate or randomize a binary tree and visualize classic
traversal orders. The UI is built for classroom demos: generate, traverse, and
toggle theme without a framework.

## Features

| Feature | Description |
|---------|-------------|
| Generate tree | Build a tree from inputs or random data |
| Traversals | Walk the tree in standard orders with visual feedback |
| Theme toggle | Light and dark presentation |
| Static deploy | Opens as plain files or static hosting |

## Quick Start

```bash
git clone https://github.com/cikeyz/treetrav-bin.git
cd treetrav-bin
python -m http.server 8000
```

Open http://127.0.0.1:8000/

## Project Structure

```text
treetrav-bin/
├── index.html
├── script.js
├── styles.css
├── LICENSE
├── README.md
└── .gitignore
```

## License

MIT. See [LICENSE](LICENSE).

## Course Note

Built for CMPE 201 (Data Structures and Algorithms), Polytechnic University of
the Philippines, under Engr. Julian L. Lorico Jr.. Final project case study.
Published here as a standalone project.
