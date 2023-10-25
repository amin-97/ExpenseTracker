import './Dashboard.css';
import React, { useState, useRef } from 'react';
import Notification from '../notification/Notification';

function Dashboard() {
    const [balance, setBalance] = useState(1000);
    const [transactions, setTransactions] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const dataInputRef = useRef(null);

    const handleAddTransaction = (type) => {
        if (!description || isNaN(amount) || !amount) return;
        const transactionAmount = parseFloat(amount);
        setTransactions(prev => [...prev, { type, description, amount: transactionAmount }]);
        
        const updatedBalance = type === 'income' ? balance + transactionAmount : balance - transactionAmount;
        setBalance(updatedBalance);
        setDescription('');
        setAmount('');

        if (updatedBalance < 100) {
            setNotifications(prev => [...prev, "Your balance is getting low!"]);
        }

        if (type === 'expense' && transactionAmount > 500) {
            setNotifications(prev => [...prev, "A large transaction was recorded."]);
        }
    };

    const getWeeklySummary = () => {
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const weeklyTransactions = transactions.filter(transaction => new Date(transaction.date) > oneWeekAgo);

        let income = 0;
        let expense = 0;
        weeklyTransactions.forEach(transaction => {
            if (transaction.type === 'income') income += transaction.amount;
            else expense += transaction.amount;
        });

        setNotifications(prev => [...prev, `Weekly Summary: Income - $${income.toFixed(2)}, Expense - $${expense.toFixed(2)}`]);
    }

    const exportData = () => {
        const dataStr = JSON.stringify(transactions);
        const dataBlob = new Blob([dataStr], {type: "application/json"});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.download = 'transactions.json';
        link.href = url;
        link.click();
    }

    const importData = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const jsonObj = JSON.parse(event.target.result);
                setTransactions(jsonObj);
            };
            reader.readAsText(file);
        }
    }

    const filteredTransactions = transactions.filter(transaction => 
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.amount.toString().includes(searchTerm)
    );

    return (
        <div className="dashboard-container">
            {notifications.map((message, index) => (
                <Notification 
                    key={index} 
                    message={message} 
                    onClose={() => {
                        const newNotifications = [...notifications];
                        newNotifications.splice(index, 1);
                        setNotifications(newNotifications);
                    }}
                />
            ))}

            <div className="balance">
                Current Balance: ${balance.toFixed(2)}
            </div>

            <div className="transaction-inputs">
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button onClick={() => handleAddTransaction('income')}>Add Income</button>
                <button onClick={() => handleAddTransaction('expense')}>Add Expense</button>
            </div>

            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search transactions..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
            </div>

            <button onClick={getWeeklySummary}>Get Weekly Summary</button>

            <ul>
                {filteredTransactions.map((transaction, index) => (
                    <li key={index}>
                        {transaction.description} - {transaction.type.toUpperCase()}: ${transaction.amount.toFixed(2)}
                    </li>
                ))}
            </ul>

            <div className="data-controls">
                <button onClick={exportData}>Export Data</button>
                <input type="file" onChange={importData} style={{ display: "none" }} ref={dataInputRef}/>
                <button onClick={() => dataInputRef.current.click()}>Import Data</button>
            </div>
        </div>
    );
}

export default Dashboard;


// // Dashboard.js
// import './Dashboard.css';
// // Dashboard.jsx
// import React, { useState, useRef } from 'react';
// import Notification from '../notification/Notification';

// function Dashboard() {
//     const [balance, setBalance] = useState(1000);
//     const [transactions, setTransactions] = useState([]);
//     const [notifications, setNotifications] = useState([]);
//     const [description, setDescription] = useState('');
//     const [amount, setAmount] = useState('');
//     const dataInputRef = useRef(null);

//     const handleAddTransaction = (type) => {
//         if (!description || isNaN(amount) || !amount) return;
//         const transactionAmount = parseFloat(amount);
//         setTransactions(prev => [...prev, { type, description, amount: transactionAmount }]);
        
//         const updatedBalance = type === 'income' ? balance + transactionAmount : balance - transactionAmount;
//         setBalance(updatedBalance);
//         setDescription('');
//         setAmount('');

//         if (updatedBalance < 100) {
//             setNotifications(prev => [...prev, "Your balance is getting low!"]);
//         }

//         if (type === 'expense' && transactionAmount > 500) {
//             setNotifications(prev => [...prev, "A large transaction was recorded."]);
//         }
//     };

//     const getWeeklySummary = () => {
//         const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
//         const weeklyTransactions = transactions.filter(transaction => new Date(transaction.date) > oneWeekAgo);

//         let income = 0;
//         let expense = 0;
//         weeklyTransactions.forEach(transaction => {
//             if (transaction.type === 'income') income += transaction.amount;
//             else expense += transaction.amount;
//         });

//         setNotifications(prev => [...prev, `Weekly Summary: Income - $${income.toFixed(2)}, Expense - $${expense.toFixed(2)}`]);
//     }

//     const exportData = () => {
//         const dataStr = JSON.stringify(transactions);
//         const dataBlob = new Blob([dataStr], {type: "application/json"});
//         const url = URL.createObjectURL(dataBlob);
//         const link = document.createElement('a');
//         link.download = 'transactions.json';
//         link.href = url;
//         link.click();
//     }

//     const importData = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = function(event) {
//                 const jsonObj = JSON.parse(event.target.result);
//                 setTransactions(jsonObj);
//             };
//             reader.readAsText(file);
//         }
//     }

//     return (
//         <div className="dashboard-container">
//             {notifications.map((message, index) => (
//                 <Notification 
//                     key={index} 
//                     message={message} 
//                     onClose={() => {
//                         const newNotifications = [...notifications];
//                         newNotifications.splice(index, 1);
//                         setNotifications(newNotifications);
//                     }}
//                 />
//             ))}

//             <div className="balance">
//                 Current Balance: ${balance.toFixed(2)}
//             </div>

//             <div className="transaction-inputs">
//                 <input
//                     type="text"
//                     placeholder="Description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                 />
//                 <input
//                     type="number"
//                     placeholder="Amount"
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                 />
//                 <button onClick={() => handleAddTransaction('income')}>Add Income</button>
//                 <button onClick={() => handleAddTransaction('expense')}>Add Expense</button>
//             </div>

//             <button onClick={getWeeklySummary}>Get Weekly Summary</button>

//             <ul>
//                 {transactions.map((transaction, index) => (
//                     <li key={index}>
//                         {transaction.description} - {transaction.type.toUpperCase()}: ${transaction.amount.toFixed(2)}
//                     </li>
//                 ))}
//             </ul>

//             <div className="data-controls">
//                 <button onClick={exportData}>Export Data</button>
//                 <input type="file" onChange={importData} style={{ display: "none" }} ref={dataInputRef}/>
//                 <button onClick={() => dataInputRef.current.click()}>Import Data</button>
//             </div>
//         </div>
//     );
// }

// export default Dashboard;


// // Dashboard.js
// import './Dashboard.css';
// // Dashboard.jsx
// import React, { useState, useRef } from 'react';
// import Notification from '../notification/Notification';
// import { useMediaQuery } from 'react-responsive';

// function Dashboard() {
//     const [balance, setBalance] = useState(1000);
//     const [transactions, setTransactions] = useState([]);
//     const [notifications, setNotifications] = useState([]);
//     const [description, setDescription] = useState('');
//     const [amount, setAmount] = useState('');
//     const dataInputRef = useRef(null);

//     const isDesktopOrLaptop = useMediaQuery({
//         query: '(min-device-width: 1224px)'
//     });
//     const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

//     const handleAddTransaction = (type) => {
//         if (!description || isNaN(amount) || !amount) return;
//         const transactionAmount = parseFloat(amount);
//         setTransactions(prev => [...prev, { type, description, amount: transactionAmount }]);
        
//         const updatedBalance = type === 'income' ? balance + transactionAmount : balance - transactionAmount;
//         setBalance(updatedBalance);
//         setDescription('');
//         setAmount('');

//         if (updatedBalance < 100) {
//             setNotifications(prev => [...prev, "Your balance is getting low!"]);
//         }

//         if (type === 'expense' && transactionAmount > 500) {
//             setNotifications(prev => [...prev, "A large transaction was recorded."]);
//         }
//     };

//     const getWeeklySummary = () => {
//         const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
//         const weeklyTransactions = transactions.filter(transaction => new Date(transaction.date) > oneWeekAgo);

//         let income = 0;
//         let expense = 0;
//         weeklyTransactions.forEach(transaction => {
//             if (transaction.type === 'income') income += transaction.amount;
//             else expense += transaction.amount;
//         });

//         setNotifications(prev => [...prev, `Weekly Summary: Income - $${income.toFixed(2)}, Expense - $${expense.toFixed(2)}`]);
//     }

//     const exportData = () => {
//         const dataStr = JSON.stringify(transactions);
//         const dataBlob = new Blob([dataStr], {type: "application/json"});
//         const url = URL.createObjectURL(dataBlob);
//         const link = document.createElement('a');
//         link.download = 'transactions.json';
//         link.href = url;
//         link.click();
//     }

//     const importData = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = function(event) {
//                 const jsonObj = JSON.parse(event.target.result);
//                 setTransactions(jsonObj);
//             };
//             reader.readAsText(file);
//         }
//     }

//     return (
//         <div className="dashboard-container">
//             {notifications.map((message, index) => (
//                 <Notification 
//                     key={index} 
//                     message={message} 
//                     onClose={() => {
//                         const newNotifications = [...notifications];
//                         newNotifications.splice(index, 1);
//                         setNotifications(newNotifications);
//                     }}
//                 />
//             ))}

//             <div className="balance">
//                 Current Balance: ${balance.toFixed(2)}
//             </div>

//             <div className="transaction-inputs">
//                 <input
//                     type="text"
//                     placeholder="Description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                 />
//                 <input
//                     type="number"
//                     placeholder="Amount"
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                 />
//                 <button onClick={() => handleAddTransaction('income')}>Add Income</button>
//                 <button onClick={() => handleAddTransaction('expense')}>Add Expense</button>
//             </div>

//             <button onClick={getWeeklySummary}>Get Weekly Summary</button>

//             <ul>
//                 {transactions.map((transaction, index) => (
//                     <li key={index}>
//                         {transaction.description} - {transaction.type.toUpperCase()}: ${transaction.amount.toFixed(2)}
//                     </li>
//                 ))}
//             </ul>

//             <div className="data-controls">
//                 <button onClick={exportData}>Export Data</button>
//                 <input type="file" onChange={importData} style={{ display: "none" }} ref={dataInputRef}/>
//                 <button onClick={() => dataInputRef.current.click()}>Import Data</button>
//             </div>
//         </div>
//     );
// }

// export default Dashboard;


// // Dashboard.js
// import './Dashboard.css';
// // Dashboard.jsx
// import React, {useState, useRef} from 'react';
// import Notification from '../notification/Notification';
// import { useMediaQuery } from 'react-responsive';

// function Dashboard() {
//     const [balance, setBalance] = useState(1000); // Initial balance for demonstration
//     const [transactions, setTransactions] = useState([]);
//     const [notifications, setNotifications] = useState([]);
//     const dataInputRef = useRef(null)

//     // Inside your component:
//     const isDesktopOrLaptop = useMediaQuery({
//       query: '(min-device-width: 1224px)'
//     });
//     const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

//     const handleAddTransaction = (type, amount) => {
//         setTransactions(prev => [...prev, { type, amount }]);
        
//         // Update balance based on transaction type
//         const updatedBalance = type === 'income' ? balance + amount : balance - amount;
//         setBalance(updatedBalance);

//         // Notifications
//         if (updatedBalance < 100) {
//             setNotifications(prev => [...prev, "Your balance is getting low!"]);
//         }

//         if (type === 'expense' && amount > 500) {
//             setNotifications(prev => [...prev, "A large transaction was recorded."]);
//         }
//     };

//     const getWeeklySummary = () => {
//         const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
//         const weeklyTransactions = transactions.filter(transaction => new Date(transaction.date) > oneWeekAgo);

//         let income = 0;
//         let expense = 0;
//         weeklyTransactions.forEach(transaction => {
//             if (transaction.type === 'income') income += transaction.amount;
//             else expense += transaction.amount;
//         });

//         setNotifications(prev => [...prev, `Weekly Summary: Income - $${income.toFixed(2)}, Expense - $${expense.toFixed(2)}`]);
//     }

//     const exportData = () => {
//       const dataStr = JSON.stringify(transactions);
//       const dataBlob = new Blob([dataStr], {type: "application/json"});
//       const url = URL.createObjectURL(dataBlob);
//       const link = document.createElement('a');
//       link.download = 'transactions.json';
//       link.href = url;
//       link.click();
//     }

//     const importData = (e) => {
//       const file = e.target.files[0];
//       if (file) {
//           const reader = new FileReader();
//           reader.onload = function(event) {
//               const jsonObj = JSON.parse(event.target.result);
//               setTransactions(jsonObj);
//           };
//           reader.readAsText(file);
//       }
//     }
  
  

//     return (
//         <div className="dashboard-container">
//             {/* Display notifications at the top of the dashboard */}
//             {notifications.map((message, index) => (
//                 <Notification 
//                     key={index} 
//                     message={message} 
//                     onClose={() => {
//                         // Remove the notification when close button is clicked
//                         const newNotifications = [...notifications];
//                         newNotifications.splice(index, 1);
//                         setNotifications(newNotifications);
//                     }}
//                 />
//             ))}

//             {/* Your balance display */}
//             <div className="balance">
//                 Current Balance: ${balance.toFixed(2)}
//             </div>

//             {/* Transaction controls - for demonstration */}
//             <button onClick={() => handleAddTransaction('income', 200)}>Add $200 Income</button>
//             <button onClick={() => handleAddTransaction('expense', 150)}>Deduct $150 Expense</button>

//             {/* Get Weekly Summary */}
//             <button onClick={getWeeklySummary}>Get Weekly Summary</button>

//             {/* List of transactions (simplified) */}
//             <ul>
//                 {transactions.map((transaction, index) => (
//                     <li key={index}>
//                         {transaction.type.toUpperCase()}: ${transaction.amount.toFixed(2)}
//                     </li>
//                 ))}
//             </ul>

//           <div className="data-controls">
//             <button onClick={exportData}>Export Data</button>
//             <input type="file" onChange={importData} style={{ display: "none" }} ref={dataInputRef}/>
//             <button onClick={() => dataInputRef.current.click()}>Import Data</button>
//           </div>
//         </div>
//     );
// }

// export default Dashboard;
