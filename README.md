# Ask App #

The ask app is a simple app that allows a user to ask a question and get a series of LLM generated answers. The motivation for the app is to explore comment threads as a UI for interacting with LLM models.

# Local Setup #

To run the app you need to run both the frontend and backend locally. The following sections will guide you through setting up these individual components.

## Frontend ##

The frontend is a simple React app that is bootstrapped with Create React App. To run the frontend, navigate to the `frontend` directory and run the following commands:

```bash
cd frontend
npm install
npm start
```

This will start the frontend on `http://localhost:3000`.

## Backend ##

The backend is a simple Flask app that serves the frontend and provides an API for interacting with the LLM model. To run the backend, navigate to the `backend` directory and run the following commands:

```bash
cd backend
pip install -r requirements.txt
python app.py
```

This will start the backend on `http://localhost:5000`.

The backend needs an OPENAI_API_KEY environment variable to be set. If you already have one set, you can skip this step. If you don't have one, you can get one by signing up for an OpenAI account and creating a new API key.

Once you have the key you shoudl create a `.env` file in the `backend` directory and add the following line:

```
OPENAI_API_KEY=<your-api-key>
```

# Usage #

To use the app, navigate to `http://localhost:3000` in your browser. Before being able to ask a question, you need to select a model from the dropdown and provide your own API key. Once you have done this, you can ask a question and get a series of LLM generated answers.