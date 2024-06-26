export interface MilestoneProps {
    title: string;
    description: string;
  }
  
  const Milestone: React.FC<MilestoneProps> = ({ title, description}) => {
    return (
      <div className="flex items-center gap-4">
        <div className="w-4 h-4 rounded-full border-2 border-gray-200 dark:border-gray-800 bg-gray-200 dark:bg-gray-800" />
        <div className="flex flex-col flex-1">
          <h3 className="text-sm font-medium truncate">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{description}</p>
        </div>
      </div>
    );
  };
  
  export default Milestone;
  