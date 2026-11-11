// Details below were read from the project's GitHub repository (code, README, notebook). Edit only with verified facts.
export default {
  "id": "shaniwaar-x-paradox",
  "name": "Shaniwaar-X-PARADOX",
  "category": [
    "deep-learning",
    "ai-ml",
    "python-apps",
    "web-dev"
  ],
  "status": "standard",
  "summary": "An emotion-detection web app: a trained bidirectional LSTM classifies text into six emotions, served through a FastAPI backend with a web UI.",
  "description": "Shaniwaar-X-PARADOX classifies a sentence into one of six emotions (sadness, joy, love, anger, fear, surprise). The model was trained and compared in a Jupyter notebook on the dair-ai/emotion dataset, then saved together with its tokenizer and served by a FastAPI app that also hosts a simple web interface.",
  "problem": "Detect the emotion expressed in a piece of text and make the trained deep learning model usable from a browser.",
  "objectives": [
    "Train and compare recurrent architectures (RNN, LSTM, GRU, BiLSTM) for text emotion classification",
    "Serve the best model through an API with input validation",
    "Provide a simple web interface to try it"
  ],
  "technologies": [
    "Python",
    "TensorFlow 2.17 / Keras",
    "FastAPI and Uvicorn",
    "Pydantic",
    "NumPy",
    "pandas, matplotlib, seaborn and scikit-learn (notebook)",
    "Hugging Face datasets (dair-ai/emotion)",
    "HTML frontend",
    "Render (live demo)"
  ],
  "architecture": [
    "Notebook: load dair-ai/emotion (16,000 training and 2,000 test sentences), tokenise (10,000-word vocabulary) and pad to 100 tokens.",
    "Train RNN, LSTM, GRU and BiLSTM models with balanced class weights, gradient clipping and early stopping; compare them on the test split.",
    "Save the chosen model and the tokenizer (Keras model file and tokenizer.pkl).",
    "FastAPI loads the model and tokenizer once at startup.",
    "POST /predict validates the text (1 to 2,000 characters), cleans it, tokenises and pads it, then runs the model.",
    "The response contains the predicted emotion, its confidence and the probability of every emotion.",
    "GET / serves the web UI and GET /health reports whether the model is loaded."
  ],
  "features": [
    "Six emotion classes with an emoji for each",
    "Returns the predicted emotion, confidence and the full probability breakdown",
    "Input validation and clear error when the model is not loaded",
    "Health-check endpoint",
    "Model and tokenizer loaded once at startup",
    "Simple web interface served by the same app",
    "CORS enabled"
  ],
  "challenges": [
    {
      "challenge": "In the notebook, the plain RNN, LSTM and GRU runs ended up predicting almost only one class (test accuracy between 28.9% and 34.8%).",
      "solution": "The bidirectional (stacked) LSTM trained properly with the same data setup, using balanced class weights, gradient clipping and early stopping, and was the model saved for the app."
    },
    {
      "challenge": "The dataset is imbalanced (for example, “surprise” is much rarer than “joy”).",
      "solution": "Balanced class weights were computed and used during training; per-class precision, recall and F1 were checked with a classification report and confusion matrices."
    }
  ],
  "results": [
    "BiLSTM test accuracy: 89.85% (test loss 0.3002) on the 2,000-sentence test split of dair-ai/emotion.",
    "Per-class F1 for the BiLSTM: sadness 0.94, joy 0.93, anger 0.91, fear 0.83, love 0.80, surprise 0.75.",
    "Baselines on the same split: RNN 28.90%, LSTM 34.75%, GRU 29.05% accuracy.",
    "Note: the same test split was also used as validation data during training, so treat these as development-stage scores."
  ],
  "links": {
    "repo": "https://github.com/greatkrishnacoder9826-sketch/Shaniwaar-X-PARADOX",
    "demo": "https://shaniwaar-x-paradox.onrender.com/",
    "docs": "",
    "related": []
  }
}
