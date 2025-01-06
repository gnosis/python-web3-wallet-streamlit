_RELEASE = True
import os
import streamlit.components.v1 as components


parent_dir = os.path.dirname(os.path.abspath(__file__))
build_dir = os.path.join(parent_dir, "frontend/build")
#component = components.declare_component("python_web3_wallet", path=build_dir)
# If loading dynamically
component = components.declare_component("python_web3_wallet", url="http://localhost:3001")

import streamlit as st
st.title('My title')
agent2 = "0xb4D8C8BedE2E49b08d2A22485f72fA516116FE7F"
c = component(recipient=agent2, amountInEther="0.00001", data='0x48656c6c6f20776f726c64')