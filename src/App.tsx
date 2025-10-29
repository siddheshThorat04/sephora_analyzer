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
//     "Check stock for 2805869 products in zipcode 90210",
//     "Show me all Range Beauty items products",
//     "Show me all out of stock stores in zipcode 90210",
//     "List all inventory in my area 90087"
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


import React, { useState, useRef, useEffect } from 'react';
import { Send, Package, Loader2, Download, Sparkles, MapPin, Store } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp?: Date;
  error?: boolean;
  sql?: string;
  query?: string;
  hasExport?: boolean;
  chartData?: any;
  chartType?: 'bar' | 'line' | 'pie' | 'multi-line';
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
    chartType?: 'bar' | 'line' | 'pie' | 'multi-line';
    xAxis?: string;
    yAxis?: string;
    groupBy?: string;
    reasoning?: string;
  };
}

const COLORS = ['#000000', '#2a2a2a', '#4a4a4a', '#6a6a6a', '#f5b216', '#ff6b6b', '#4ecdc4', '#45b7d1'];

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

  const BACKEND_URL = 'http://localhost:8000';
  // const BACKEND_URL = 'https://sephora-backend-n1qr.onrender.com';

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ✅ Chart Data Preparation Function
  const prepareChartData = (results: any[], visualization: any): any => {
    if (!results || results.length === 0) {
      return null;
    }

    const { xAxis, yAxis, chartType } = visualization;
    let { groupBy } = visualization;

    // Auto-detect groupBy if missing for multi-line charts
    if (chartType === 'multi-line' && !groupBy) {
      const columns = Object.keys(results[0]);
      const idColumn = columns.find(col =>
        col.toLowerCase().includes('_id') ||
        col.toLowerCase() === 'id' ||
        col.toLowerCase().includes('product') && col.toLowerCase().includes('id')
      );

      if (idColumn) {
        groupBy = idColumn;
        console.log('✅ Auto-detected groupBy column:', groupBy);
      }
    }

    console.log('🔍 prepareChartData called with:', {
      resultsLength: results?.length,
      chartType,
      xAxis,
      yAxis,
      groupBy,
      availableColumns: Object.keys(results[0])
    });

    // Handle multi-line charts (trend data)
    if (chartType === 'multi-line' && groupBy) {
      console.log('✅ ENTERING MULTI-LINE PATH');

      const groupedData: Record<string, any> = {};
      const uniqueGroups = new Set<string>();

      results.forEach((row) => {
        const xValue = row[xAxis];
        const yValue = row[yAxis];
        const groupValue = row[groupBy];

        uniqueGroups.add(groupValue);

        if (!groupedData[xValue]) {
          groupedData[xValue] = { [xAxis]: xValue };
        }

        groupedData[xValue][groupValue] = yValue;
      });

      // Sort by time or natural order
      const chartData = Object.values(groupedData).sort((a, b) => {
        const aDate = new Date(a[xAxis]);
        const bDate = new Date(b[xAxis]);
        if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
          return aDate.getTime() - bDate.getTime();
        }
        return String(a[xAxis]).localeCompare(String(b[xAxis]));
      });

      console.log('✅ Multi-line chart prepared:', {
        dataPoints: chartData.length,
        groups: Array.from(uniqueGroups),
        sampleData: chartData[0]
      });

      return {
        data: chartData,
        labelKey: xAxis,
        valueKey: yAxis,
        groups: Array.from(uniqueGroups),
        groupBy: groupBy
      };
    }

    // Handle regular charts
    const columns = Object.keys(results[0]);
    const xCol = columns.find(col => col.toLowerCase() === xAxis.toLowerCase()) || xAxis;
    const yCol = columns.find(col => col.toLowerCase() === yAxis.toLowerCase()) || yAxis;

    console.log('📊 Regular chart - columns:', { xCol, yCol, available: columns });

    if (!results[0][xCol] && !results[0][yCol]) {
      console.log('❌ Columns not found in data');
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

  // ✅ Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const date = parseCustomDate(label);
      const formattedLabel = date 
        ? date.toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        : label;
      
      return (
        <div style={{ 
          background: 'white', 
          border: '2px solid #000000', 
          borderRadius: '12px', 
          padding: '12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
        }}>
          <p style={{ margin: '0 0 8px', fontWeight: '600', color: '#1f2937', fontSize: '12px' }}>
            {formattedLabel}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ margin: '4px 0', color: entry.color, fontSize: '13px', fontWeight: '600' }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // ✅ Date Parser
  const parseCustomDate = (dateString: string): Date | null => {
    try {
      const cleanedDate = dateString.replace(/(\d+)(st|nd|rd|th)/, '$1');
      const date = new Date(cleanedDate);
      return isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  };

  // ✅ Chart Renderer
  const renderChart = (message: Message) => {
    console.log('🎯 renderChart called with message:', {
      hasChartData: !!message.chartData,
      chartType: message.chartType,
      chartDataStructure: message.chartData ? {
        keys: Object.keys(message.chartData),
        data: message.chartData.data?.length,
        groups: message.chartData.groups,
        groupBy: message.chartData.groupBy,
        labelKey: message.chartData.labelKey,
        valueKey: message.chartData.valueKey
      } : null
    });

    if (!message.chartData || !message.chartType) {
      console.log('❌ No chart data or type, returning null');
      return null;
    }

    const { data, groups } = message.chartData;

    console.log('🎨 Rendering chart:', {
      chartType: message.chartType,
      hasData: !!data,
      hasGroups: !!groups,
      groupsLength: groups?.length,
      dataLength: data?.length,
      sampleData: data?.slice(0, 2),
      allGroups: groups
    });

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
          <Sparkles size={16} color="#000000" />
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#000000' }}>
            AI-Generated {message.chartType === 'multi-line' ? 'Trend ' : ''}Visualization
          </span>
        </div>

        <div style={{ width: '100%', height: '400px' }}>
          {/* Multi-Line Chart */}
          {message.chartType === 'multi-line' && groups && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey={message.chartData.labelKey}
                  tickFormatter={(value) => {
                    const date = parseCustomDate(value);
                    if (date) {
                      return date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      });
                    }
                    return String(value).substring(0, 10);
                  }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickFormatter={(value) => {
                    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
                    return value.toString();
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  formatter={(value) => `${value.substring(0, 15)}...`}
                />
                {groups.map((group: string, index: number) => (
                  <Line
                    key={group}
                    type="monotone"
                    dataKey={group}
                    stroke={COLORS[index % COLORS.length]}
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name={group}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          )}

          {/* Bar Chart */}
          {message.chartType === 'bar' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#000000" stopOpacity={1} />
                    <stop offset="100%" stopColor="#f5b216" stopOpacity={0.8} />
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

          {/* Single Line Chart */}
          {message.chartType === 'line' && !groups && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#000000" />
                    <stop offset="100%" stopColor="#f5b216" />
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
                  dot={{ fill: '#000000', r: 5 }}
                  activeDot={{ r: 7, fill: '#f5b216' }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}

          {/* Pie Chart */}
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
                  fill="#000000"
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

      // ✅ Prepare chart data if visualization is enabled
      let chartData = null;
      let chartType: 'bar' | 'line' | 'pie' | 'multi-line' | undefined = undefined;

      if (data.visualization?.enabled && data.results && data.results.length > 0) {
        chartType = data.visualization.chartType;
        chartData = prepareChartData(data.results, data.visualization);
        console.log('AI decided to show chart:', data.visualization.reasoning);
        console.log('Chart type:', chartType);
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

      console.log('💾 Storing message with chart data:', {
        chartType,
        chartData
      });

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
    "Check stock for 2805869 products in zipcode 90210",
    "Show me all Range Beauty items products",
    "Show me all out of stock stores in zipcode 90210",
    "List all inventory in my area 90087"
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
        maxWidth: '900px', 
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
          background: 'linear-gradient(135deg, #f5b216ff 0%, #f5b216ff 100%)', 
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
              <Package size={40} color="white" />
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ 
                margin: 0, 
                fontSize: '26px', 
                fontWeight: 'bold',
                letterSpacing: '-0.5px',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}>
                Sephora Stock Checker
              </h1>
              <p style={{ 
                margin: '4px 0 0', 
                fontSize: '14px', 
                opacity: 0.9,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
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
              backdropFilter: 'blur(10px)'
            }}>
              <img src="https://acumensa.co/SherlockBrandLogo_113x39.png" height='39px' width="112px" alt="" />
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
                display: 'flex', 
                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start', 
                marginBottom: '20px' 
              }}
            >
              <div style={{
                maxWidth: '80%',
                background: message.type === 'user'
                  ? 'linear-gradient(135deg, #000000 0%, #2a2a2a 100%)'
                  : (message.error ? '#fee2e2' : 'white'),
                color: message.type === 'user' ? 'white' : (message.error ? '#991b1b' : '#1f2937'),
                padding: '14px 18px',
                borderRadius: '16px',
                boxShadow: message.type === 'user'
                  ? '0 4px 12px rgba(0, 0, 0, 0.3)'
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
                    <p style={{ 
                      margin: 0, 
                      whiteSpace: 'pre-wrap', 
                      lineHeight: '1.6', 
                      fontSize: '15px' 
                    }}>
                      {message.content}
                    </p>

                    {/* ✅ Render Chart */}
                    {renderChart(message)}

                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      marginTop: '12px', 
                      gap: '12px', 
                      flexWrap: 'wrap' 
                    }}>
                      <p style={{ margin: 0, fontSize: '11px', opacity: 0.7 }}>
                        {message.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                            background: 'linear-gradient(135deg, #000000 0%, #2a2a2a 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: exportingIndex === index ? 'not-allowed' : 'pointer',
                            fontSize: '12px',
                            fontWeight: '600',
                            opacity: exportingIndex === index ? 0.6 : 1,
                            transition: 'all 0.3s',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                          }}
                          onMouseEnter={(e) => {
                            if (exportingIndex !== index) {
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (exportingIndex !== index) {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
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
                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite', color: '#000000' }} />
                <p style={{ margin: 0, color: '#4b5563' }}>Checking inventory...</p>
              </div>
            </div>
          )}

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
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
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
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)';
                    e.currentTarget.style.borderColor = '#000000';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <MapPin size={14} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>{query}</span>
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
              onFocus={(e) => {
                e.target.style.borderColor = '#000000';
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
                  ? 'linear-gradient(135deg, #000000 0%, #2a2a2a 100%)'
                  : '#d1d5db',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                boxShadow: input.trim() && !isLoading ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (input.trim() && !isLoading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (input.trim() && !isLoading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
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