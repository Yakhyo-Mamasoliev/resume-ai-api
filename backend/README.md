# Resume AI API Backend

This is the backend for the AI-powered resume analysis system. It uses the Hugging Face API to analyze resume text and suggest improvements.

## Setup

1. Clone the repository.
2. Navigate to the `backend/` folder.
3. Run `npm install` to install the dependencies.
4. Create a `.env` file and add your Hugging Face API key:
5. To start the server, run `npm run dev` for development or `npm start` for production.

## Endpoints

- `POST /api/analyze-resume` - Analyzes a resume and suggests improvements. Pass the resume text in the request body.

## Testing

Use Postman to test the API by sending a POST request to `/api/analyze-resume` with the following body:

```json
{
	"resumeText": "Your resume text here"
}
```
