# StudyQuest

StudyQuest is a web application built with Next.js that helps students organize their studies and summarize information efficiently.

## Features

- Add different subjects to the app
- Each subject has its own Kanban board for task management
- Each subject has a separate summary section
- Automated text summarization using Ollama AI model

## Tech Stack

- Next.js
- MongoDB
- Ollama AI

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/studyquest.git
   cd studyquest
   ```

2. Create a `.env.local` file in the root directory and add your MongoDB URI:
   ```
   MONGODB_URI=your_mongodb_uri_here
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Install Ollama:
   - Follow the instructions on the [Ollama website](https://ollama.ai/) to install Ollama for your operating system.

5. Download an Ollama model:
   - Choose a model that is supported by your system. For example:
     ```
     ollama pull llama2
     ```

6. Configure the AI model:
   - Open `app/api/ai/route.js`
   - Locate the following code:
     ```javascript
     const answer = await ollama.chat({
       model: "your_model_name",
       messages: [{ role: "user", content: query }],
     });
     ```
   - Replace `"your_model_name"` with the name of the model you downloaded (e.g., `"llama2"`).

7. Start the development server:
   ```
   npm run dev
   ```

8. Open your browser and navigate to `http://localhost:3000` to use StudyQuest.

## Troubleshooting

If you encounter any issues during setup or while using the application, please:

1. Ensure all dependencies are correctly installed.
2. Verify that your MongoDB URI is correct and the database is accessible.
3. Check that Ollama is running and the specified model is available.

If problems persist, please open an issue on the GitHub repository with a detailed description of the error and steps to reproduce it.

## Suggestions for Improvement

As a beginner project in Next.js, here are some suggestions to enhance StudyQuest:

1. Implement user authentication to allow multiple users.
2. Add a feature to export summaries or Kanban boards.
3. Implement real-time updates using websockets or Server-Sent Events.
4. Create a mobile-responsive design for better usability on different devices.

---

Happy coding! If you have any questions or need further assistance, please don't hesitate to ask.
