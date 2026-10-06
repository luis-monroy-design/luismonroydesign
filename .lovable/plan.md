# Portfolio content and interaction update

## Scope
- Replace Legal Split with Harmoni Systems, reorder all six experience cards and marquee items newest-first, and keep English and Spanish content synchronized.
- Update Micrositios and SEOS copy exactly as provided, and replace the contact email everywhere it appears.
- Remove the Legal Split page and make the Harmoni card open the existing bilingual “case study in progress” dialog.
- Add the requested interaction polish while preserving the existing dark theme and green accent.

## Implementation
1. Update `src/portfolio-body.html`:
   - Reorder the marquee and experience cards to Harmoni, Micrositios, SEOS, Rentek, UNAL, I Wanna Travel.
   - Render “Harmoni Systems” as text in its cover and marquee, with no route attached.
   - Add case-study category metadata and filter controls.
   - Add accessible copy-email control and toast.
   - Add the scroll-progress element and accessibility labels where required.
2. Update `public/site/portfolio.js`:
   - Replace and synchronize all requested EN/ES experience copy.
   - Add bilingual filter and copy-email labels.
   - Initialize count-up stats, scroll reveals, progress, scroll-spy, navbar scrolled state, case filtering, image tilt, and copy-email feedback.
3. Update `public/site/portfolio.css`:
   - Add a responsive vertical timeline, current-role pulse, bracket/card hover treatment, filter chips, cover zoom/tilt, marquee edge fade and grayscale behavior, focus rings, touch targets, and toast styling.
   - Keep motion transform/opacity-only, scope hover rules to hover-capable devices, and disable motion for reduced-motion users.
4. Delete the obsolete `/legal-split` route and verify no links or visible references remain.

## Verification
- Check the home page at desktop and 360px widths for layout, ordering, language switching, filters, modal, copy-email feedback, timeline, and navigation states.
- Confirm `/legal-split` is removed, all remaining internal experience links work, email references are updated, and the latest build reports no errors.

## Assumption
- Featured case categories will be assigned from their existing labels: Mobile, Web, or Dashboard; “All” shows every card.