# How to Add Your Streamlit ATS App to Your Website

You have several options to integrate your Streamlit ATS app (`app.py`) into your website, depending on your tech stack:

---

## 1. Run Streamlit as a Separate Service

- **Deploy your Streamlit app** on a server (e.g., Streamlit Cloud, Heroku, or your own VM).
- **Get the public URL** (e.g., `https://your-ats-app.streamlit.app`).
- **Embed in your website** using an `<iframe>`:

  ```html
  <iframe
    src="https://your-ats-app.streamlit.app"
    width="100%"
    height="800px"
    style="border:none;"
    title="ATS Resume Expert"
  ></iframe>
  ```

- Alternatively, **add a button or link** to open the app in a new tab.

---

## 2. Integrate with Your Frontend (React Example)

If your website uses React, you can embed the app using an `<iframe>` in a React component:

```jsx
// Example React component
export default function ATSResumeApp() {
  return (
    <iframe
      src="https://your-ats-app.streamlit.app"
      width="100%"
      height="800px"
      style={{ border: "none" }}
      title="ATS Resume Expert"
    />
  );
}
```

Place this component wherever you want the ATS app to appear.

---

## 3. Advanced: Convert to API and Build a Custom Frontend

- Refactor your Streamlit logic into a FastAPI or Flask backend.
- Build a custom frontend in React and connect via API.
- This approach requires more work but gives you full control over UI/UX.

---

## Summary

The **easiest way** is to deploy your Streamlit app and embed it in your website using an `<iframe>`.

Let me know if you need deployment instructions or help with embedding!