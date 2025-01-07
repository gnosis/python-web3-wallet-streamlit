import {
  Streamlit,
  withStreamlitConnection,
  ComponentProps,
} from "streamlit-component-lib";
import { type Hex, getAddress, parseEther } from 'viem';
import React, { useEffect, useMemo, useState, ReactElement } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import '@rainbow-me/rainbowkit/styles.css';
import { useAccount, useSendTransaction, useWriteContract, useChainId, useWaitForTransactionReceipt, BaseError } from "wagmi";
import { abi } from './abi';
import { AGENT_COMMUNICATION_CONTRACT } from "./constants";
/**
 * This is a React-based component template. The passed props are coming from the 
 * Streamlit library. Your custom args can be accessed via the `args` props.
 */
function PythonWeb3Wallet({ args, disabled, theme }: ComponentProps): ReactElement {
  const { recipient, amountInEther, data } = args;

  const {
    data: hash,
    error,
    writeContractAsync
  } = useWriteContract();

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


  const sendMessage = async () => {
    console.log(`sending message with content ${data as Hex} to ${recipient}`);

    try {
      const txHash = await writeContractAsync({
        abi,
        address: AGENT_COMMUNICATION_CONTRACT,
        functionName: 'sendMessage',
        args: [
          getAddress(recipient),
          data as Hex,
        ],
        value: parseEther(amountInEther),
      }, {
        onError: (err) => console.log(err),
      });
      console.log(`txHash ${txHash}`);
    } catch {
      // We simply pass here since errors already logged.
    }


  };



  return (
    <>
      <button
        style={{
          backgroundColor: !account.isConnected ? 'gray' : 'blue',
          color: 'white',
          padding: '15px 30px',
          marginBottom: '15px',
          fontSize: '18px',
          border: 'none',
          borderRadius: '10px',
        }}
        onClick={(sendMessage)}
        disabled={!account.isConnected}
      >
        Send message to agent
      </button>

      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}


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