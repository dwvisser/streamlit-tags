import streamlit as st
from streamlit_tags import st_tags


keywords = st_tags('Enter Keyword:', 'Press enter to add more', ['Zero', 'One', 'Two'])

st.write(keywords)
