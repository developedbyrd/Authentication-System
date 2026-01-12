import React from 'react';
import TodoApp from '../components/TodoApp';

const Dashboard = () => {
    const name = localStorage.getItem('fullname');
    const email = localStorage.getItem('email');

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
                <p className="text-gray-600 text-lg">
                    Welcome back, <span className="font-semibold text-blue-600">{name}</span>!
                </p>
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <h3 className="font-semibold text-blue-800 mb-2">User Profile Info</h3>
                    <ul className="space-y-2 text-blue-700">
                        <li><span className="font-bold">Name:</span> {name}</li>
                        <li><span className="font-bold">Email:</span> {email}</li>
                    </ul>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <TodoApp />
            </div>
        </div>
    );
};

export default Dashboard;
