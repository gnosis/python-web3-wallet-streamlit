_RELEASE = True
import os
import streamlit.components.v1 as components


parent_dir = os.path.dirname(os.path.abspath(__file__))
build_dir = os.path.join(parent_dir, "frontend/build")
component = components.declare_component("python_web3_wallet", path=build_dir)
# If loading dynamically
#component = components.declare_component("python_web3_wallet", url="http://localhost:3001")