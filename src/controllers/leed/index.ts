// Controllers for the Leeds API

// Accessible to any authenticated user
export { default as getLeed } from "./get"; // GET /api/leed

// Accessible only to authenticated users with the 'admin' role
export { default as createLeed } from "./post"; // POST /api/leed
export { default as updateLeed } from "./put"; // PUT /api/leed/:id
export { default as deleteLeed } from "./delete"; // DELETE /api/leed/:id
