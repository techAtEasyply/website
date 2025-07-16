from dotenv import load_dotenv
load_dotenv()
import base64
import streamlit as st
import os
import io
from PIL import Image
import pdf2image
#MAKE SURE TO DOWNLOAD POPPLER WINDOWS
# https://youtu.be/EECUXqFrwbc?si=moUXvpR4AyEgQXki&t=1895
import google.generativeai as genai

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def get_gemini_response(prompt, pdf_content, job_description):
    """
    Sends prompt, first page of resume (as image), and job description to Gemini model.
    Returns model's text response.
    """
    model = genai.GenerativeModel('gemini-pro-vision')
    response = model.generate_content([prompt, pdf_content[0], job_description])
    return response.text

def input_pdf_setup(uploaded_file):
    """
    Converts uploaded PDF to image (first page), encodes as base64 JPEG.
    Returns list with image data for Gemini API.
    Raises error if no file uploaded.
    """
    if uploaded_file is not None:
        images = pdf2image.convert_from_bytes(uploaded_file.read())
        first_page = images[0]
        img_byte_arr = io.BytesIO()
        first_page.save(img_byte_arr, format='JPEG')
        img_byte_arr = img_byte_arr.getvalue()
        pdf_parts = [
            {
                "mime_type": "image/jpeg",
                "data": base64.b64encode(img_byte_arr).decode()
            }
        ]
        return pdf_parts
    else:
        raise FileNotFoundError("No file uploaded")

# --- Streamlit App UI ---

st.set_page_config(page_title="ATS Resume Expert")  # Set page title
st.header("ATS Tracking System")  # Main header

input_text = st.text_area("Job Description: ", key="input")  # Job description input
uploaded_file = st.file_uploader("Upload your resume (PDF)...", type=["pdf"])  # Resume upload

if uploaded_file is not None:
    st.write("PDF Uploaded Successfully")

submit1 = st.button("Tell Me About the Resume")  # Button for resume analysis
submit3 = st.button("Percentage match")  # Button for match percentage

# Prompt for detailed resume evaluation
input_prompt1 = """
You are an expert Technical Human Resource Manager. Carefully review the provided resume and compare it to the job description.
Provide a detailed, professional evaluation of how well the candidate's experience, skills, and qualifications align with the job requirements.
List specific strengths and weaknesses, referencing relevant sections of the resume and job description. Offer actionable feedback for improvement.
"""

# Prompt for ATS-style percentage match and feedback
input_prompt3 = """
You are an advanced ATS (Applicant Tracking System) with expertise in data science and recruitment analytics.
Analyze the resume against the job description and provide:
1. The percentage match between the resume and job requirements.
2. A list of important keywords or skills missing from the resume.
3. Final thoughts on the candidate's suitability and suggestions for increasing the match score.
Present your response in a clear, structured format.
"""

# Handle "Tell Me About the Resume" button click
if submit1:
    if uploaded_file is not None:
        pdf_content = input_pdf_setup(uploaded_file)
        response = get_gemini_response(input_prompt1, pdf_content, input_text)
        st.subheader("The Response is")
        st.write(response)
    else:
        st.write("Please upload the resume")

# Handle "Percentage match" button click
elif submit3:
    if uploaded_file is not None:
        pdf_content = input_pdf_setup(uploaded_file)
        response = get_gemini_response(input_prompt3, pdf_content, input_text)
        st.subheader("The Response is")
        st.write(response)
    else:
        st.write("Please upload the resume")
