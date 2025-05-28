
import { useEditMode } from '@/contexts/EditModeContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Edit, Eye, Save, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const EditModeToolbar = () => {
  const { isEditMode, setIsEditMode, isAdmin } = useEditMode();

  if (!isAdmin) return null;

  return (
    <Card className="fixed top-4 right-4 z-50 p-3 shadow-lg bg-white border-2">
      <div className="flex items-center gap-3">
        <Badge variant={isEditMode ? "default" : "secondary"} className="text-xs">
          {isEditMode ? "Edit Mode" : "View Mode"}
        </Badge>
        
        <Button
          size="sm"
          variant={isEditMode ? "default" : "outline"}
          onClick={() => setIsEditMode(!isEditMode)}
          className="h-8"
        >
          {isEditMode ? (
            <>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => window.location.href = '/dashboard-management-portal-9a7b2c3d'}
          className="h-8"
        >
          <Settings className="h-4 w-4 mr-2" />
          Admin
        </Button>
      </div>
      
      {isEditMode && (
        <div className="mt-2 text-xs text-muted-foreground">
          Click on text or images to edit them directly
        </div>
      )}
    </Card>
  );
};

export default EditModeToolbar;
