

// // import React, { useState, useRef, useEffect } from 'react';
// // import { Send, Database, Loader2, Download } from 'lucide-react';

// // interface Message {
// //   type: 'user' | 'bot';
// //   content: string;
// //   timestamp: Date;
// //   error?: boolean;
// //   query?: string; // Store original query for export
// //   hasExport?: boolean;
// // }

// // interface QueryResponse { 
// //   answer: string;
// //   success: boolean;
// //   error?: string;
// //   sql?: string;
// //   results?: any[];
// //   rowCount?: number;
// //   hasExport?: boolean;
// // }

// // export default function ChatInterface() {
// //   const [messages, setMessages] = useState<Message[]>([
// //     {
// //       type: 'bot',
// //       content: 'Hello! I can help you query your Instagram database. Ask me anything about creators, posts, or brands.',
// //       timestamp: new Date()
// //     }
// //   ]);
// //   const [input, setInput] = useState<string>('');
// //   const [isLoading, setIsLoading] = useState<boolean>(false);
// //   const messagesEndRef = useRef<HTMLDivElement>(null);

// //   // Backend URL - change this based on your environment
// //   const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

// //   const scrollToBottom = (): void => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   };

// //   useEffect(() => {
// //     scrollToBottom();
// //   }, [messages]);

// //   const sendQuery = async (): Promise<void> => {
// //     if (!input.trim() || isLoading) return;

// //     const userMessage: Message = {
// //       type: 'user',
// //       content: input,
// //       timestamp: new Date()
// //     };

// //     setMessages(prev => [...prev, userMessage]);
// //     setInput('');
// //     setIsLoading(true);

// //     try {
// //       // Fixed endpoint URL - changed from /query to /api/nl-query
// //       const response = await fetch(`${BACKEND_URL}/api/nl-query`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ query: input })
// //       });

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const data: QueryResponse = await response.json();

// //       const botMessage: Message = {
// //         type: 'bot',
// //         content: data.success ? data.answer : `Error: ${data.error || 'Something went wrong'}`,
// //         timestamp: new Date(),
// //         error: !data.success
// //       };

// //       setMessages(prev => [...prev, botMessage]);
// //     } catch (error) {
// //       console.error('Error:', error);
// //       const errorMessage: Message = {
// //         type: 'bot',
// //         content: `Failed to connect to server. Please make sure the backend is running on ${BACKEND_URL}`,
// //         timestamp: new Date(),
// //         error: true
// //       };
// //       setMessages(prev => [...prev, errorMessage]);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
// //     if (e.key === 'Enter' && !e.shiftKey) {
// //       e.preventDefault();
// //       sendQuery();
// //     }
// //   };

// //   const exampleQueries: string[] = [
// //     "Show me posts by creator saket gokhale",
// //     "How many total views did each creator get?",
// //     "List all brands in the database",
// //     "What are the top 5 most liked posts?"
// //   ];

// //   const handleExampleClick = (query: string): void => {
// //     setInput(query);
// //   };

// //   return (
// //     <div className="app-container">
// //       <div className="chat-wrapper">
// //         {/* Header */}
// //         <div className="chat-header">
// //           <div className="header-content">
// //             <div className="icon-wrapper">
// //               <Database className="header-icon" />
// //             </div>
// //             <div className="header-text">
// //               <h1 className="header-title">Instagram Database Assistant</h1>
// //               <p className="header-subtitle">Ask questions in natural language</p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Chat Messages */}
// //         <div className="messages-container">
// //           {messages.map((message, index) => (
// //             <div
// //               key={index}
// //               className={`message-wrapper ${message.type === 'user' ? 'message-user' : 'message-bot'}`}
// //             >
// //               <div className={`message-bubble ${message.type} ${message.error ? 'error' : ''}`}>
// //                 <p className="message-content">{message.content}</p>
// //                 <p className="message-timestamp">
// //                   {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// //                 </p>
// //               </div>
// //             </div>
// //           ))}

// //           {isLoading && (
// //             <div className="message-wrapper message-bot">
// //               <div className="message-bubble bot loading-message">
// //                 <Loader2 className="loading-icon" />
// //                 <p className="message-content">Processing query...</p>
// //               </div>
// //             </div>
// //           )}

// //           <div ref={messagesEndRef} />
// //         </div>

// //         {/* Example Queries */}
// //         {messages.length === 1 && (
// //           <div className="examples-container">
// //             <p className="examples-title">Try these examples:</p>
// //             <div className="examples-grid">
// //               {exampleQueries.map((query, index) => (
// //                 <button
// //                   key={index}
// //                   onClick={() => handleExampleClick(query)}
// //                   className="example-button"
// //                 >
// //                   {query}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         {/* Input Area */}
// //         <div className="input-container">
// //           <div className="input-wrapper">
// //             <input
// //               type="text"
// //               value={input}
// //               onChange={(e) => setInput(e.target.value)}
// //               onKeyPress={handleKeyPress}
// //               placeholder="Ask a question about your database..."
// //               className="message-input"
// //               disabled={isLoading}
// //             />
// //             <button
// //               onClick={sendQuery}
// //               disabled={!input.trim() || isLoading}
// //               className="send-button"
// //             >
// //               {isLoading ? (
// //                 <Loader2 className="button-icon spinning" />
// //               ) : (
// //                 <Send className="button-icon" />
// //               )}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState, useRef, useEffect } from 'react';
// import { Send, Database, Loader2, Download } from 'lucide-react';
// import './App.css';

// interface Message {
//   type: 'user' | 'bot';
//   content: string;
//   timestamp: Date;
//   error?: boolean;
//   sql?: string;
//   query?: string;
//   hasExport?: boolean;
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

// export default function ChatInterface() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       type: 'bot',
//       content: 'Hello! I can help you query your Instagram database. Ask me anything about creators, posts, or brands.',
//       timestamp: new Date()
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

//   const sendQuery = async (): Promise<void> => {
//     if (!input.trim() || isLoading) return;

//     const userMessage: Message = {
//       type: 'user',
//       content: input,
//       timestamp: new Date()
//     };

//     setMessages(prev => [...prev, userMessage]);
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
//       a.download = `query_results_${Date.now()}.xlsx`;
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
//     "Show me posts by creator saket gokhale",
//     "How many total views did each creator get?",
//     "List all brands in the database",
//     "What are the top 5 most liked posts?"
//   ];

//   const handleExampleClick = (query: string): void => {
//     setInput(query);
//   };

//   return (
//     <div className="app-container">
//       <div className="chat-wrapper">
//         {/* Header */}
//         <div className="chat-header">
//           <div className="header-content">
//             <div className="icon-wrapper">
//               <Database className="header-icon" />
//             </div>
//             <div className="header-text">
//               <h1 className="header-title">Instagram Database Assistant</h1>
//               <p className="header-subtitle">Ask questions in natural language</p>
//             </div>
//           </div>
//         </div>

//         {/* Chat Messages */}
//         <div className="messages-container">
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               className={`message-wrapper ${message.type === 'user' ? 'message-user' : 'message-bot'}`}
//             >
//               <div className={`message-bubble ${message.type} ${message.error ? 'error' : ''}`}>
//                 <p className="message-content">{message.content}</p>
//                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px', gap: '12px' }}>
//                   <p className="message-timestamp">
//                     {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                   </p>
//                   {message.hasExport && message.type === 'bot' && !message.error && (
//                     <button
//                       onClick={() => exportToExcel(message, index)}
//                       disabled={exportingIndex === index}
//                       className="export-button"
//                     >
//                       {exportingIndex === index ? (
//                         <>
//                           <Loader2 className="export-icon spinning" />
//                           <span>Exporting...</span>
//                         </>
//                       ) : (
//                         <>
//                           <Download className="export-icon" />
//                           <span>Export Excel</span>
//                         </>
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}

//           {isLoading && (
//             <div className="message-wrapper message-bot">
//               <div className="message-bubble bot loading-message">
//                 <Loader2 className="loading-icon" />
//                 <p className="message-content">Processing query...</p>
//               </div>
//             </div>
//           )}

//           <div ref={messagesEndRef} />
//         </div>

//         {/* Example Queries */}
//         {messages.length === 1 && (
//           <div className="examples-container">
//             <p className="examples-title">Try these examples:</p>
//             <div className="examples-grid">
//               {exampleQueries.map((query, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleExampleClick(query)}
//                   className="example-button"
//                 >
//                   {query}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Input Area */}
//         <div className="input-container">
//           <div className="input-wrapper">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Ask a question about your database..."
//               className="message-input"
//               disabled={isLoading}
//             />
//             <button
//               onClick={sendQuery}
//               disabled={!input.trim() || isLoading}
//               className="send-button"
//             >
//               {isLoading ? (
//                 <Loader2 className="button-icon spinning" />
//               ) : (
//                 <Send className="button-icon" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useRef, useEffect } from 'react';
// import { Send, Database, Loader2, Download } from 'lucide-react';
// import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// interface Message {
//   type: 'user' | 'bot';
//   content: string;
//   timestamp: Date;
//   error?: boolean;
//   sql?: string;
//   query?: string;
//   hasExport?: boolean;
//   chartData?: any;
//   chartType?: 'bar' | 'line' | 'pie';
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

// const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#f97316', '#6366f1'];

// export default function ChatInterface() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       type: 'bot',
//       content: 'Hello! I can help you query your Instagram database. Ask me anything about creators, posts, or brands. You can also ask me to create charts and graphs!',
//       timestamp: new Date()
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

//   const detectChartRequest = (query: string): { shouldChart: boolean; chartType: 'bar' | 'line' | 'pie' } => {
//     const lowerQuery = query.toLowerCase();
    
//     if (lowerQuery.includes('pie chart') || lowerQuery.includes('pie graph') || 
//         lowerQuery.includes('distribution') || lowerQuery.includes('proportion')) {
//       return { shouldChart: true, chartType: 'pie' };
//     }
    
//     if (lowerQuery.includes('line chart') || lowerQuery.includes('line graph') || 
//         lowerQuery.includes('trend') || lowerQuery.includes('over time')) {
//       return { shouldChart: true, chartType: 'line' };
//     }
    
//     if (lowerQuery.includes('chart') || lowerQuery.includes('graph') || 
//         lowerQuery.includes('bar chart') || lowerQuery.includes('bar graph') ||
//         lowerQuery.includes('visualize') ) {
//       return { shouldChart: true, chartType: 'bar' };
//     }
    
//     return { shouldChart: false, chartType: 'bar' };
//   };

//   const prepareChartData = (results: any[], chartType: 'bar' | 'line' | 'pie'): any => {
//     if (!results || results.length === 0) {
//       console.log('No results to chart');
//       return null;
//     }
    
//     const keys = Object.keys(results[0]);
//     console.log('Available columns:', keys);
//     console.log('First row sample:', results[0]);
    
//     // Find numeric and text columns
//     const numericCols = keys.filter(key => {
//       const val = results[0][key];
//       return typeof val === 'number' || (typeof val === 'string' && !isNaN(Number(val)));
//     });
//     const textCols = keys.filter(key => typeof results[0][key] === 'string' && isNaN(Number(results[0][key])));
    
//     console.log('Numeric columns:', numericCols);
//     console.log('Text columns:', textCols);
    
//     if (numericCols.length === 0) {
//       console.log('No numeric columns found');
//       return null;
//     }
    
//     // Use first text column as label, first numeric as value
//     const labelKey = textCols[0] || keys[0];
//     const valueKey = numericCols[0];
    
//     console.log('Using labelKey:', labelKey, 'valueKey:', valueKey);
    
//     const chartData = {
//       data: results.slice(0, 20).map(row => ({
//         name: String(row[labelKey]).substring(0, 30),
//         value: Number(row[valueKey]),
//         fullData: row
//       })),
//       labelKey,
//       valueKey
//     };
    
//     console.log('Chart data prepared:', chartData);
//     return chartData;
//   };

//   const sendQuery = async (): Promise<void> => {
//     if (!input.trim() || isLoading) return;

//     const userMessage: Message = {
//       type: 'user',
//       content: input,
//       timestamp: new Date()
//     };

//     setMessages(prev => [...prev, userMessage]);
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

//       // Detect if chart is requested
//       const { shouldChart, chartType } = detectChartRequest(currentQuery);
//       let chartData = null;

//       if (shouldChart && data.success && data.results && data.results.length > 0) {
//         chartData = prepareChartData(data.results, chartType);
//       }

//       const botMessage: Message = {
//         type: 'bot',
//         content: data.success ? data.answer : `Error: ${data.error || 'Something went wrong'}`,
//         timestamp: new Date(),
//         error: !data.success,
//         sql: data.sql,
//         query: data.query || currentQuery,
//         hasExport: data.hasExport && data.success,
//         chartData: chartData,
//         chartType: chartData ? chartType : undefined
//       };

//       setMessages(prev => [...prev, botMessage]);
//     } catch (error) {
//       console.error('Error:', error);
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
//       a.download = `query_results_${Date.now()}.xlsx`;
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

//   const renderChart = (message: Message) => {
//     if (!message.chartData || !message.chartType) return null;

//     const { data } = message.chartData;

//     return (
//       <div style={{ width: '100%', height: '300px', marginTop: '16px', background: 'white', borderRadius: '8px', padding: '16px' }}>
//         {message.chartType === 'bar' && (
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="value" fill="#3b82f6" />
//             </BarChart>
//           </ResponsiveContainer>
//         )}
//         {message.chartType === 'line' && (
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         )}
//         {message.chartType === 'pie' && (
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={(entry: any) => entry.name}
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {data.map((entry: any, index: number) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         )}
//       </div>
//     );
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendQuery();
//     }
//   };

//   const exampleQueries: string[] = [
//     "Show me a bar chart of total views by creator",
//     "Create a pie chart of posts by brand",
//     "Show me a line graph of engagement over time",
//     "What are the top 5 most liked posts?"
//   ];

//   const handleExampleClick = (query: string): void => {
//     setInput(query);
//   };

//   return (
//     <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
//       <div style={{ maxWidth: '900px', margin: '0 auto', height: 'calc(100vh - 40px)', display: 'flex', flexDirection: 'column', background: 'white', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', overflow: 'hidden' }}>
        
//         {/* Header */}
//         <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px', color: 'white' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//             <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               <Database size={28} />
//             </div>
//             <div>
//               <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Instagram Database Assistant</h1>
//               <p style={{ margin: '4px 0 0', fontSize: '14px', opacity: 0.9 }}>Ask questions in natural language or request charts</p>
//             </div>
//           </div>
//         </div>

//         {/* Messages */}
//         <div style={{ flex: 1, overflowY: 'auto', padding: '20px', background: '#f9fafb' }}>
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               style={{ display: 'flex', justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start', marginBottom: '16px' }}
//             >
//               <div style={{ 
//                 maxWidth: '75%', 
//                 background: message.type === 'user' ? '#667eea' : (message.error ? '#fee2e2' : 'white'),
//                 color: message.type === 'user' ? 'white' : (message.error ? '#991b1b' : '#1f2937'),
//                 padding: '12px 16px',
//                 borderRadius: '12px',
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//               }}>
//                 <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>{message.content}</p>
                
//                 {renderChart(message)}

//                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px', gap: '12px' }}>
//                   <p style={{ margin: 0, fontSize: '11px', opacity: 0.7 }}>
//                     {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                   </p>
//                   {message.hasExport && message.type === 'bot' && !message.error && (
//                     <button
//                       onClick={() => exportToExcel(message, index)}
//                       disabled={exportingIndex === index}
//                       style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '6px',
//                         padding: '6px 12px',
//                         background: '#667eea',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: '6px',
//                         cursor: exportingIndex === index ? 'not-allowed' : 'pointer',
//                         fontSize: '12px',
//                         opacity: exportingIndex === index ? 0.6 : 1
//                       }}
//                     >
//                       {exportingIndex === index ? (
//                         <>
//                           <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
//                           <span>Exporting...</span>
//                         </>
//                       ) : (
//                         <>
//                           <Download size={14} />
//                           <span>Export Excel</span>
//                         </>
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}

//           {isLoading && (
//             <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
//               <div style={{ background: 'white', padding: '12px 16px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                 <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
//                 <p style={{ margin: 0 }}>Processing query...</p>
//               </div>
//             </div>
//           )}

//           <div ref={messagesEndRef} />
//         </div>

//         {/* Examples */}
//         {messages.length === 1 && (
//           <div style={{ padding: '0 20px 20px', background: '#f9fafb' }}>
//             <p style={{ margin: '0 0 12px', fontWeight: '600', color: '#4b5563', fontSize: '14px' }}>Try these examples:</p>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
//               {exampleQueries.map((query, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleExampleClick(query)}
//                   style={{
//                     padding: '10px 14px',
//                     background: 'white',
//                     border: '1px solid #e5e7eb',
//                     borderRadius: '8px',
//                     cursor: 'pointer',
//                     textAlign: 'left',
//                     fontSize: '13px',
//                     transition: 'all 0.2s',
//                     color: '#4b5563'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = '#f3f4f6';
//                     e.currentTarget.style.borderColor = '#667eea';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = 'white';
//                     e.currentTarget.style.borderColor = '#e5e7eb';
//                   }}
//                 >
//                   {query}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Input */}
//         <div style={{ padding: '16px 20px', background: 'white', borderTop: '1px solid #e5e7eb' }}>
//           <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Ask a question or request a chart..."
//               disabled={isLoading}
//               style={{
//                 flex: 1,
//                 padding: '12px 16px',
//                 border: '2px solid #e5e7eb',
//                 borderRadius: '10px',
//                 fontSize: '14px',
//                 outline: 'none',
//                 transition: 'border-color 0.2s'
//               }}
//               onFocus={(e) => e.target.style.borderColor = '#667eea'}
//               onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
//             />
//             <button
//               onClick={sendQuery}
//               disabled={!input.trim() || isLoading}
//               style={{
//                 padding: '12px 16px',
//                 background: input.trim() && !isLoading ? '#667eea' : '#d1d5db',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '10px',
//                 cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 transition: 'all 0.2s'
//               }}
//             >
//               {isLoading ? (
//                 <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
//               ) : (
//                 <Send size={20} />
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
// import { Send, Database, Loader2, Download, TrendingUp, BarChart3 } from 'lucide-react';
// import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// interface Message {
//   type: 'user' | 'bot';
//   content: string;
//   timestamp: Date;
//   error?: boolean;
//   sql?: string;
//   query?: string;
//   hasExport?: boolean;
//   chartData?: any;
//   chartType?: 'bar' | 'line' | 'pie';
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

// const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#f97316', '#6366f1'];

// export default function ChatInterface() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       type: 'bot',
//       content: 'Hello! I can help you query your Instagram database. Ask me anything about creators, posts, or brands. You can also ask me to create charts and graphs!',
//       timestamp: new Date()
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

//   const detectChartRequest = (query: string): { shouldChart: boolean; chartType: 'bar' | 'line' | 'pie' } => {
//     const lowerQuery = query.toLowerCase();
    
//     if (lowerQuery.includes('pie chart') || lowerQuery.includes('pie graph') || 
//         lowerQuery.includes('distribution') || lowerQuery.includes('proportion')||lowerQuery.includes('compare')) {
//       return { shouldChart: true, chartType: 'pie' };
//     }
    
//     if (lowerQuery.includes('line chart') || lowerQuery.includes('line graph') || 
//         lowerQuery.includes('trend') || lowerQuery.includes('over time')) {
//       return { shouldChart: true, chartType: 'line' };
//     }
    
//     if (lowerQuery.includes('chart') || lowerQuery.includes('graph') || 
//         lowerQuery.includes('bar chart') || lowerQuery.includes('bar graph') ||
//         lowerQuery.includes('visualize')|| lowerQuery.includes('top')) {
//       return { shouldChart: true, chartType: 'bar' };
//     }
    
//     return { shouldChart: false, chartType: 'bar' };
//   };

//   const prepareChartData = (results: any[], chartType: 'bar' | 'line' | 'pie'): any => {
//     if (!results || results.length === 0) {
//       console.log('No results to chart');
//       return null;
//     }
    
//     const keys = Object.keys(results[0]);
//     console.log('Available columns:', keys);
//     console.log('First row sample:', results[0]);
    
//     const numericCols = keys.filter(key => {
//       const val = results[0][key];
//       return typeof val === 'number' || (typeof val === 'string' && !isNaN(Number(val)));
//     });
//     const textCols = keys.filter(key => typeof results[0][key] === 'string' && isNaN(Number(results[0][key])));
    
//     console.log('Numeric columns:', numericCols);
//     console.log('Text columns:', textCols);
    
//     if (numericCols.length === 0) {
//       console.log('No numeric columns found');
//       return null;
//     }
    
//     const labelKey = textCols[0] || keys[0];
//     const valueKey = numericCols[0];
    
//     console.log('Using labelKey:', labelKey, 'valueKey:', valueKey);
    
//     const chartData = {
//       data: results.slice(0, 20).map(row => ({
//         name: String(row[labelKey]).substring(0, 30),
//         value: Number(row[valueKey]),
//         fullData: row
//       })),
//       labelKey,
//       valueKey
//     };
    
//     console.log('Chart data prepared:', chartData);
//     return chartData;
//   };

//   const sendQuery = async (): Promise<void> => {
//     if (!input.trim() || isLoading) return;

//     const userMessage: Message = {
//       type: 'user',
//       content: input,
//       timestamp: new Date()
//     };

//     setMessages(prev => [...prev, userMessage]);
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

//       const { shouldChart, chartType } = detectChartRequest(currentQuery);
//       let chartData = null;

//       if (shouldChart && data.success && data.results && data.results.length > 0) {
//         chartData = prepareChartData(data.results, chartType);
//       }

//       const botMessage: Message = {
//         type: 'bot',
//         content: data.success ? data.answer : `Error: ${data.error || 'Something went wrong'}`,
//         timestamp: new Date(),
//         error: !data.success,
//         sql: data.sql,
//         query: data.query || currentQuery,
//         hasExport: data.hasExport && data.success,
//         chartData: chartData,
//         chartType: chartData ? chartType : undefined
//       };

//       setMessages(prev => [...prev, botMessage]);
//     } catch (error) {
//       console.error('Error:', error);
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
//       a.download = `query_results_${Date.now()}.xlsx`;
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

//   const CustomTooltip = ({ active, payload }: any) => {
//     if (active && payload && payload.length) {
//       return (
//         <div style={{ 
//           background: 'white', 
//           border: '1px solid #e5e7eb', 
//           borderRadius: '8px', 
//           padding: '12px',
//           boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
//         }}>
//           <p style={{ margin: '0 0 6px', fontWeight: '600', color: '#1f2937' }}>
//             {payload[0].payload.name}
//           </p>
//           <p style={{ margin: 0, color: '#3b82f6', fontSize: '14px' }}>
//             Value: <strong>{payload[0].value.toLocaleString()}</strong>
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   const renderChart = (message: Message) => {
//     if (!message.chartData || !message.chartType) return null;

//     const { data } = message.chartData;

//     return (
//       <div style={{ 
//         width: '100%', 
//         height: '320px', 
//         marginTop: '16px', 
//         background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
//         borderRadius: '12px', 
//         padding: '20px',
//         border: '1px solid #e2e8f0'
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
//           {message.chartType === 'bar' && <BarChart3 size={18} color="#667eea" />}
//           {message.chartType === 'line' && <TrendingUp size={18} color="#667eea" />}
//           {message.chartType === 'pie' && <Database size={18} color="#667eea" />}
//           <span style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>
//             {message.chartType.charAt(0).toUpperCase() + message.chartType.slice(1)} Chart Visualization
//           </span>
//         </div>
        
//         <div style={{ width: '100%', height: 'calc(100% - 30px)' }}>
//           {message.chartType === 'bar' && (
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
//                 <XAxis 
//                   dataKey="name" 
//                   angle={-45} 
//                   textAnchor="end" 
//                   height={80}
//                   tick={{ fontSize: 11, fill: '#64748b' }}
//                 />
//                 <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Bar dataKey="value" fill="#667eea" radius={[8, 8, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           )}
//           {message.chartType === 'line' && (
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
//                 <XAxis 
//                   dataKey="name" 
//                   angle={-45} 
//                   textAnchor="end" 
//                   height={80}
//                   tick={{ fontSize: 11, fill: '#64748b' }}
//                 />
//                 <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Line 
//                   type="monotone" 
//                   dataKey="value" 
//                   stroke="#667eea" 
//                   strokeWidth={3}
//                   dot={{ fill: '#667eea', r: 4 }}
//                   activeDot={{ r: 6 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           )}
//           {message.chartType === 'pie' && (
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={data}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={true}
//                   label={(entry: any) => entry.name}
//                   outerRadius={90}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {data.map((entry: any, index: number) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip content={<CustomTooltip />} />
//                 <Legend 
//                   verticalAlign="bottom" 
//                   height={36}
//                   formatter={(value: string, entry: any) => `${value}: ${entry.payload.value.toLocaleString()}`}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendQuery();
//     }
//   };

//   const exampleQueries: string[] = [
//     "Show me a bar chart of total views by creator",
//     "Create a pie chart of posts by brand",
//     "Show me a line graph of engagement over time",
//     "What are the top 5 most liked posts?"
//   ];

//   const handleExampleClick = (query: string): void => {
//     setInput(query);
//   };

//   return (
//     <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
//       <div style={{ maxWidth: '900px', margin: '0 auto', height: 'calc(100vh - 40px)', display: 'flex', flexDirection: 'column', background: 'white', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', overflow: 'hidden' }}>
        
//         {/* Header */}
//         <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px', color: 'white' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//             <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               <Database size={28} />
//             </div>
//             <div>
//               <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Instagram Database Assistant</h1>
//               <p style={{ margin: '4px 0 0', fontSize: '14px', opacity: 0.9 }}>Ask questions in natural language or request charts</p>
//             </div>
//           </div>
//         </div>

//         {/* Messages */}
//         <div style={{ flex: 1, overflowY: 'auto', padding: '20px', background: '#f9fafb' }}>
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               style={{ display: 'flex', justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start', marginBottom: '16px' }}
//             >
//               <div style={{ 
//                 maxWidth: '75%', 
//                 background: message.type === 'user' ? '#667eea' : (message.error ? '#fee2e2' : 'white'),
//                 color: message.type === 'user' ? 'white' : (message.error ? '#991b1b' : '#1f2937'),
//                 padding: '12px 16px',
//                 borderRadius: '12px',
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//               }}>
//                 <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>{message.content}</p>
                
//                 {renderChart(message)}

//                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px', gap: '12px' }}>
//                   <p style={{ margin: 0, fontSize: '11px', opacity: 0.7 }}>
//                     {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                   </p>
//                   {message.hasExport && message.type === 'bot' && !message.error && (
//                     <button
//                       onClick={() => exportToExcel(message, index)}
//                       disabled={exportingIndex === index}
//                       style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '6px',
//                         padding: '6px 12px',
//                         background: '#667eea',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: '6px',
//                         cursor: exportingIndex === index ? 'not-allowed' : 'pointer',
//                         fontSize: '12px',
//                         opacity: exportingIndex === index ? 0.6 : 1,
//                         transition: 'all 0.2s'
//                       }}
//                       onMouseEnter={(e) => {
//                         if (exportingIndex !== index) {
//                           e.currentTarget.style.background = '#5568d3';
//                         }
//                       }}
//                       onMouseLeave={(e) => {
//                         if (exportingIndex !== index) {
//                           e.currentTarget.style.background = '#667eea';
//                         }
//                       }}
//                     >
//                       {exportingIndex === index ? (
//                         <>
//                           <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
//                           <span>Exporting...</span>
//                         </>
//                       ) : (
//                         <>
//                           <Download size={14} />
//                           <span>Export Excel</span>
//                         </>
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}

//           {isLoading && (
//             <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
//               <div style={{ background: 'white', padding: '12px 16px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                 <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
//                 <p style={{ margin: 0 }}>Processing query...</p>
//               </div>
//             </div>
//           )}

//           <div ref={messagesEndRef} />
//         </div>

//         {/* Examples */}
//         {messages.length === 1 && (
//           <div style={{ padding: '0 20px 20px', background: '#f9fafb' }}>
//             <p style={{ margin: '0 0 12px', fontWeight: '600', color: '#4b5563', fontSize: '14px' }}>Try these examples:</p>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
//               {exampleQueries.map((query, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleExampleClick(query)}
//                   style={{
//                     padding: '10px 14px',
//                     background: 'white',
//                     border: '1px solid #e5e7eb',
//                     borderRadius: '8px',
//                     cursor: 'pointer',
//                     textAlign: 'left',
//                     fontSize: '13px',
//                     transition: 'all 0.2s',
//                     color: '#4b5563'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = '#f3f4f6';
//                     e.currentTarget.style.borderColor = '#667eea';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = 'white';
//                     e.currentTarget.style.borderColor = '#e5e7eb';
//                   }}
//                 >
//                   {query}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Input */}
//         <div style={{ padding: '16px 20px', background: 'white', borderTop: '1px solid #e5e7eb' }}>
//           <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Ask a question or request a chart..."
//               disabled={isLoading}
//               style={{
//                 flex: 1,
//                 padding: '12px 16px',
//                 border: '2px solid #e5e7eb',
//                 borderRadius: '10px',
//                 fontSize: '14px',
//                 outline: 'none',
//                 transition: 'border-color 0.2s'
//               }}
//               onFocus={(e) => e.target.style.borderColor = '#667eea'}
//               onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
//             />
//             <button
//               onClick={sendQuery}
//               disabled={!input.trim() || isLoading}
//               style={{
//                 padding: '12px 16px',
//                 background: input.trim() && !isLoading ? '#667eea' : '#d1d5db',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '10px',
//                 cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 transition: 'all 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 if (input.trim() && !isLoading) {
//                   e.currentTarget.style.background = '#5568d3';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (input.trim() && !isLoading) {
//                   e.currentTarget.style.background = '#667eea';
//                 }
//               }}
//             >
//               {isLoading ? (
//                 <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
//               ) : (
//                 <Send size={20} />
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
import { Send, Database, Loader2, Download, Sparkles, Brain } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  error?: boolean;
  sql?: string;
  query?: string;
  hasExport?: boolean;
  chartData?: any;
  chartType?: 'bar' | 'line' | 'pie';
  isThinking?: boolean;
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
  visualization?: {
    enabled: boolean;
    chartType?: 'bar' | 'line' | 'pie';
    xAxis?: string;
    yAxis?: string;
    reasoning?: string;
  };
}

const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#fee140', '#30cfd0'];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: "Hi! I'm your AI database assistant 🤖 Ask me anything about your Instagram data, and I'll automatically decide if a visualization would help make the insights clearer!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [exportingIndex, setExportingIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const BACKEND_URL = 'https://sherlockbe2-0.onrender.com'; 

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const prepareChartData = (results: any[], xAxis: string, yAxis: string): any => {
    if (!results || results.length === 0) {
      return null;
    }
    
    const columns = Object.keys(results[0]);
    const xCol = columns.find(col => col.toLowerCase() === xAxis.toLowerCase()) || xAxis;
    const yCol = columns.find(col => col.toLowerCase() === yAxis.toLowerCase()) || yAxis;
    
    console.log('Chart columns:', { xCol, yCol, available: columns });
    
    if (!results[0][xCol] && !results[0][yCol]) {
      console.log('Columns not found in data');
      return null;
    }
    
    const chartData = {
      data: results.slice(0, 20).map(row => ({
        name: String(row[xCol] || row[Object.keys(row)[0]]).substring(0, 30),
        value: Number(row[yCol] || row[Object.keys(row)[1]] || 0),
        fullData: row
      })),
      labelKey: xCol,
      valueKey: yCol
    };
    
    return chartData;
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
      content: 'Analyzing your question...',
      timestamp: new Date(),
      isThinking: true
    };
    setMessages(prev => [...prev, thinkingMessage]);
    
    const currentQuery = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/analytics/nl-query`, {
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

      let chartData = null;
      let chartType: 'bar' | 'line' | 'pie' | undefined = undefined;

      if (data.visualization?.enabled && data.results && data.results.length > 0) {
        chartType = data.visualization.chartType;
        chartData = prepareChartData(
          data.results, 
          data.visualization.xAxis || Object.keys(data.results[0])[0],
          data.visualization.yAxis || Object.keys(data.results[0])[1]
        );
        console.log('AI decided to show chart:', data.visualization.reasoning);
      }

      const botMessage: Message = {
        type: 'bot',
        content: data.success ? data.answer : `Error: ${data.error || 'Something went wrong'}`,
        timestamp: new Date(),
        error: !data.success,
        sql: data.sql,
        query: data.query || currentQuery,
        hasExport: data.hasExport && data.success,
        chartData: chartData,
        chartType: chartType
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
      const response = await fetch(`${BACKEND_URL}/api/analytics/export-excel`, {
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
      a.download = `query_results_${Date.now()}.xlsx`;
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

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ 
          background: 'white', 
          border: '2px solid #667eea', 
          borderRadius: '12px', 
          padding: '12px',
          boxShadow: '0 8px 24px rgba(102, 126, 234, 0.2)'
        }}>
          <p style={{ margin: '0 0 6px', fontWeight: '600', color: '#1f2937', fontSize: '13px' }}>
            {payload[0].payload.name}
          </p>
          <p style={{ margin: 0, color: '#667eea', fontSize: '14px', fontWeight: '600' }}>
            {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = (message: Message) => {
    if (!message.chartData || !message.chartType) return null;

    const { data } = message.chartData;

    return (
      <div style={{ 
        width: '100%', 
        marginTop: '16px', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
        borderRadius: '16px', 
        padding: '20px',
        border: '2px solid #e2e8f0',
        position: 'relative'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          marginBottom: '12px',
          padding: '8px 12px',
          background: 'white',
          borderRadius: '8px',
          width: 'fit-content'
        }}>
          <Sparkles size={16} color="#667eea" />
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#667eea' }}>
            AI-Generated Visualization
          </span>
        </div>
        
        <div style={{ width: '100%', height: '320px' }}>
          {message.chartType === 'bar' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#667eea" stopOpacity={1} />
                    <stop offset="100%" stopColor="#764ba2" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={80}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
          {message.chartType === 'line' && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={80}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="url(#lineGradient)" 
                  strokeWidth={3}
                  dot={{ fill: '#667eea', r: 5 }}
                  activeDot={{ r: 7, fill: '#764ba2' }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
          {message.chartType === 'pie' && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={(entry: any) => `${entry.name}: ${entry.value.toLocaleString()}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendQuery();
    }
  };

  const exampleQueries: string[] = [
    "Who are the top 5 creators by views?",
    "whats the highest watched post",
    "Show me posts with highest views and by which creator",
    "What's the distribution of posts by brand?"
  ];

  const handleExampleClick = (query: string): void => {
    setInput(query);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', height: 'calc(100vh - 40px)', display: 'flex', flexDirection: 'column', background: 'white', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', overflow: 'hidden' }}>
        
        <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '24px', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '16px', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
              <Brain size={32} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 'bold' }}>AI Database Assistant</h1>
              <p style={{ margin: '4px 0 0', fontSize: '14px', opacity: 0.95 }}>I'll automatically visualize data when it helps! ✨</p>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', background: '#f9fafb' }}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{ display: 'flex', justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start', marginBottom: '20px' }}
            >
              <div style={{ 
                maxWidth: '80%', 
                background: message.type === 'user' 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                  : (message.error ? '#fee2e2' : 'white'),
                color: message.type === 'user' ? 'white' : (message.error ? '#991b1b' : '#1f2937'),
                padding: '14px 18px',
                borderRadius: '16px',
                boxShadow: message.type === 'user' 
                  ? '0 4px 12px rgba(102, 126, 234, 0.4)' 
                  : '0 2px 8px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                {message.isThinking && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                    <span>{message.content}</span>
                  </div>
                )}
                
                {!message.isThinking && (
                  <>
                    <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '15px' }}>
                      {message.content}
                    </p>
                    
                    {renderChart(message)}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', gap: '12px', flexWrap: 'wrap' }}>
                      <p style={{ margin: 0, fontSize: '11px', opacity: 0.7 }}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      {message.hasExport && message.type === 'bot' && !message.error && (
                        <button
                          onClick={() => exportToExcel(message, index)}
                          disabled={exportingIndex === index}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 14px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: exportingIndex === index ? 'not-allowed' : 'pointer',
                            fontSize: '12px',
                            fontWeight: '600',
                            opacity: exportingIndex === index ? 0.6 : 1,
                            transition: 'all 0.3s',
                            boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                          }}
                          onMouseEnter={(e) => {
                            if (exportingIndex !== index) {
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (exportingIndex !== index) {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)';
                            }
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
            </div>
          ))}

          {isLoading && !messages.some(m => m.isThinking) && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
              <div style={{ 
                background: 'white', 
                padding: '14px 18px', 
                borderRadius: '16px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px' 
              }}>
                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite', color: '#667eea' }} />
                <p style={{ margin: 0, color: '#4b5563' }}>Thinking...</p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div style={{ padding: '0 24px 24px', background: '#f9fafb' }}>
            <p style={{ margin: '0 0 14px', fontWeight: '600', color: '#4b5563', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} color="#667eea" />
              Try asking me:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
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
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)';
                    e.currentTarget.style.borderColor = '#667eea';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ padding: '20px 24px', background: 'white', borderTop: '2px solid #e5e7eb' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your data..."
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
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.background = 'white';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.background = '#f9fafb';
              }}
            />
            <button
              onClick={sendQuery}
              disabled={!input.trim() || isLoading}
              style={{
                padding: '14px 18px',
                background: input.trim() && !isLoading 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                  : '#d1d5db',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                boxShadow: input.trim() && !isLoading ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (input.trim() && !isLoading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (input.trim() && !isLoading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                }
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