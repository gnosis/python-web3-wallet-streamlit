# Python Web3 Wallet

Streamlit component that allows you to connect a wallet and trigger send transactions.

## Installation instructions

```sh
pip install web3-wallet-connect
```
tex 
## Usage instructions

```python
import streamlit as st

from python_web3_wallet import my_component

c = my_component(recipient="0x...", amount_in_ether="0.01") # Displays RainbowKit wallet
```