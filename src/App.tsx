// import React, { useState, useRef, useEffect } from 'react';
// import { Send, Package, Loader2, Download, Sparkles, MapPin, Store } from 'lucide-react';
// import logo from './Logo.png';
// interface Message {
//   type: 'user' | 'bot';
//   content: string;
//   timestamp?: Date;
//   error?: boolean;
//   sql?: string;
//   query?: string;
//   hasExport?: boolean;
//   isThinking?: boolean;
// }

// interface QueryResponse {
//   answer: string;
//   success: boolean;
//   error?: string;
//   sql?: string;
//   results?: any[];
//   rowCount?: number;
//   hasExport?: boolean;
//   query?: string;
// }

// export default function SephoraStockChecker() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       type: 'bot',
//       content: "Hi! I'm your Sephora Stock Checker Assistant. I can help you check product availability, stock status by zipcode, brand information, and store locations. What would you like to know?"
//     }
//   ]);
//   const [input, setInput] = useState<string>('');
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [exportingIndex, setExportingIndex] = useState<number | null>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const BACKEND_URL = 'http://localhost:8000';
//   // const BACKEND_URL = 'https://sephora-backend-n1qr.onrender.com';

//   const scrollToBottom = (): void => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const sendQuery = async (): Promise<void> => {
//     if (!input.trim() || isLoading) return;

//     const userMessage: Message = {
//       type: 'user',
//       content: input,
//       timestamp: new Date()
//     };

//     setMessages(prev => [...prev, userMessage]);

//     const thinkingMessage: Message = {
//       type: 'bot',
//       content: 'Checking inventory...',
//       timestamp: new Date(),
//       isThinking: true
//     };
//     setMessages(prev => [...prev, thinkingMessage]);

//     const currentQuery = input;
//     setInput('');
//     setIsLoading(true);

//     try {
//       const response = await fetch(`${BACKEND_URL}/api/nl-query`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query: currentQuery })
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data: QueryResponse = await response.json();

//       setMessages(prev => prev.filter(msg => !msg.isThinking));

//       const botMessage: Message = {
//         type: 'bot',
//         content: data.success ? data.answer : `Error: ${data.error || 'Something went wrong'}`,
//         timestamp: new Date(),
//         error: !data.success,
//         sql: data.sql,
//         query: data.query || currentQuery,
//         hasExport: data.hasExport && data.success
//       };

//       setMessages(prev => [...prev, botMessage]);
//     } catch (error) {
//       console.error('Error:', error);
//       setMessages(prev => prev.filter(msg => !msg.isThinking));

//       const errorMessage: Message = {
//         type: 'bot',
//         content: `Failed to connect to server. Please make sure the backend is running on ${BACKEND_URL}`,
//         timestamp: new Date(),
//         error: true
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const exportToExcel = async (message: Message, index: number): Promise<void> => {
//     if (!message.sql) return;

//     setExportingIndex(index);

//     try {
//       const response = await fetch(`${BACKEND_URL}/api/export-excel`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           sql: message.sql,
//           query: message.query
//         })
//       });

//       if (!response.ok) {
//         throw new Error('Export failed');
//       }

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `sephora_stock_${Date.now()}.xlsx`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(url);

//     } catch (error) {
//       console.error('Export error:', error);
//       alert('Failed to export data. Please try again.');
//     } finally {
//       setExportingIndex(null);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendQuery();
//     }
//   };

//   const exampleQueries: string[] = [
//     "Check stock for 2892438 products in zipcode 98007",
//     "Show me all available HAUS LABS BY LADY GAGA items in 90087",
//     "Show me all out of stock stores in zipcode 10036?",
//     "List all out of stock products in my area 10036",
//     "Find all stores in zipcode 98007",
//     "Show me Huda Beauty product availability"
//   ];

//   const handleExampleClick = (query: string): void => {
//     setInput(query);
//   };

//   return (
//     <div style={{ 
//       minHeight: '100vh', 
//       background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', 
//       padding: '20px' 
//     }}>
//       <div style={{ 
//         maxWidth: '900px', 
//         margin: '0 auto', 
//         height: 'calc(100vh - 40px)', 
//         display: 'flex', 
//         flexDirection: 'column', 
//         background: 'white', 
//         borderRadius: '20px', 
//         boxShadow: '0 20px 60px rgba(0,0,0,0.15)', 
//         overflow: 'hidden' 
//       }}>

//         {/* Header */}
//         <div style={{ 
//           background: 'linear-gradient(135deg, #f5b216ff 0%, #f5b216ff 100%)', 
//           padding: '24px', 
//           color: 'white' 

//         }}>
//           <div style={{ 
//             display: 'flex', 
//             alignItems: 'center', 
//             gap: '16px',
//             justifyContent: 'space-between'

//           }}>
//             <div style={{ 
//               background: 'rgba(255,255,255,0.1)', 
//               borderRadius: '16px', 
//               padding: '14px', 
//               display: 'flex', 
//               alignItems: 'center', 
//               justifyContent: 'center', 
//               backdropFilter: 'blur(10px)' 
//             }}>
//               <img src={logo}  height={100}  alt="" />
//             </div>
//             <div style={{ flex: 1 }}>
//               <h1 style={{ 
//                 margin: 0, 
//                 fontSize: '26px', 
//                 fontWeight: 'bold',
//                 letterSpacing: '-0.5px',
//                 color: 'white',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 gap: '10px'
//               }}>
//                 Sephora Stock Checker
//               </h1>
//               <p style={{ 
//                 margin: '4px 0 0', 
//                 fontSize: '14px', 
//                 opacity: 0.9 ,
//                 color: 'white',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 gap: '10px'

//               }}>
//                 Check product availability and store inventory
//               </p>
//             </div>
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               padding: '8px 16px',
//               background: 'rgba(255,255,255,0.1)',
//               borderRadius: '12px',
//               backdropFilter: 'blur(10px)'
//             }}>
//               <img src="https://acumensa.co/SherlockBrandLogo_113x39.png" height='39px' width="112px" alt="" />
//             </div>
//           </div>
//         </div>

//         {/* Messages Container */}
//         <div style={{ 
//           flex: 1, 
//           overflowY: 'auto', 
//           padding: '24px', 
//           background: '#f9fafb' 
//         }}>
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               style={{ 
//                 display: 'flex', 
//                 justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start', 
//                 marginBottom: '20px' 
//               }}
//             >
//               <div style={{
//                 maxWidth: '80%',
//                 background: message.type === 'user'
//                   ? 'linear-gradient(135deg, #000000 0%, #2a2a2a 100%)'
//                   : (message.error ? '#fee2e2' : 'white'),
//                 color: message.type === 'user' ? 'white' : (message.error ? '#991b1b' : '#1f2937'),
//                 padding: '14px 18px',
//                 borderRadius: '16px',
//                 boxShadow: message.type === 'user'
//                   ? '0 4px 12px rgba(0, 0, 0, 0.3)'
//                   : '0 2px 8px rgba(0,0,0,0.1)',
//                 position: 'relative'
//               }}>
//                 {message.isThinking && (
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
//                     <span>{message.content}</span>
//                   </div>
//                 )}

//                 {!message.isThinking && (
//                   <>
//                     <p style={{ 
//                       margin: 0, 
//                       whiteSpace: 'pre-wrap', 
//                       lineHeight: '1.6', 
//                       fontSize: '15px' 
//                     }}>
//                       {message.content}
//                     </p>

//                     <div style={{ 
//                       display: 'flex', 
//                       alignItems: 'center', 
//                       justifyContent: 'space-between', 
//                       marginTop: '12px', 
//                       gap: '12px', 
//                       flexWrap: 'wrap' 
//                     }}>
//                       <p style={{ margin: 0, fontSize: '11px', opacity: 0.7 }}>
//                         {message.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                       </p>
//                       {message.hasExport && message.type === 'bot' && !message.error && (
//                         <button
//                           onClick={() => exportToExcel(message, index)}
//                           disabled={exportingIndex === index}
//                           style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '6px',
//                             padding: '8px 14px',
//                             background: 'linear-gradient(135deg, #000000 0%, #2a2a2a 100%)',
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: '8px',
//                             cursor: exportingIndex === index ? 'not-allowed' : 'pointer',
//                             fontSize: '12px',
//                             fontWeight: '600',
//                             opacity: exportingIndex === index ? 0.6 : 1,
//                             transition: 'all 0.3s',
//                             boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
//                           }}
//                           onMouseEnter={(e) => {
//                             if (exportingIndex !== index) {
//                               e.currentTarget.style.transform = 'translateY(-2px)';
//                               e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
//                             }
//                           }}
//                           onMouseLeave={(e) => {
//                             if (exportingIndex !== index) {
//                               e.currentTarget.style.transform = 'translateY(0)';
//                               e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
//                             }
//                           }}
//                         >
//                           {exportingIndex === index ? (
//                             <>
//                               <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
//                               <span>Exporting...</span>
//                             </>
//                           ) : (
//                             <>
//                               <Download size={14} />
//                               <span>Export to Excel</span>
//                             </>
//                           )}
//                         </button>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           ))}

//           {isLoading && !messages.some(m => m.isThinking) && (
//             <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
//               <div style={{
//                 background: 'white',
//                 padding: '14px 18px',
//                 borderRadius: '16px',
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '10px'
//               }}>
//                 <Loader2 size={18} style={{ animation: 'spin 1s linear infinite', color: '#000000' }} />
//                 <p style={{ margin: 0, color: '#4b5563' }}>Checking inventory...</p>
//               </div>
//             </div>
//           )}

//           <div ref={messagesEndRef} />
//         </div>

//         {/* Example Queries */}
//         {messages.length === 1 && (
//           <div style={{ padding: '0 24px 24px', background: '#f9fafb' }}>
//             <p style={{ 
//               margin: '0 0 14px', 
//               fontWeight: '600', 
//               color: '#4b5563', 
//               fontSize: '14px', 
//               display: 'flex', 
//               alignItems: 'center', 
//               gap: '6px' 
//             }}>
//               <Sparkles size={16} color="#000000" />
//               Try asking me:
//             </p>
//             <div style={{ 
//               display: 'grid', 
//               gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
//               gap: '10px' 
//             }}>
//               {exampleQueries.map((query, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleExampleClick(query)}
//                   style={{
//                     padding: '12px 16px',
//                     background: 'white',
//                     border: '2px solid #e5e7eb',
//                     borderRadius: '12px',
//                     cursor: 'pointer',
//                     textAlign: 'left',
//                     fontSize: '13px',
//                     transition: 'all 0.3s',
//                     color: '#4b5563',
//                     fontWeight: '500',
//                     display: 'flex',
//                     alignItems: 'flex-start',
//                     gap: '8px'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)';
//                     e.currentTarget.style.borderColor = '#000000';
//                     e.currentTarget.style.transform = 'translateY(-2px)';
//                     e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = 'white';
//                     e.currentTarget.style.borderColor = '#e5e7eb';
//                     e.currentTarget.style.transform = 'translateY(0)';
//                     e.currentTarget.style.boxShadow = 'none';
//                   }}
//                 >
//                   <MapPin size={14} style={{ marginTop: '2px', flexShrink: 0 }} />
//                   <span>{query}</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Input Area */}
//         <div style={{ 
//           padding: '20px 24px', 
//           background: 'white', 
//           borderTop: '2px solid #e5e7eb' 
//         }}>
//           <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Ask about stock availability, brands, or store locations..."
//               disabled={isLoading}
//               style={{
//                 flex: 1,
//                 padding: '14px 18px',
//                 border: '2px solid #e5e7eb',
//                 borderRadius: '12px',
//                 fontSize: '15px',
//                 outline: 'none',
//                 transition: 'all 0.3s',
//                 background: '#f9fafb'
//               }}
//               onFocus={(e) => {
//                 e.target.style.borderColor = '#000000';
//                 e.target.style.background = 'white';
//               }}
//               onBlur={(e) => {
//                 e.target.style.borderColor = '#e5e7eb';
//                 e.target.style.background = '#f9fafb';
//               }}
//             />
//             <button
//               onClick={sendQuery}
//               disabled={!input.trim() || isLoading}
//               style={{
//                 padding: '14px 18px',
//                 background: input.trim() && !isLoading
//                   ? 'linear-gradient(135deg, #000000 0%, #2a2a2a 100%)'
//                   : '#d1d5db',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '12px',
//                 cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 transition: 'all 0.3s',
//                 boxShadow: input.trim() && !isLoading ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none'
//               }}
//               onMouseEnter={(e) => {
//                 if (input.trim() && !isLoading) {
//                   e.currentTarget.style.transform = 'translateY(-2px)';
//                   e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.3)';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (input.trim() && !isLoading) {
//                   e.currentTarget.style.transform = 'translateY(0)';
//                   e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
//                 }
//               }}
//             >
//               {isLoading ? (
//                 <Loader2 size={22} style={{ animation: 'spin 1s linear infinite' }} />
//               ) : (
//                 <Send size={22} />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// }





















// import React, { useState, useRef, useEffect } from 'react';
// import { Send, Package, Loader2, Download, Sparkles, MapPin, Store } from 'lucide-react';

// interface Message {
//   type: 'user' | 'bot';
//   content: string;
//   timestamp?: Date;
//   error?: boolean;
//   sql?: string;
//   query?: string;
//   hasExport?: boolean;
//   isThinking?: boolean;
//   results?: any[];
// }

// interface QueryResponse {
//   answer: string;
//   success: boolean;
//   error?: string;
//   sql?: string;
//   results?: any[];
//   rowCount?: number;
//   hasExport?: boolean;
//   query?: string;
// }

// export default function SephoraStockChecker() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       type: 'bot',
//       content: "Hi! I'm your Sephora Stock Checker Assistant. I can help you check product availability, stock status by zipcode, brand information, and store locations. What would you like to know?"
//     }
//   ]);
//   const [input, setInput] = useState<string>('');
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [exportingIndex, setExportingIndex] = useState<number | null>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const BACKEND_URL = 'http://localhost:8000';

//   const scrollToBottom = (): void => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const formatColumnName = (col: string): string => {
//     return col.split('_')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(' ');
//   };

//   const renderTableView = (results: any[], answer: string) => {
//     if (!results || results.length === 0) {
//       return <div style={{ padding: '16px', color: '#6b7280' }}>{answer}</div>;
//     }

//     const columns = Object.keys(results[0]);
    
//     // Group results by store for better organization
//     const groupedByStore: { [key: string]: any[] } = {};
//     results.forEach(row => {
//       const storeName = row.store_name || row.stores || 'Unknown Store';
//       if (!groupedByStore[storeName]) {
//         groupedByStore[storeName] = [];
//       }
//       groupedByStore[storeName].push(row);
//     });

//     return (
//       <div style={{ marginTop: '16px' }}>
//         {/* Summary Section */}
//         <div style={{
//           background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
//           padding: '16px',
//           borderRadius: '12px',
//           marginBottom: '16px',
//           border: '1px solid #bae6fd'
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
//             <Package size={20} color="#0284c7" />
//             <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#0c4a6e' }}>
//               Search Summary
//             </h3>
//           </div>
//           <p style={{ margin: '4px 0', fontSize: '14px', color: '#334155' }}>
//             Found <strong>{results.length}</strong> items across <strong>{Object.keys(groupedByStore).length}</strong> store locations
//           </p>
//         </div>

//         {/* Store Groups */}
//         {Object.entries(groupedByStore).map(([storeName, storeItems], storeIdx) => {
//           const firstItem = storeItems[0];
//           const address = firstItem.store_address || firstItem.address || 'N/A';
//           const zipcode = firstItem.store_zipcode || firstItem.zipcode || 'N/A';
          
//           return (
//             <div key={storeIdx} style={{
//               marginBottom: '24px',
//               border: '2px solid #e5e7eb',
//               borderRadius: '12px',
//               overflow: 'hidden',
//               background: 'white'
//             }}>
//               {/* Store Header */}
//               <div style={{
//                 background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
//                 padding: '16px',
//                 color: 'white'
//               }}>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
//                   <Store size={20} />
//                   <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
//                     {storeName}
//                   </h4>
//                 </div>
//                 <div style={{ fontSize: '13px', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '6px' }}>
//                   <MapPin size={14} />
//                   <span>{address}, {zipcode}</span>
//                 </div>
//                 <div style={{ 
//                   marginTop: '8px', 
//                   fontSize: '12px', 
//                   background: 'rgba(255,255,255,0.1)', 
//                   padding: '6px 12px', 
//                   borderRadius: '6px',
//                   display: 'inline-block'
//                 }}>
//                   {storeItems.length} product{storeItems.length > 1 ? 's' : ''} available
//                 </div>
//               </div>

//               {/* Products Table */}
//               <div style={{ overflowX: 'auto' }}>
//                 <table style={{
//                   width: '100%',
//                   borderCollapse: 'collapse',
//                   fontSize: '13px'
//                 }}>
//                   <thead>
//                     <tr style={{ background: '#f9fafb' }}>
//                       {columns
//                         .filter(col => !['store_name', 'stores', 'store_address', 'address', 'store_zipcode', 'zipcode'].includes(col))
//                         .map((col, idx) => (
//                           <th key={idx} style={{
//                             padding: '12px',
//                             textAlign: 'left',
//                             fontWeight: '600',
//                             color: '#374151',
//                             borderBottom: '2px solid #e5e7eb',
//                             whiteSpace: 'nowrap'
//                           }}>
//                             {formatColumnName(col)}
//                           </th>
//                         ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {storeItems.map((row, rowIdx) => (
//                       <tr key={rowIdx} style={{
//                         background: rowIdx % 2 === 0 ? 'white' : '#f9fafb',
//                         transition: 'background 0.2s'
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.background = '#f0f9ff';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.background = rowIdx % 2 === 0 ? 'white' : '#f9fafb';
//                       }}>
//                         {columns
//                           .filter(col => !['store_name', 'stores', 'store_address', 'address', 'store_zipcode', 'zipcode'].includes(col))
//                           .map((col, colIdx) => {
//                             const value = row[col];
//                             let displayValue = value === null || value === undefined ? 'N/A' : String(value);
//                             let cellStyle: React.CSSProperties = {
//                               padding: '12px',
//                               borderBottom: '1px solid #e5e7eb',
//                               color: '#1f2937'
//                             };

//                             // Special formatting for stock status
//                             if (col === 'in_stock' || col === 'stock_status') {
//                               const isInStock = value === 'y' || value === 'Y' || value === 'In Stock' || value === 'Available';
//                               cellStyle = {
//                                 ...cellStyle,
//                                 fontWeight: '600'
//                               };
//                               displayValue = isInStock ? '✅ In Stock' : '❌ Out of Stock';
//                               cellStyle.color = isInStock ? '#059669' : '#dc2626';
//                             }

//                             // Format quantity
//                             if (col === 'quantity_available' || col === 'quantity') {
//                               const qty = parseInt(value);
//                               if (!isNaN(qty)) {
//                                 if (qty === 0) {
//                                   cellStyle.color = '#dc2626';
//                                   cellStyle.fontWeight = '600';
//                                 } else if (qty < 5) {
//                                   cellStyle.color = '#f59e0b';
//                                   cellStyle.fontWeight = '600';
//                                 } else {
//                                   cellStyle.color = '#059669';
//                                   cellStyle.fontWeight = '600';
//                                 }
//                               }
//                             }

//                             // Brand and product names bold
//                             if (col === 'brand_name' || col === 'product_name') {
//                               cellStyle.fontWeight = '600';
//                               cellStyle.color = '#111827';
//                             }

//                             return (
//                               <td key={colIdx} style={cellStyle}>
//                                 {displayValue}
//                               </td>
//                             );
//                           })}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   const sendQuery = async (): Promise<void> => {
//     if (!input.trim() || isLoading) return;

//     const userMessage: Message = {
//       type: 'user',
//       content: input,
//       timestamp: new Date()
//     };

//     setMessages(prev => [...prev, userMessage]);

//     const thinkingMessage: Message = {
//       type: 'bot',
//       content: 'Checking inventory...',
//       timestamp: new Date(),
//       isThinking: true
//     };
//     setMessages(prev => [...prev, thinkingMessage]);

//     const currentQuery = input;
//     setInput('');
//     setIsLoading(true);

//     try {
//       const response = await fetch(`${BACKEND_URL}/api/nl-query`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query: currentQuery })
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data: QueryResponse = await response.json();

//       setMessages(prev => prev.filter(msg => !msg.isThinking));

//       const botMessage: Message = {
//         type: 'bot',
//         content: data.success ? data.answer : `Error: ${data.error || 'Something went wrong'}`,
//         timestamp: new Date(),
//         error: !data.success,
//         sql: data.sql,
//         query: data.query || currentQuery,
//         hasExport: data.hasExport && data.success,
//         results: data.results || []
//       };

//       setMessages(prev => [...prev, botMessage]);
//     } catch (error) {
//       console.error('Error:', error);
//       setMessages(prev => prev.filter(msg => !msg.isThinking));

//       const errorMessage: Message = {
//         type: 'bot',
//         content: `Failed to connect to server. Please make sure the backend is running on ${BACKEND_URL}`,
//         timestamp: new Date(),
//         error: true
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const exportToExcel = async (message: Message, index: number): Promise<void> => {
//     if (!message.sql) return;

//     setExportingIndex(index);

//     try {
//       const response = await fetch(`${BACKEND_URL}/api/export-excel`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           sql: message.sql,
//           query: message.query
//         })
//       });

//       if (!response.ok) {
//         throw new Error('Export failed');
//       }

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `sephora_stock_${Date.now()}.xlsx`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(url);

//     } catch (error) {
//       console.error('Export error:', error);
//       alert('Failed to export data. Please try again.');
//     } finally {
//       setExportingIndex(null);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendQuery();
//     }
//   };

//   const exampleQueries: string[] = [
//     "Check stock for products in zipcode 98007",
//     "Show me all available HAUS LABS BY LADY GAGA items in 90087",
//     "Show me all out of stock stores in zipcode 10036",
//     "is \"Bio-Radiant Gel-Powder Illuminating Highlighter with Fermented Arnica\" is In stock in zipcode 90087",
//     "Find all stores in zipcode 98007",
//     "Show me Huda Beauty product availability"
//   ];

//   const handleExampleClick = (query: string): void => {
//     setInput(query);
//   };

//   return (
//     <div style={{ 
//       minHeight: '100vh', 
//       background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', 
//       padding: '20px' 
//     }}>
//       <div style={{ 
//         maxWidth: '1400px', 
//         margin: '0 auto', 
//         height: 'calc(100vh - 40px)', 
//         display: 'flex', 
//         flexDirection: 'column', 
//         background: 'white', 
//         borderRadius: '20px', 
//         boxShadow: '0 20px 60px rgba(0,0,0,0.15)', 
//         overflow: 'hidden' 
//       }}>

//         {/* Header */}
//         <div style={{ 
//           background: 'linear-gradient(135deg,  rgb(245, 178, 22) 0%,  rgb(245, 178, 22) 100%)', 
//           padding: '24px', 
//           color: 'white' 
//         }}>
//           <div style={{ 
//             display: 'flex', 
//             alignItems: 'center', 
//             gap: '16px',
//             justifyContent: 'space-between'
//           }}>
//             <div style={{ 
//               background: 'rgba(255,255,255,0.1)', 
//               borderRadius: '16px', 
//               padding: '14px', 
//               display: 'flex', 
//               alignItems: 'center', 
//               justifyContent: 'center', 
//               backdropFilter: 'blur(10px)' 
//             }}>
//               <Package size={32} />
//             </div>
//             <div style={{ flex: 1 }}>
//               <h1 style={{ 
//                 margin: 0, 
//                 fontSize: '26px', 
//                 fontWeight: 'bold',
//                 letterSpacing: '-0.5px',
//                 color: 'white'
//               }}>
//                 Sephora Stock Checker
//               </h1>
//               <p style={{ 
//                 margin: '4px 0 0', 
//                 fontSize: '14px', 
//                 opacity: 0.9,
//                 color: 'white'
//               }}>
//                 Check product availability and store inventory
//               </p>
//             </div>
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               padding: '8px 16px',
//               background: 'rgba(255,255,255,0.1)',
//               borderRadius: '12px',
//               backdropFilter: 'blur(10px)',
//               fontSize: '12px'
//             }}>
//               <Sparkles size={16} />
//               <span>AI Powered</span>
//             </div>
//           </div>
//         </div>

//         {/* Messages Container */}
//         <div style={{ 
//           flex: 1, 
//           overflowY: 'auto', 
//           padding: '24px', 
//           background: '#f9fafb' 
//         }}>
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               style={{ 
//                 marginBottom: '20px' 
//               }}
//             >
//               {message.type === 'user' ? (
//                 <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//                   <div style={{
//                     maxWidth: '70%',
//                     background: 'linear-gradient(135deg, #000000 0%, #2a2a2a 100%)',
//                     color: 'white',
//                     padding: '14px 18px',
//                     borderRadius: '16px',
//                     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
//                   }}>
//                     <p style={{ margin: 0, lineHeight: '1.6', fontSize: '15px' }}>
//                       {message.content}
//                     </p>
//                     <p style={{ margin: '8px 0 0', fontSize: '11px', opacity: 0.7 }}>
//                       {message.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 <div style={{
//                   background: message.error ? '#fee2e2' : 'white',
//                   padding: '18px',
//                   borderRadius: '16px',
//                   boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//                 }}>
//                   {message.isThinking ? (
//                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                       <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
//                       <span>{message.content}</span>
//                     </div>
//                   ) : (
//                     <>
//                       {message.results && message.results.length > 0 ? (
//                         renderTableView(message.results, message.content)
//                       ) : (
//                         <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '15px' }}>
//                           {message.content}
//                         </p>
//                       )}

//                       <div style={{ 
//                         display: 'flex', 
//                         alignItems: 'center', 
//                         justifyContent: 'space-between', 
//                         marginTop: '16px',
//                         paddingTop: '12px',
//                         borderTop: '1px solid #e5e7eb'
//                       }}>
//                         <p style={{ margin: 0, fontSize: '11px', opacity: 0.7 }}>
//                           {message.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                         </p>
//                         {message.hasExport && !message.error && (
//                           <button
//                             onClick={() => exportToExcel(message, index)}
//                             disabled={exportingIndex === index}
//                             style={{
//                               display: 'flex',
//                               alignItems: 'center',
//                               gap: '6px',
//                               padding: '8px 14px',
//                               background: 'linear-gradient(135deg, #000000 0%, #2a2a2a 100%)',
//                               color: 'white',
//                               border: 'none',
//                               borderRadius: '8px',
//                               cursor: exportingIndex === index ? 'not-allowed' : 'pointer',
//                               fontSize: '12px',
//                               fontWeight: '600',
//                               opacity: exportingIndex === index ? 0.6 : 1,
//                               transition: 'all 0.3s'
//                             }}
//                           >
//                             {exportingIndex === index ? (
//                               <>
//                                 <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
//                                 <span>Exporting...</span>
//                               </>
//                             ) : (
//                               <>
//                                 <Download size={14} />
//                                 <span>Export to Excel</span>
//                               </>
//                             )}
//                           </button>
//                         )}
//                       </div>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}

//           <div ref={messagesEndRef} />
//         </div>

//         {/* Example Queries */}
//         {messages.length === 1 && (
//           <div style={{ padding: '0 24px 24px', background: '#f9fafb' }}>
//             <p style={{ 
//               margin: '0 0 14px', 
//               fontWeight: '600', 
//               color: '#4b5563', 
//               fontSize: '14px', 
//               display: 'flex', 
//               alignItems: 'center', 
//               gap: '6px' 
//             }}>
//               <Sparkles size={16} color="#000000" />
//               Try asking me:
//             </p>
//             <div style={{ 
//               display: 'grid', 
//               gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
//               gap: '10px' 
//             }}>
//               {exampleQueries.map((query, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleExampleClick(query)}
//                   style={{
//                     padding: '12px 16px',
//                     background: 'white',
//                     border: '2px solid #e5e7eb',
//                     borderRadius: '12px',
//                     cursor: 'pointer',
//                     textAlign: 'left',
//                     fontSize: '13px',
//                     transition: 'all 0.3s',
//                     color: '#4b5563',
//                     fontWeight: '500'
//                   }}
//                 >
//                   {query}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Input Area */}
//         <div style={{ 
//           padding: '20px 24px', 
//           background: 'white', 
//           borderTop: '2px solid #e5e7eb' 
//         }}>
//           <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Ask about stock availability, brands, or store locations..."
//               disabled={isLoading}
//               style={{
//                 flex: 1,
//                 padding: '14px 18px',
//                 border: '2px solid #e5e7eb',
//                 borderRadius: '12px',
//                 fontSize: '15px',
//                 outline: 'none',
//                 transition: 'all 0.3s',
//                 background: '#f9fafb'
//               }}
//             />
//             <button
//               onClick={sendQuery}
//               disabled={!input.trim() || isLoading}
//               style={{
//                 padding: '14px 18px',
//                 background: input.trim() && !isLoading
//                   ? 'linear-gradient(135deg, #000000 0%, #2a2a2a 100%)'
//                   : '#d1d5db',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '12px',
//                 cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 transition: 'all 0.3s'
//               }}
//             >
//               {isLoading ? (
//                 <Loader2 size={22} style={{ animation: 'spin 1s linear infinite' }} />
//               ) : (
//                 <Send size={22} />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// }















import React, { useState, useRef, useEffect } from 'react';
import { Send, Package, Loader2, Download, Sparkles, MapPin, Store, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp?: Date;
  error?: boolean;
  sql?: string;
  query?: string;
  hasExport?: boolean;
  isThinking?: boolean;
  results?: any[];
}

interface QueryResponse {
  answer: string;
  success: boolean;
  error?: string;
  sql?: string;
  results?: any[];
  rowCount?: number;
  hasExport?: boolean;
  query?: string;
}

export default function SephoraStockChecker() {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: "Hi! I'm your Sephora Stock Checker Assistant. I can help you check product availability, stock status by zipcode, brand information, and store locations. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [exportingIndex, setExportingIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // const BACKEND_URL = 'http://localhost:8000';
   const BACKEND_URL = 'https://sephora-backend-n1qr.onrender.com';


  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatColumnName = (col: string): string => {
    return col.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const prepareChartData = (results: any[]) => {
    if (!results || results.length === 0) return null;

    // Check if we have stock status data
    const hasStockStatus = results.some(row => 
      row.in_stock !== undefined || row.stock_status !== undefined || row.availability !== undefined
    );

    if (!hasStockStatus) return null;

    // Determine the grouping key (sku_id, zipcode, product_name, etc.)
    const firstRow = results[0];
    let groupKey = 'sku_id';
    
    if (firstRow.sku_id) groupKey = 'sku_id';
    else if (firstRow.store_zipcode) groupKey = 'store_zipcode';
    else if (firstRow.zipcode) groupKey = 'zipcode';
    else if (firstRow.product_name) groupKey = 'product_name';
    else if (firstRow.store_name) groupKey = 'store_name';

    // Group and count in stock vs out of stock
    const grouped: { [key: string]: { inStock: number; outOfStock: number } } = {};

    results.forEach(row => {
      const key = row[groupKey] || 'Unknown';
      if (!grouped[key]) {
        grouped[key] = { inStock: 0, outOfStock: 0 };
      }

      const stockValue = row.in_stock || row.stock_status || row.availability;
      const isInStock = stockValue === 'y' || stockValue === 'Y' || stockValue === 'In Stock' || stockValue === 'Available';

      if (isInStock) {
        grouped[key].inStock += 1;
      } else {
        grouped[key].outOfStock += 1;
      }
    });

    // Convert to chart data format
    const chartData = Object.entries(grouped).map(([key, counts]) => ({
      name: String(key).length > 20 ? String(key).substring(0, 17) + '...' : String(key),
      'In Stock': counts.inStock,
      'Out of Stock': counts.outOfStock
    }));

    return chartData.length > 0 ? chartData : null;
  };

  const renderTableView = (results: any[], answer: string) => {
    if (!results || results.length === 0) {
      return <div style={{ padding: '16px', color: '#6b7280' }}>{answer}</div>;
    }

    const columns = Object.keys(results[0]);
    
    // Group results by store for better organization
    const groupedByStore: { [key: string]: any[] } = {};
    results.forEach(row => {
      const storeName = row.store_name || row.stores || 'Unknown Store';
      if (!groupedByStore[storeName]) {
        groupedByStore[storeName] = [];
      }
      groupedByStore[storeName].push(row);
    });

    // Prepare chart data
    const chartData = prepareChartData(results);

    return (
      <div style={{ marginTop: '16px' }}>
        {/* Summary Section */}
        <div style={{
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          padding: '16px',
          borderRadius: '12px',
          marginBottom: '16px',
          border: '1px solid #bae6fd'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Package size={20} color="#0284c7" />
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#0c4a6e' }}>
              Search Summary
            </h3>
          </div>
          <p style={{ margin: '4px 0', fontSize: '14px', color: '#334155' }}>
            Found <strong>{results.length}</strong> items across <strong>{Object.keys(groupedByStore).length}</strong> store locations
          </p>
        </div>

        {/* Chart Section */}
        {chartData && (
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '24px',
            border: '2px solid #e5e7eb',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <BarChart3 size={20} color="#000000" />
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#111827' }}>
                Stock Status Overview
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={100} 
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <YAxis 
                  label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'white', 
                    border: '2px solid #e5e7eb', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="In Stock" fill="#059669" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Out of Stock" fill="#dc2626" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Store Groups */}
        {Object.entries(groupedByStore).map(([storeName, storeItems], storeIdx) => {
          const firstItem = storeItems[0];
          const address = firstItem.store_address || firstItem.address || 'N/A';
          const zipcode = firstItem.store_zipcode || firstItem.zipcode || 'N/A';
          
          return (
            <div key={storeIdx} style={{
              marginBottom: '24px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              overflow: 'hidden',
              background: 'white'
            }}>
              {/* Store Header */}
              <div style={{
                background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
                padding: '16px',
                color: 'white'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Store size={20} />
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                    {storeName}
                  </h4>
                </div>
                <div style={{ fontSize: '13px', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} />
                  <span>{address}, {zipcode}</span>
                </div>
                <div style={{ 
                  marginTop: '8px', 
                  fontSize: '12px', 
                  background: 'rgba(255,255,255,0.1)', 
                  padding: '6px 12px', 
                  borderRadius: '6px',
                  display: 'inline-block'
                }}>
                  {storeItems.length} product{storeItems.length > 1 ? 's' : ''} available
                </div>
              </div>

              {/* Products Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '13px'
                }}>
                  <thead>
                    <tr style={{ background: '#f9fafb' }}>
                      {columns
                        .filter(col => !['store_name', 'stores', 'store_address', 'address', 'store_zipcode', 'zipcode'].includes(col))
                        .map((col, idx) => (
                          <th key={idx} style={{
                            padding: '12px',
                            textAlign: 'left',
                            fontWeight: '600',
                            color: '#374151',
                            borderBottom: '2px solid #e5e7eb',
                            whiteSpace: 'nowrap'
                          }}>
                            {formatColumnName(col)}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {storeItems.map((row, rowIdx) => (
                      <tr key={rowIdx} style={{
                        background: rowIdx % 2 === 0 ? 'white' : '#f9fafb',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f0f9ff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = rowIdx % 2 === 0 ? 'white' : '#f9fafb';
                      }}>
                        {columns
                          .filter(col => !['store_name', 'stores', 'store_address', 'address', 'store_zipcode', 'zipcode'].includes(col))
                          .map((col, colIdx) => {
                            const value = row[col];
                            let displayValue = value === null || value === undefined ? 'N/A' : String(value);
                            let cellStyle: React.CSSProperties = {
                              padding: '12px',
                              borderBottom: '1px solid #e5e7eb',
                              color: '#1f2937'
                            };

                            // Special formatting for stock status
                            if (col === 'in_stock' || col === 'stock_status' || col === 'availability') {
                              const isInStock = value === 'y' || value === 'Y' || value === 'In Stock' || value === 'Available';
                              cellStyle = {
                                ...cellStyle,
                                fontWeight: '600'
                              };
                              displayValue = isInStock ? '✅ In Stock' : '❌ Out of Stock';
                              cellStyle.color = isInStock ? '#059669' : '#dc2626';
                            }

                            // Format quantity
                            if (col === 'quantity_available' || col === 'quantity') {
                              const qty = parseInt(value);
                              if (!isNaN(qty)) {
                                if (qty === 0) {
                                  cellStyle.color = '#dc2626';
                                  cellStyle.fontWeight = '600';
                                } else if (qty < 5) {
                                  cellStyle.color = '#f59e0b';
                                  cellStyle.fontWeight = '600';
                                } else {
                                  cellStyle.color = '#059669';
                                  cellStyle.fontWeight = '600';
                                }
                              }
                            }

                            // Brand and product names bold
                            if (col === 'brand_name' || col === 'product_name') {
                              cellStyle.fontWeight = '600';
                              cellStyle.color = '#111827';
                            }

                            return (
                              <td key={colIdx} style={cellStyle}>
                                {displayValue}
                              </td>
                            );
                          })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const sendQuery = async (): Promise<void> => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    const thinkingMessage: Message = {
      type: 'bot',
      content: 'Checking inventory...',
      timestamp: new Date(),
      isThinking: true
    };
    setMessages(prev => [...prev, thinkingMessage]);

    const currentQuery = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/nl-query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: currentQuery })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: QueryResponse = await response.json();

      setMessages(prev => prev.filter(msg => !msg.isThinking));

      const botMessage: Message = {
        type: 'bot',
        content: data.success ? data.answer : `Error: ${data.error || 'Something went wrong'}`,
        timestamp: new Date(),
        error: !data.success,
        sql: data.sql,
        query: data.query || currentQuery,
        hasExport: data.hasExport && data.success,
        results: data.results || []
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => prev.filter(msg => !msg.isThinking));

      const errorMessage: Message = {
        type: 'bot',
        content: `Failed to connect to server. Please make sure the backend is running on ${BACKEND_URL}`,
        timestamp: new Date(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const exportToExcel = async (message: Message, index: number): Promise<void> => {
    if (!message.sql) return;

    setExportingIndex(index);

    try {
      const response = await fetch(`${BACKEND_URL}/api/export-excel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sql: message.sql,
          query: message.query
        })
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sephora_stock_${Date.now()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setExportingIndex(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendQuery();
    }
  };

  const exampleQueries: string[] = [
    "Check stock for products in zipcode 98007",
    "Show me all available HAUS LABS BY LADY GAGA items in 90087",
    "Show me all out of stock stores in zipcode 10036",
    "is \"Bio-Radiant Gel-Powder Illuminating Highlighter with Fermented Arnica\" is In stock in zipcode 90087",
    "Find all stores in zipcode 98007",
    "Show me Huda Beauty product availability"
  ];

  const handleExampleClick = (query: string): void => {
    setInput(query);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', 
      padding: '20px' 
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        height: 'calc(100vh - 40px)', 
        display: 'flex', 
        flexDirection: 'column', 
        background: 'white', 
        borderRadius: '20px', 
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)', 
        overflow: 'hidden' 
      }}>

        {/* Header */}
        <div style={{ 
          background: 'linear-gradient(135deg,  rgb(245, 178, 22) 0%,  rgb(245, 178, 22) 100%)', 
          padding: '24px', 
          color: 'white' 
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px',
            justifyContent: 'space-between'
          }}>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              borderRadius: '16px', 
              padding: '14px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              backdropFilter: 'blur(10px)' 
            }}>
              <Package size={32} />
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ 
                margin: 0, 
                fontSize: '26px', 
                fontWeight: 'bold',
                letterSpacing: '-0.5px',
                color: 'white'
              }}>
                Sephora Stock Checker
              </h1>
              <p style={{ 
                margin: '4px 0 0', 
                fontSize: '14px', 
                opacity: 0.9,
                color: 'white'
              }}>
                Check product availability and store inventory
              </p>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              fontSize: '12px'
            }}>
              <Sparkles size={16} />
              <span>AI Powered</span>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '24px', 
          background: '#f9fafb' 
        }}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{ 
                marginBottom: '20px' 
              }}
            >
              {message.type === 'user' ? (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{
                    maxWidth: '70%',
                    background: 'linear-gradient(135deg, #000000 0%, #2a2a2a 100%)',
                    color: 'white',
                    padding: '14px 18px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                  }}>
                    <p style={{ margin: 0, lineHeight: '1.6', fontSize: '15px' }}>
                      {message.content}
                    </p>
                    <p style={{ margin: '8px 0 0', fontSize: '11px', opacity: 0.7 }}>
                      {message.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ) : (
                <div style={{
                  background: message.error ? '#fee2e2' : 'white',
                  padding: '18px',
                  borderRadius: '16px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  {message.isThinking ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                      <span>{message.content}</span>
                    </div>
                  ) : (
                    <>
                      {message.results && message.results.length > 0 ? (
                        renderTableView(message.results, message.content)
                      ) : (
                        <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '15px' }}>
                          {message.content}
                        </p>
                      )}

                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        marginTop: '16px',
                        paddingTop: '12px',
                        borderTop: '1px solid #e5e7eb'
                      }}>
                        <p style={{ margin: 0, fontSize: '11px', opacity: 0.7 }}>
                          {message.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        {message.hasExport && !message.error && (
                          <button
                            onClick={() => exportToExcel(message, index)}
                            disabled={exportingIndex === index}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '8px 14px',
                              background: 'linear-gradient(135deg, #000000 0%, #2a2a2a 100%)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: exportingIndex === index ? 'not-allowed' : 'pointer',
                              fontSize: '12px',
                              fontWeight: '600',
                              opacity: exportingIndex === index ? 0.6 : 1,
                              transition: 'all 0.3s'
                            }}
                          >
                            {exportingIndex === index ? (
                              <>
                                <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
                                <span>Exporting...</span>
                              </>
                            ) : (
                              <>
                                <Download size={14} />
                                <span>Export to Excel</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Example Queries */}
        {messages.length === 1 && (
          <div style={{ padding: '0 24px 24px', background: '#f9fafb' }}>
            <p style={{ 
              margin: '0 0 14px', 
              fontWeight: '600', 
              color: '#4b5563', 
              fontSize: '14px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px' 
            }}>
              <Sparkles size={16} color="#000000" />
              Try asking me:
            </p>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '10px' 
            }}>
              {exampleQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(query)}
                  style={{
                    padding: '12px 16px',
                    background: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '13px',
                    transition: 'all 0.3s',
                    color: '#4b5563',
                    fontWeight: '500'
                  }}
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div style={{ 
          padding: '20px 24px', 
          background: 'white', 
          borderTop: '2px solid #e5e7eb' 
        }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about stock availability, brands, or store locations..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '14px 18px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.3s',
                background: '#f9fafb'
              }}
            />
            <button
              onClick={sendQuery}
              disabled={!input.trim() || isLoading}
              style={{
                padding: '14px 18px',
                background: input.trim() && !isLoading
                  ? 'linear-gradient(135deg, #000000 0%, #2a2a2a 100%)'
                  : '#d1d5db',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s'
              }}
            >
              {isLoading ? (
                <Loader2 size={22} style={{ animation: 'spin 1s linear infinite' }} />
              ) : (
                <Send size={22} />
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}