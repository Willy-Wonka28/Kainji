import { useState, useEffect } from 'react';
import { PrivyProvider, usePrivy } from '@privy-io/react-auth';
import { Toaster } from 'sonner';
import { toast } from 'sonner';



import './App.css';

// Providers component to wrap the app with PrivyProvider
export function Providers({ children }) {
  return (
    <PrivyProvider
      appId="cm9mx2swq04sljv0njval8ybw" 
      clientId="client-WY5ivPCMq5trNLDGhNcSqCRCM3RfyPXmdiMsFhEv98Tg4"
    >
      {children}
      <Toaster position="top-right" richColors closeButton />
    </PrivyProvider>
  );
}


const App = () => {
  const { authenticated, login, logout, user, ready } = usePrivy();
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [response, setResponse] = useState(null);
  const [decimals, setDecimals] = useState("6");
  const [initialSupply, setInitialSupply] = useState("");
  const [description, setDescription] = useState("");
  const [supplyCap, setSupplyCap] = useState("");

  useEffect(() => {
    console.log(`Authentication state changed: ${authenticated ? "Logged in" : "Logged out"}`);
    toast({
      title: "Auth state changed",
      description: "You are now " + (authenticated ? "logged in" : "logged out"),
      duration: 3000,
    })
  }, [authenticated]);


  const handleMint = async () => {
    console.log('Minting Token', { tokenName, amount });
    setResponse(`Minted ${amount} of ${tokenName} successfully!`);
  };

  const inputStyle = "w-full mt-2 p-3 border bg-gray-900 text-white border-gray-700 rounded-lg focus:border-[#82181A] focus:ring-1 focus:ring-[#82181A] focus:outline-none";
  const labelStyle = "block text-sm font-medium text-gray-300 mb-1";

  return (
        <div className="min-h-screen bg-black text-white">
          {/* Header */}
          <header className="border-b border-gray-800 px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">Kainji</h1>
              <div>
                 {authenticated ? (
                   <button
                     onClick={() => logout()}
                     className="bg-[#82181A] rounded-lg text-white px-4 py-2 hover:scale-105"
                   >
                     Disconnect
                   </button>
                 ) : (
                   <button
                     onClick={() => login()}
                     className="bg-[#82181A] rounded-lg text-white px-4 py-2 hover:scale-105"
                   >
                     Connect Wallet
                   </button>
                 )}
               </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-6 py-12">
            <div className="max-w-5xl mx-auto bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800 grid grid-cols-2 gap-6">
              <div className="bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800">
              {response && (
              <div className="mt-6 text-center text-sm text-gray-700">
                    <p>{response}</p>
                  </div>
                )}
                <h2 className="text-3xl font-bold text-center mb-8">Create Your Token</h2>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-6 ">
                  <div>
                    <label htmlFor="tokenName" className={labelStyle}>Token Name</label>
                    <input
                      type="text"
                      id="tokenName"
                      value={tokenName}
                      onChange={(e) => setTokenName(e.target.value)}
                      placeholder="Enter token name"
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label htmlFor="tokenSymbol" className={labelStyle}>Token Symbol</label>
                    <input
                      type="text"
                      id="tokenSymbol"
                      value={tokenSymbol}
                      onChange={(e) => setTokenSymbol(e.target.value)}
                      placeholder="Enter token symbol (e.g. SEI)"
                      className={inputStyle}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="decimals" className={labelStyle}>Decimals (Optional)</label>
                      <input
                        type="number"
                        id="decimals"
                        value={decimals}
                        onChange={(e) => setDecimals(e.target.value)}
                        className={inputStyle}
                      />
                    </div>

                    <div>
                      <label htmlFor="initialSupply" className={labelStyle}>Initial Supply</label>
                      <input
                        type="number"
                        id="initialSupply"
                        value={initialSupply}
                        onChange={(e) => setInitialSupply(e.target.value)}
                        placeholder="Enter initial supply"
                        className={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="supplyCap" className={labelStyle}>Supply Cap (Optional)</label>
                    <input
                      type="number"
                      id="supplyCap"
                      value={supplyCap}
                      onChange={(e) => setSupplyCap(e.target.value)}
                      placeholder="Maximum supply (leave empty for no cap)"
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className={labelStyle}>Description (Optional)</label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter token description"
                      className={`${inputStyle} resize-none`}
                      rows={3}
                    />
                  </div>

                  <button
                      onClick={handleMint}
                      className="w-full py-3 bg-[#82181A] text-white rounded-lg font-medium hover:bg-[#92282A] transition-colors"
                    >
                      Create Token
                    </button>
                </form>
            </div>
            {/*section explaining stuffs to the user */}
        <div className="bg-[#0f172a] text-white p-6 max-w-3xl mx-auto mt-8">
        <div className="space-y-4 mb-6">
        <h3 className="text-3xl font-semibold mb-2">Steps to Create Token</h3>
        <ol className="list-decimal list-inside text-sm text-gray-300 space-y-1">
          <li>Connect your wallet to the Sei network.</li>
          <li>Enter your desired token name and symbol.</li>
          <li>Set the initial supply and decimals value.</li>
          <li>Add a short description of your token.</li>
          <li>Submit to mint the token on-chain.</li>
        </ol>
          <div>
            <p className="font-semibold text-lg">Token Name</p>
            <p className="text-sm text-gray-300">The full name of your token (e.g., “MyToken”). This is how users will identify it.</p>
          </div>
          <div>
            <p className="font-semibold text-lg">Token Symbol</p>
            <p className="text-sm text-gray-300">The short ticker symbol (e.g., "SEI”). Usually 3–8 uppercase letters.</p>
          </div>
          <div>
            <p className="font-semibold text-lg">Initial Supply</p>
            <p className="text-sm text-gray-300">Total number of tokens that will be minted when the token is created.</p>
          </div>
          <div>
            <p className="font-semibold text-lg">Description</p>
            <p className="text-sm text-gray-300">A brief explanation or mission statement for your token.</p>
          </div>
          <div>
            <p className="font-semibold text-lg">Decimals</p>
            <p className="text-sm text-gray-300">Defines how divisible your token is. A value of 6 means a user can hold 0.000001 units. The default value is set to 6.</p>
          </div>
        </div>
      </div>
      </div>
          </main>
        </div>
  );
};

export default function AppWithProviders() {
  return (
    <Providers>
      <App />
    </Providers>
  );
}
