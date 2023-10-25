// Reports.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js';

function Reports({ transactions }) {
    Chart.register(ArcElement);
    const incomes = transactions.filter(t => t.type === 'income');
    const expenses = transactions.filter(t => t.type === 'expense');

    const totalIncome = incomes.reduce((acc, item) => acc + item.amount, 0);
    const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0);

    const data = {
        labels: ['Income', 'Expense'],
        datasets: [
            {
                data: [totalIncome, totalExpense],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384']
            }
        ]
    };

    return (
        <div className="reports">
            <h2>Reports & Analysis</h2>
            
            <div className="summary">
                <p><strong>Total Income:</strong> ${totalIncome.toFixed(2)}</p>
                <p><strong>Total Expense:</strong> ${totalExpense.toFixed(2)}</p>
            </div>

            <div className="chart">
                <Pie data={data} />
            </div>

            <div className="transaction-lists">
                <div>
                    <h3>Incomes</h3>
                    <ul>
                        {incomes.map(t => (
                            <li key={t.id}>{t.description}: ${t.amount.toFixed(2)}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>Expenses</h3>
                    <ul>
                        {expenses.map(t => (
                            <li key={t.id}>{t.description}: ${t.amount.toFixed(2)}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Reports;
