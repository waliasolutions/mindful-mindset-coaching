
import { Loader2 } from 'lucide-react';

interface AdminLoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const AdminLoadingSpinner = ({ message = 'Wird geladen...', size = 'md' }: AdminLoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className={`${sizeClasses[size]} animate-spin text-forest`} />
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default AdminLoadingSpinner;
