import {
  Streamlit,
  withStreamlitConnection,
  ComponentProps,
} from "streamlit-component-lib";
import { getAddress, parseEther } from 'viem';
import React, { useCallback, useEffect, useMemo, useState, ReactElement } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import '@rainbow-me/rainbowkit/styles.css';
import { useAccount, useSendTransaction } from "wagmi";


/**
 * This is a React-based component template. The passed props are coming from the 
 * Streamlit library. Your custom args can be accessed via the `args` props.
 */
function PythonWeb3Wallet({ args, disabled, theme }: ComponentProps): ReactElement {
  const { recipient, valueInEther } = args;


  const { sendTransaction } = useSendTransaction();
  const account = useAccount();

  const [isFocused, setIsFocused] = useState(false)

  const style: React.CSSProperties = useMemo(() => {
    if (!theme) return {}

    // Use the theme object to style our button border. Alternatively, the
    // theme style is defined in CSS vars.
    const borderStyling = `1px solid ${isFocused ? theme.primaryColor : "gray"}`
    return { border: borderStyling, outline: borderStyling }
  }, [theme, isFocused]);

  // setFrameHeight should be called on first render and evertime the size might change (e.g. due to a DOM update).
  // Adding the style and theme here since they might effect the visual size of the component.
  useEffect(() => {
    Streamlit.setFrameHeight()
  }, [style, theme]);


  return (
    <>
      <button
        style={{
          backgroundColor: !account.isConnected ? 'gray' : 'blue',
          color: 'white',
          padding: '15px 30px',
          fontSize: '18px',
          border: 'none',
          borderRadius: '10px',
        }}
        onClick={() =>
          sendTransaction({
            to: getAddress(recipient),
            value: parseEther(valueInEther),
          })
        }
        disabled={!account.isConnected}
      >
        Send transaction
      </button>
      <div
        style={{
          paddingBottom: '500px'
        }}
      >
        <ConnectButton />
      </div>
    </>
  )
}

export default withStreamlitConnection(PythonWeb3Wallet)