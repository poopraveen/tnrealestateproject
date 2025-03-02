'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

type Task = {
    id: string;
    title: string;
    type: string;
    project: string;
    assignedTo: string;
    priority: string;
    dueDate: string;
    status: string;
};

const taskListData: Task[] = [
    {
        id: '1',
        title: 'Site Visit at Project A',
        type: 'Site Visit',
        project: 'Project A',
        assignedTo: 'John Doe',
        priority: 'High',
        dueDate: '2025-03-10',
        status: 'Pending',
    },
    {
        id: '2',
        title: 'Follow-up with Client X',
        type: 'Follow-up',
        project: 'Project B',
        assignedTo: 'Jane Smith',
        priority: 'Medium',
        dueDate: '2025-03-12',
        status: 'In Progress',
    },
    {
        id: '3',
        title: 'Site Visit at Project C',
        type: 'Site Visit',
        project: 'Project C',
        assignedTo: 'Mark Johnson',
        priority: 'High',
        dueDate: '2025-03-15',
        status: 'Pending',
    },
];

const TaskListPage: React.FC = () => {
    const { t } = useTranslation();
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [containerWidth, setContainerWidth] = useState('300px'); // Initial width for the modal
    const [isOpen, setIsOpen] = useState(false); // Track if the modal is open
    const containerRef = useRef<HTMLDivElement>(null); // Reference to the modal container

    // Close modal if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setSelectedTask(null);
            setContainerWidth('300px'); // Reset width when modal is closed
        }
    };

    // Event listener to close modal on outside click
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Toggle modal and width
    const handleViewMore = (task: Task) => {
        setSelectedTask(task);
        setIsOpen(true);
        setContainerWidth('600px'); // Increase width when modal opens
    };

    // Handle close modal
    const handleCloseModal = () => {
        setSelectedTask(null);
        setContainerWidth('300px'); // Reset to original width
        setIsOpen(false);
    };

    return (
        <div className="space-y-6 p-6">
            <h2 className="text-2xl font-bold">{t('taskList')}</h2>

            {/* Task List */}
            {taskListData.map((task) => (
                <div
                    key={task.id}
                    className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 ${task.priority === 'High' ? 'blinking' : ''
                        }`} // Apply blinking class for high priority tasks
                >
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">{task.title}</h3>
                        <span className="text-sm text-gray-500">{task.dueDate}</span>
                    </div>
                    <div className="mt-2">
                        <p><strong>{t('assignedTo')}:</strong> {task.assignedTo}</p>
                        <p><strong>{t('priority')}:</strong> {task.priority}</p>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm">{t('status')}: {task.status}</span>
                        <button
                            onClick={() => handleViewMore(task)}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            {t('viewMore')}
                        </button>
                    </div>
                </div>
            ))}

            {/* Task Detail Modal */}
            {selectedTask && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div
                        ref={containerRef}
                        className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out"
                        style={{ width: containerWidth }}
                    >
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-xl text-gray-700 dark:text-white"
                        >
                            &times;
                        </button>
                        <h3 className="text-2xl font-semibold">{selectedTask.title}</h3>
                        <div className="mt-4">
                            <p><strong>{t('taskType')}:</strong> {selectedTask.type}</p>
                            <p><strong>{t('project')}:</strong> {selectedTask.project}</p>
                            <p><strong>{t('assignedTo')}:</strong> {selectedTask.assignedTo}</p>
                            <p><strong>{t('priority')}:</strong> {selectedTask.priority}</p>
                            <p><strong>{t('dueDate')}:</strong> {selectedTask.dueDate}</p>
                            <p><strong>{t('status')}:</strong> {selectedTask.status}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Task Button */}
            <div className="flex justify-center mt-8">
                <Link href={`/task/tyqwtqywty`} className="flex items-center gap-3">
                    <button
                        onClick={() => console.log('Create new task')}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
                    >
                        {t('createTask')}
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default TaskListPage;
