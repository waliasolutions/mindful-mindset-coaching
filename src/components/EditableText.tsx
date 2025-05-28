
import { useState, useRef, useEffect } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { Button } from '@/components/ui/button';
import { Save, X, Edit } from 'lucide-react';

interface EditableTextProps {
  pageId: string;
  contentKey: string;
  defaultContent: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  placeholder?: string;
}

const EditableText = ({ 
  pageId, 
  contentKey, 
  defaultContent, 
  className = '', 
  tag = 'p',
  placeholder = 'Click to edit...'
}: EditableTextProps) => {
  const { isEditMode, isAdmin, saveContent, getContent } = useEditMode();
  const [content, setContent] = useState(defaultContent);
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState(content);
  const editRef = useRef<HTMLDivElement>(null);

  // Load content from database on mount
  useEffect(() => {
    const loadContent = async () => {
      const savedContent = await getContent(pageId, contentKey);
      if (savedContent?.text) {
        setContent(savedContent.text);
        setTempContent(savedContent.text);
      }
    };
    loadContent();
  }, [pageId, contentKey, getContent]);

  const handleEdit = () => {
    if (!isEditMode || !isAdmin) return;
    setIsEditing(true);
    setTempContent(content);
    
    // Focus the editable div after state update
    setTimeout(() => {
      if (editRef.current) {
        editRef.current.focus();
        // Select all text
        const range = document.createRange();
        range.selectNodeContents(editRef.current);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }, 0);
  };

  const handleSave = async () => {
    await saveContent(pageId, contentKey, { text: tempContent }, 'text');
    setContent(tempContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempContent(content);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const Tag = tag as keyof JSX.IntrinsicElements;

  if (!isEditMode || !isAdmin) {
    return <Tag className={className}>{content || defaultContent}</Tag>;
  }

  if (isEditing) {
    return (
      <div className="relative group">
        <div
          ref={editRef}
          contentEditable
          suppressContentEditableWarning
          className={`${className} outline-none border-2 border-blue-500 rounded p-2 bg-blue-50`}
          onBlur={(e) => setTempContent(e.currentTarget.textContent || '')}
          onKeyDown={handleKeyDown}
          dangerouslySetInnerHTML={{ __html: tempContent }}
        />
        <div className="absolute top-0 right-0 transform translate-x-full flex gap-1 ml-2">
          <Button
            size="sm"
            variant="default"
            onClick={handleSave}
            className="h-6 w-6 p-0"
          >
            <Save className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
            className="h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative group cursor-pointer"
      onClick={handleEdit}
    >
      <Tag className={`${className} border-2 border-dashed border-transparent hover:border-blue-300 hover:bg-blue-50 transition-all duration-200`}>
        {content || defaultContent || placeholder}
      </Tag>
      <div className="absolute top-0 right-0 transform translate-x-full opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="sm"
          variant="ghost"
          className="h-6 w-6 p-0 text-blue-600"
        >
          <Edit className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default EditableText;
