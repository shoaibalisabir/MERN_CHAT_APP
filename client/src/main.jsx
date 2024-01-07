import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import ChatProvider from './context/ChatProvider'
// import UserContextProvider from './context/UserContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <ChatProvider>
          <App />
        </ChatProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)


///////////////



// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import './index.css'
// import Cap from './cap.jsx'
// import { ChakraProvider } from '@chakra-ui/react'
// import ChatProvider from './context/ChatProvider'
// // import UserContextProvider from './context/UserContextProvider.jsx'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <ChakraProvider>
//       <BrowserRouter>
//         <ChatProvider>
//           <Cap />
//         </ChatProvider>
//       </BrowserRouter>
//     </ChakraProvider>
//   </React.StrictMode>,
// )
