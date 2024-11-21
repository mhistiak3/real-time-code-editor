import { io }  from "socket.io-client"

export const initSocket = async ()=>{
    const options = {
        'force new connection': true,
        reconnectionAttempts: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    }
   return io(
     import.meta.env.VITE_BACKEND_URL ||
       "https://real-time-code-editor-nu.vercel.app",
     options
   );
}
// https://real-time-code-editor-pg85.onrender.com