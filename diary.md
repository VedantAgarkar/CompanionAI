# CompanionAI – Weekly Project Diary

**Project Title:** CompanionAI – AI-Powered Decision Intelligence Platform  
**Team Members:** Mandar Gopal Petkar, Om Lahu Shinde, Tauseef Ahmad Shaikh Ansar, Vikas Vasant Chavan  
**Duration:** Week 1 – Week 30

---

## Week No: 1

**Activities Planned:**
We planned to finalise the project idea and define the problem statement for CompanionAI.
We planned to identify the target audience: small business owners, startup founders, and farmers.

**Activities Executed:**
The problem statement was drafted and agreed upon by all team members.
Target user groups were identified and documented with specific use-case scenarios.

**Reason of Delay:**
No Delay

---

## Week No: 2

**Activities Planned:**
We planned to conduct a literature review on existing AI decision-support tools and chatbot systems.
We planned to research available AI APIs and language model options suitable for the project.

**Activities Executed:**
Literature review was completed covering relevant chatbot and AI advisory platforms.
OpenRouter API with Gemini 2.0 Flash was selected as the primary AI backend after comparative research.

**Reason of Delay:**
No Delay

---

## Week No: 3

**Activities Planned:**
We planned to finalise the system architecture and technology stack for CompanionAI.
We planned to set up the initial project repository and folder structure.

**Activities Executed:**
The tech stack was confirmed: React (Vite) for frontend, FastAPI for backend, SQLite via SQLAlchemy for the database.
The GitHub repository was created and the initial folder structure (frontend/, backend/) was committed.

**Reason of Delay:**
No Delay

---

## Week No: 4

**Activities Planned:**
We planned to design low-fidelity wireframes for the Landing Page and Domain Selection page.
We planned to define the database schema for users and chat sessions.

**Activities Executed:**
Wireframes for the Landing Page, Domain Page, and Chat interface were sketched and reviewed.
The initial database schema was defined with tables for users, sessions, and chat history.

**Reason of Delay:**
No Delay

---

## Week No: 5

**Activities Planned:**
We planned to set up the FastAPI backend with a basic health-check endpoint.
We planned to configure the SQLAlchemy ORM and initialise the SQLite database.

**Activities Executed:**
The FastAPI application was scaffolded with CORS middleware and a root health-check route.
SQLAlchemy models and the `init_db()` function were implemented and tested successfully.

**Reason of Delay:**
No Delay

---

## Week No: 6

**Activities Planned:**
We planned to implement user registration and login endpoints in the backend.
We planned to integrate JWT-based authentication using `python-jose` and `passlib`.

**Activities Executed:**
The `/auth/register` and `/auth/login` endpoints were built with password hashing via bcrypt.
JWT token generation and validation logic was implemented and manually tested with Postman.

**Reason of Delay:**
No Delay

---

## Week No: 7

**Activities Planned:**
We planned to set up the React Vite frontend project and install all required libraries.
We planned to build the initial Navbar component with navigation links.

**Activities Executed:**
The React project was initialised with Vite and dependencies including Framer Motion, Tailwind CSS, and Lucide Icons were installed.
The Navbar component was built with links to Home, Features, Products, and About pages.

**Reason of Delay:**
No Delay

---

## Week No: 8

**Activities Planned:**
We planned to develop the Landing Page with a hero section and feature highlights.
We planned to integrate smooth scroll animations using Framer Motion.

**Activities Executed:**
The Landing Page was completed with a hero section, three feature cards, and a contact section.
Framer Motion animations were integrated for fade-in and slide-up effects on page load.

**Reason of Delay:**
Slight delay in finalising the hero section copy; resolved within the same week.

---

## Week No: 9

**Activities Planned:**
We planned to build the Domain Selection Page displaying four AI domains.
We planned to connect domain cards to their respective chat routes via navigation.

**Activities Executed:**
The Domain Page was built with four cards: Business Advisor, Startup Mentor, Farming Expert, and General Assistant.
Navigation from each domain card to the ChatDashboard component was wired correctly.

**Reason of Delay:**
No Delay

---

## Week No: 10

**Activities Planned:**
We planned to develop the AuthPage component with sign-in and sign-up forms.
We planned to connect authentication forms to the backend `/auth` endpoints.

**Activities Executed:**
The AuthPage was built with toggling sign-in and sign-up views and full form validation.
Axios integration was completed to connect the frontend auth forms with the FastAPI auth routes.

**Reason of Delay:**
No Delay

---

## Week No: 11

**Activities Planned:**
We planned to implement the core Chat API endpoint in the backend using the OpenRouter API.
We planned to set up domain-specific system prompts for Business, Startup, Farming, and General domains.

**Activities Executed:**
The `/chat` endpoint was implemented and integrated with the OpenRouter API (Gemini 2.0 Flash model).
Four unique system prompts were written to scope AI responses to each specific domain context.

**Reason of Delay:**
OpenRouter API key configuration caused a brief authentication error that delayed testing by two days.

---

## Week No: 12

**Activities Planned:**
We planned to build the ChatDashboard component with a message list and input area.
We planned to connect the frontend chat interface to the backend `/chat` endpoint.

**Activities Executed:**
The ChatDashboard was built with a scrollable message history, user/AI message bubbles, and a text input bar.
The frontend was successfully connected to the backend chat API with real-time response rendering.

**Reason of Delay:**
No Delay

---

## Week No: 13

**Activities Planned:**
We planned to implement Markdown rendering for AI chat responses.
We planned to add loading/thinking indicators while awaiting AI responses.

**Activities Executed:**
The `MarkdownMessage` component was created to parse and render code blocks, bold text, and lists from AI output.
A "Thinking..." animated indicator was added to the chat interface during API calls.

**Reason of Delay:**
No Delay

---

## Week No: 14

**Activities Planned:**
We planned to implement file upload functionality so users can upload PDFs for AI analysis.
We planned to build the document parsing service using PyMuPDF and pdfplumber.

**Activities Executed:**
The `/files/upload` endpoint was implemented with multipart form support using `python-multipart`.
Document text extraction was built using PyMuPDF and pdfplumber with fallback support.

**Reason of Delay:**
No Delay

---

## Week No: 15

**Activities Planned:**
We planned to build the Admin Dashboard backend endpoints for user and chat management.
We planned to implement role-based access control to restrict admin routes.

**Activities Executed:**
Admin endpoints for listing users, viewing chat logs, and managing accounts were implemented.
Role-based access control was added using JWT claims, restricting admin routes to authorised users only.

**Reason of Delay:**
No Delay

---

## Week No: 16

**Activities Planned:**
We planned to build the AdminDashboard frontend component with user and session data tables.
We planned to add analytics cards showing total users, sessions, and messages.

**Activities Executed:**
The AdminDashboard component was built with paginated user tables and session history views.
Summary analytics cards displaying system-wide stats were added at the top of the admin panel.

**Reason of Delay:**
Delay due to inconsistency in admin API response formats; fixed after backend schema alignment.

---

## Week No: 17

**Activities Planned:**
We planned to implement a global Dark/Light mode theme toggle for the entire application.
We planned to refactor all component styles to use CSS variables for theming.

**Activities Executed:**
A `ThemeContext` was created with local storage persistence to maintain user theme preference.
All component stylesheets were refactored to use CSS custom properties (`--bg-primary`, `--text-primary`, etc.).

**Reason of Delay:**
No Delay

---

## Week No: 18

**Activities Planned:**
We planned to add the DarkVeil visual effect to the Landing Page and About Page backgrounds.
We planned to fine-tune animation parameters for noise, scan lines, and hue shift.

**Activities Executed:**
The DarkVeil component (canvas-based shader animation) was integrated behind the hero section.
Animation parameters (hueShift, noiseIntensity, warpAmount) were tuned per page for visual balance.

**Reason of Delay:**
No Delay

---

## Week No: 19

**Activities Planned:**
We planned to implement the Contact Us endpoint in the backend for support form submissions.
We planned to create the contact form section on the Landing Page and wire it to the backend.

**Activities Executed:**
The `/contact` POST endpoint was implemented and validated with email format checking.
The contact form on the Landing Page was connected and tested with successful form submissions.

**Reason of Delay:**
No Delay

---

## Week No: 20

**Activities Planned:**
We planned to implement full multilingual support (English, Hindi, Marathi) across the frontend.
We planned to integrate `i18next` and `react-i18next` into the React application.

**Activities Executed:**
`i18next` was configured with translation resources for all three languages in `i18n.js`.
All UI text across Navbar, Landing Page, Domain Page, Auth, Chat, About, and Features pages was translated.

**Reason of Delay:**
No Delay

---

## Week No: 21

**Activities Planned:**
We planned to add a custom language selector dropdown to the Navbar with flag/label indicators.
We planned to ensure the selected language persists across page navigations.

**Activities Executed:**
A glassmorphism-styled language selector was added to the Navbar supporting EN, HI, and MR.
Language state was connected to the i18n instance and persisted using localStorage.

**Reason of Delay:**
No Delay

---

## Week No: 22

**Activities Planned:**
We planned to ensure that AI chat responses are generated in the user's currently selected language.
We planned to update domain-specific system prompts to include language instruction dynamically.

**Activities Executed:**
Chat system prompts were updated to include dynamic language instructions based on the active i18n locale.
All AI responses were verified to correctly reflect the selected language (EN, HI, MR).

**Reason of Delay:**
No Delay

---

## Week No: 23

**Activities Planned:**
We planned to build the Features Page showcasing the six core capabilities of CompanionAI.
We planned to add the About Page with team member profiles and the project vision section.

**Activities Executed:**
The FeaturesPage was completed with six animated feature cards and descriptive content.
The AboutPage was built with circular profile images, team member names, roles, and bios.

**Reason of Delay:**
No Delay

---

## Week No: 24

**Activities Planned:**
We planned to replace placeholder team member photos on the About Page with real team photos.
We planned to update all three language translations to reflect the actual team member names and roles.

**Activities Executed:**
Real photos for all four team members were imported from the `imgs/` directory and displayed in the profile circles.
Translation entries across EN, HI, and MR were updated with correct full names and project-appropriate roles.

**Reason of Delay:**
No Delay

---

## Week No: 25

**Activities Planned:**
We planned to conduct full end-to-end integration testing across all user flows.
We planned to fix any UI inconsistencies, broken routes, or API errors discovered during testing.

**Activities Executed:**
End-to-end testing was performed covering registration, login, chat, file upload, and admin flows.
Several minor bugs including layout issues on the Domain Page and a JWT decode error were identified and resolved.

**Reason of Delay:**
Testing revealed a JWT module attribute error (`jwt.decode`) which required extra time to debug and patch.

---

## Week No: 26

**Activities Planned:**
We planned to optimise the frontend bundle size and improve initial page load performance.
We planned to review backend response times and add error handling to all API endpoints.

**Activities Executed:**
Unused dependencies were removed, and Vite build configuration was reviewed for production readiness.
Comprehensive error handling and HTTP status responses were added to all FastAPI route handlers.

**Reason of Delay:**
No Delay

---

## Week No: 27

**Activities Planned:**
We planned to conduct user acceptance testing (UAT) with a small group of external users.
We planned to collect feedback on UI usability, language accuracy, and AI response quality.

**Activities Executed:**
UAT was conducted with five external participants covering business, farming, and startup scenarios.
Feedback was compiled and minor UI adjustments were made to the chat layout and language selector placement.

**Reason of Delay:**
No Delay

---

## Week No: 28

**Activities Planned:**
We planned to incorporate UAT feedback and release a polished final build of the application.
We planned to prepare the project documentation including the README and API reference.

**Activities Executed:**
UI refinements based on UAT feedback were applied, including improved mobile responsiveness.
The README was updated with setup instructions, tech stack details, and environment variable guidelines.

**Reason of Delay:**
No Delay

---

## Week No: 29

**Activities Planned:**
We planned to prepare the final project report, presentation slides, and demonstration video.
We planned to conduct a dry run of the project demonstration for internal review.

**Activities Executed:**
The project report was completed covering objectives, methodology, system design, and results.
A dry-run demonstration was conducted internally and presentation slides were finalised.

**Reason of Delay:**
No Delay

---

## Week No: 30

**Activities Planned:**
We planned to submit the final project deliverables including code, report, and diary.
We planned to present the CompanionAI platform to evaluators and address Q&A.

**Activities Executed:**
All project deliverables (codebase, report, weekly diary, and presentation) were submitted successfully.
The final demonstration was presented showcasing multilingual AI chat, file analysis, and the admin dashboard.

**Reason of Delay:**
No Delay

---

*Weekly Diary prepared by Team CompanionAI — Mandar Gopal Petkar, Om Lahu Shinde, Tauseef Ahmad Shaikh Ansar, Vikas Vasant Chavan.*
