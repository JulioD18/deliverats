# CSC C09 Project Proposal

## Project Info

- Project Name: DeliveRats
- Team Name: Calidosos
- Team Members:
  - Juan Corral - 1005890010
  - Julio Delgado - 1005638160

## Description of Web Application:

Many small restaurants do not have presence in delivery Apps such as Uber Eats. Consequently, they recur to informal channels such as phone and social media to receive deliveries. However, this makes it difficult to track and record. Our web application solves this by allowing small businesses to host delivery forms in our platform.

Workflow:

1. The business creates an account
2. The business creates a form using the dynamic form builder
3. The business copies the form link and shares it with customers
4. The customer enters to the link, fills, and sends the form
5. The customer receives a tracking link via email
6. The business receives a ‘new delivery request’ notification via email
7. The business prepares the dish and delivers it (updating the progress on the app on each step)
8. The customer can track the progress via the link
9. The business can view all of its current and past deliveries

## Complexity Points:

- Auth0 - 1
- Google API - Geocoding API, Maps JavaScript API, - Places API - 1
- SendGrid (Email) - 2
- Sentry - 1
- PDF.js - 2
- Socket - 1

## Complexity Point Bonus:

- Twilio (SMS) - 2

## Stages of Completion:

- Alpha Version:
  - Project setup
  - Authentication (integration with Google’s Auth0)
  - 'Form builder’ page
- Beta Version:
  - ‘Form’ page
  - Maps (integration with Google Maps API)
  - SMS and Email confirmation messages (integration with Twilio and SendGrid)
- Final Version:
  - ‘My forms’ page
  - ‘My Deliveries’ page
  - ‘Track delivery’ page

## URLs:

- Demo: https://www.youtube.com/watch?v=ahq-Fv4vQFw&ab_channel=JulioDelgado
- Live Site: https://deliverats.live