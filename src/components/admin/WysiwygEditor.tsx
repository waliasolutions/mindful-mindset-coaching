
import React, { useState, useEffect, useRef } from 'react';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, 
  AlignJustify, List, ListOrdered, Image, Link, Quote, Code, Undo, Redo
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface WysiwygEditorProps {
  initialContent: string;
  onSave: (content: string) => void;
  onCancel: () => void;
}

const WysiwygEditor = ({ initialContent, onSave, onCancel }: WysiwygEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent;
      editorRef.current.focus();
    }
  }, [initialContent]);

  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleFormat = (format: string) => {
    execCommand(format);
  };

  const handleAlign = (alignment: string) => {
    execCommand('justifyLeft', '');
    execCommand('justifyCenter', '');
    execCommand('justifyRight', '');
    execCommand('justifyFull', '');
    execCommand(alignment);
  };

  const handleLink = () => {
    if (showLinkInput) {
      if (linkUrl) {
        execCommand('createLink', linkUrl);
      }
      setShowLinkInput(false);
      setLinkUrl('');
    } else {
      setShowLinkInput(true);
    }
  };

  const handleImage = () => {
    if (showImageInput) {
      if (imageUrl) {
        execCommand('insertImage', imageUrl);
      }
      setShowImageInput(false);
      setImageUrl('');
    } else {
      setShowImageInput(true);
    }
  };

  const handleSave = () => {
    if (editorRef.current) {
      onSave(editorRef.current.innerHTML);
      toast.success('Content saved successfully');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1 bg-gray-50">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleFormat('bold')}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleFormat('italic')}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleFormat('underline')}
          title="Underline"
        >
          <Underline className="h-4 w-4" />
        </Button>
        
        <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleAlign('justifyLeft')}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleAlign('justifyCenter')}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleAlign('justifyRight')}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleAlign('justifyFull')}
          title="Align Justify"
        >
          <AlignJustify className="h-4 w-4" />
        </Button>
        
        <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => execCommand('insertOrderedList')}
          title="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => execCommand('insertUnorderedList')}
          title="Unordered List"
        >
          <List className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleLink}
          title="Insert Link"
        >
          <Link className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleImage}
          title="Insert Image"
        >
          <Image className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => execCommand('formatBlock', '<blockquote>')}
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => execCommand('formatBlock', '<pre>')}
          title="Code Block"
        >
          <Code className="h-4 w-4" />
        </Button>
        
        <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => execCommand('undo')}
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => execCommand('redo')}
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>
      
      {showLinkInput && (
        <div className="p-2 border-b border-gray-200 flex items-center bg-gray-50">
          <input
            type="text"
            placeholder="Enter URL"
            className="flex-1 p-1 border rounded mr-2"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
          <Button size="sm" onClick={handleLink}>Insert Link</Button>
        </div>
      )}
      
      {showImageInput && (
        <div className="p-2 border-b border-gray-200 flex items-center bg-gray-50">
          <input
            type="text"
            placeholder="Enter image URL"
            className="flex-1 p-1 border rounded mr-2"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <Button size="sm" onClick={handleImage}>Insert Image</Button>
        </div>
      )}
      
      <div
        ref={editorRef}
        className="min-h-[200px] p-4 focus:outline-none"
        contentEditable
        suppressContentEditableWarning
      />
      
      <div className="bg-gray-50 p-2 border-t border-gray-200 flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default WysiwygEditor;
