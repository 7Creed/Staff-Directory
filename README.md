# Staff Directory Web App

## Overview

This is a **Staff Directory** web application built as a take-home assessment for PilotSpan. It showcases a list of employees in an organization with the ability to **add**, **edit**, **delete**, **view**, and **assign** employees to grade levels. The application demonstrates proficiency in component design, responsive UI/UX, API handling, and state management using modern React practices.

---

## Tech Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS, Mantine UI
- **State Management:** `useReducer`, Context API
- **Persistence:** Local Storage
- **Package Manager:** pnpm
- **API Handling:** TanStack Query (react-query)
- **Other Tools:** Typescript (optional for extension)

---

## Features

- Display list of employees
- Add new employee
- Edit existing employee
- View employee profile
- Delete employee
- Each employee contains:
  - Name
  - Country
  - State
  - Address
  - Role
  - Department
  - Grade level (optional)

- Manage grade levels:
  - Create new grade levels (e.g., LVL1, LVL2, LVL3)
  - Delete grade levels
  - Assign employee to a grade level

- Filter employees by name or grade level
- Responsive design for mobile and desktop
- Stores data in `localStorage` after the first fetch

---

## API

- **World Cities API:**
  `https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json`
  - Used to populate country and state options for employee form.

---

## Project Structure

```
src/
├── assets/              # Static images or icons
├── components/          # Reusable UI components (Header, EmployeeCard, Modal, etc.)
├── context/             # Context providers for state
├── data/                # Static JSON or initial grade data
├── hooks/               # Custom React hooks (e.g. useLocalStorage)
├── pages/               # Page-level components (Home, EmployeeProfile)
├── services/            # API interaction and helper functions
├── utils/               # Utility functions
├── App.tsx              # Main App wrapper
└── main.tsx             # Entry point
```

---

## Getting Started

### Prerequisites

- Node.js >= 16
- pnpm installed globally

### Installation

```bash
git clone https://github.com/7Creed/Staff-Directory.git
cd Staff-Directory
pnpm install
pnpm dev
```

---

## UI Walkthrough

- **Header:** Displays app title and `Add Employee` button
- **Filters:** Search bar and grade level filter dropdown
- **Employee Grid:** Displays employee cards with name, role, and quick actions
- **Add/Edit Modal:** Form to create or edit employee records
- **Grade Management:** Section to add or delete grade levels
- **View Profile:** Full view of employee data including address, country, state, etc.

---

## Local Storage

- On first load, country/state data is fetched and stored in local storage.
- Employee and grade level data is also persisted in local storage to maintain state across refreshes.

---

## Acknowledgements

- [Mantine UI](https://mantine.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)
- [World Cities API (DataHub)](https://datahub.io/core/world-cities)

---

## 📫 Contact

**Author:** Frank Obika
**GitHub:** [@7Creed](https://github.com/7Creed)

---
