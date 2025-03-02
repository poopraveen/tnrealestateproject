import TaskList from './TaskList';

const App: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
      <TaskList />
    </div>
  );
};

export default App;
