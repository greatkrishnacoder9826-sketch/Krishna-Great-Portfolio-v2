// Copy this file, rename it (e.g. my-project.js) and fill in ONLY facts you can stand behind.
// Empty arrays / empty strings are fine: the modal shows "not published yet" for that tab.
export default {
  id: 'my-project',                 // unique, lowercase, hyphens only (used in the URL)
  name: 'My Project',
  category: ['ai-ml'],              // ai-ml | deep-learning | generative-ai | data-analytics | python-apps | web-dev
  status: 'pending',                // featured | standard | experimental | upcoming | pending
  summary: 'One or two sentences shown on the card.',
  description: '',                  // longer text for the Overview tab
  problem: '',
  objectives: [],
  technologies: [],
  architecture: [],                 // ordered steps: ['User uploads a PDF', 'Text is split into chunks', ...]
  features: [],
  challenges: [],                   // [{ challenge: '...', solution: '...' }]
  results: [],                      // real outcomes or metrics only
  links: { repo: '', demo: '', docs: '', related: [] }, // related: [{ label, url }]
}
