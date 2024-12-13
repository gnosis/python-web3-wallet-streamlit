import streamlit as st
import os
import streamlit.components.v1 as components


# Add some test code to play with the component while it's in development.
# During development, we can run this just as we would any other Streamlit
# app: `$ streamlit run my_component/example.py`

st.subheader("Component with constant args")

# Create an instance of our component with a constant `name` arg, and
# print its output value.

parent_dir = os.path.dirname(os.path.abspath(__file__))
build_dir = os.path.join(parent_dir, "frontend/build")
component_func = components.declare_component("python_web3_wallet", path=build_dir)
#component_func = components.declare_component("python_web3_wallet", url="http://localhost:3001")

st.text_input("recipient", value="0x8cad4a17ad221563fe8dc921d9e6153927a79755", key="recipient")

component_func(recipient=st.session_state['recipient'], valueInEther="0.01", label="a")