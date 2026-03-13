# Design System: Project Manager (Kanbax)
**Project ID:** 12306986072234057077

## 1. Visual Theme & Atmosphere
The design system follows an **"Architectural Canvas"** philosophy. It moves away from heavy, grid-locked dashboard aesthetics, favoring an editorial, airy, and high-contrast professional workspace. The interface feels like layered planes of fine paper, emphasizing structural clarity through intentional asymmetry and generous whitespace rather than rigid borders or heavy shadows.

## 2. Color Palette & Roles
The system uses a sophisticated palette grounded in airy neutrals with vibrant organic accents.

*   **Primary Deep Blue (#0059ba):** The core brand color, used for primary action focal points and key branding elements.
*   **Electric Primary Container (#0071e9):** A brighter blue used in gradients and hover states to add vibrance.
*   **Ink-Navy Sidebar (#263143):** "Inverse Surface" role; provides a strong structural anchor for global navigation.
*   **Soft Canvas White (#f9f9ff):** "Surface" role; the main background that keeps the workspace feeling fresh and expansive.
*   **Pure Paper White (#ffffff):** "Surface Container Lowest"; used for active task cards and top navigation to create a "light-on-light" sense of lift.
*   **Foggy Sky Blue (#f0f3ff):** "Surface Container Low"; used for secondary panels like Kanban tracks or sidebar list highlights.
*   **Professional Midnight (#111c2d):** "On Surface"; the primary text color, replacing pure black for better readability and a premium feel.
*   **Mustard Beacon (#fdc425):** "Secondary Container"; used sparingly as an organic marker for critical tasks or call-to-action highlights.
*   **Lime Accel (#91db2a):** "Tertiary Fixed Dim"; used for success states and progress indicators.

## 3. Typography Rules
The system employs a dual-font strategy to balance character with high-density legibility.

*   **Headlines & Display (Manrope):** Chosen for its geometric but friendly proportions. Used in **Bold (700)** and **Extrabold (800)** for page titles and section headers to create an editorial rhythm.
*   **Body & Titles (Manrope):** Set with generous line-heights to maintain the "Professional Clean" aesthetic. **Semibold (600)** is used for titles within cards.
*   **Functional Labels (Inter):** Used for metadata, tags, micro-copy, and navigation items. Inter’s tall x-height ensures maximum legibility at very small scales (e.g., tags and sidebar labels).

## 4. Component Stylings
*   **Buttons:** Generously rounded corners (**rounded-lg / 0.5rem**). Primary buttons feature a subtle linear gradient from **Primary** to **Primary Container**, giving them a tactile, premium feel compared to flat aesthetics.
*   **Cards/Task Modules:** Use **rounded-xl (0.75rem)** for a modern, soft appearance. They sit on a **Pure Paper White (#ffffff)** background with whisper-soft diffused shadows and a very subtle ghost border (**outline-variant/10**).
*   **Inputs/Forms:** Feature **pill-shaped (rounded-full)** boundaries for global search and **soft-filled rounded-lg** backgrounds for task inputs. They use **Surface Container Low** backgrounds instead of high-contrast outlines to keep the UI "quiet."
*   **Sidebar Navigation:** Navigation items use **rounded-lg** shapes with active states defined by a subtle background shift (**bg-on-surface-variant/10**) rather than harsh lines.

## 5. Layout Principles
*   **The No-Line Rule:** Boundaries are established through background color value shifts (e.g., a white card on a light blue-grey track) rather than 1px solid borders. This creates a "soft" interface that feels integrated.
*   **Tonal Layering:** Depth is achieved by stacking lighter elements on slightly darker surfaces. 
*   **Whitespace as Function:** Spacing tokens (from **8px to 32px**) are used aggressively to separate concerns, ensuring the UI never feels cluttered despite high data density.
*   **Architectural Alignment:** All elements follow a strict vertical rhythm, reinforcing the organized and structural feel of a professional management tool.
