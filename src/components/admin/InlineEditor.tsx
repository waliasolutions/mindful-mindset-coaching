
import { useState, useEffect } from 'react';
import { Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface InlineEditorProps {
  content: string;
  onSave: (content: string) => void;
  isEditMode: boolean;
  className?: string;
  simpleEditor?: boolean;
}

const InlineEditor = ({ 
  content, 
  onSave, 
  isEditMode, 
  className = "",
  simpleEditor = false
}: InlineEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  const handleEdit = () => {
    if (!isEditMode) return;
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(editedContent);
    setIsEditing(false);
    toast.success('Content updated');
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  if (!isEditMode) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  if (isEditing) {
    if (simpleEditor) {
      return (
        <div className="relative">
          <textarea
            className={`${className} w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={3}
          />
          <div className="absolute right-2 bottom-2 flex space-x-1">
            <Button size="icon" variant="ghost" onClick={handleCancel} className="h-7 w-7">
              <X className="h-3.5 w-3.5 text-gray-600" />
            </Button>
            <Button size="icon" variant="ghost" onClick={handleSave} className="h-7 w-7">
              <Save className="h-3.5 w-3.5 text-green-600" />
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="relative">
          <div
            className={`${className} p-2 border border-blue-300 rounded-md focus:outline-none`}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setEditedContent(e.currentTarget.innerHTML)}
            dangerouslySetInnerHTML={{ __html: editedContent }}
          />
          <div className="absolute right-2 top-2 flex space-x-1">
            <Button size="icon" variant="ghost" onClick={handleCancel} className="h-7 w-7 bg-white/80">
              <X className="h-3.5 w-3.5 text-gray-600" />
            </Button>
            <Button size="icon" variant="ghost" onClick={handleSave} className="h-7 w-7 bg-white/80">
              <Save className="h-3.5 w-3.5 text-green-600" />
            </Button>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="group relative">
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <Button
        size="icon"
        variant="ghost"
        onClick={handleEdit}
        className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 h-7 w-7 bg-white/80"
      >
        <Edit className="h-3.5 w-3.5 text-blue-600" />
      </Button>
    </div>
  );
};

export default InlineEditor;
