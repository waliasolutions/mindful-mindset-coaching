
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Download, Upload, RefreshCw } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { extractAllSectionsFlexible, discoverContentStructure } from '@/utils/improvedContentExtractor';
import { saveUnifiedSectionContent, getUnifiedContent, clearAllUnifiedContent } from '@/utils/unifiedContentStorage';

interface ContentImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContentImportDialog: React.FC<ContentImportDialogProps> = ({ isOpen, onClose }) => {
  const [isImporting, setIsImporting] = useState(false);
  const [discoveredStructure, setDiscoveredStructure] = useState<Record<string, string[]>>({});

  const handleDiscoverContent = () => {
    const structure = discoverContentStructure();
    setDiscoveredStructure(structure);
    toast.success(`Discovered ${Object.keys(structure).length} sections with editable content`);
  };

  const handleImportContent = async () => {
    setIsImporting(true);
    
    try {
      const extractedContent = extractAllSectionsFlexible();
      let importedCount = 0;
      
      Object.entries(extractedContent).forEach(([sectionId, content]) => {
        if (Object.keys(content).length > 0) {
          saveUnifiedSectionContent(sectionId, 'section', content);
          importedCount++;
        }
      });
      
      toast.success(`Successfully imported content from ${importedCount} sections`);
      onClose();
    } catch (error) {
      console.error('Error importing content:', error);
      toast.error('Failed to import content');
    } finally {
      setIsImporting(false);
    }
  };

  const handleExportContent = () => {
    try {
      const allContent = getUnifiedContent();
      const dataStr = JSON.stringify(allContent, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `website-content-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('Content exported successfully');
    } catch (error) {
      console.error('Error exporting content:', error);
      toast.error('Failed to export content');
    }
  };

  const handleResetContent = () => {
    if (confirm('Are you sure you want to reset all content? This action cannot be undone.')) {
      clearAllUnifiedContent();
      toast.success('All content has been reset');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Content Management Tools</DialogTitle>
          <DialogDescription>
            Import, export, or manage your website content. Use these tools to sync content between your website and admin panel.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Content Discovery */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Discover Content Structure</h3>
            <p className="text-sm text-gray-600 mb-3">
              Analyze your website to find editable content sections.
            </p>
            <Button onClick={handleDiscoverContent} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Discover Content
            </Button>
            
            {Object.keys(discoveredStructure).length > 0 && (
              <div className="mt-3 p-3 bg-gray-50 rounded">
                <p className="text-sm font-medium mb-2">Discovered Sections:</p>
                <ul className="text-sm space-y-1">
                  {Object.entries(discoveredStructure).map(([sectionId, fields]) => (
                    <li key={sectionId}>
                      <strong>{sectionId}:</strong> {fields.join(', ')}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Import Content */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Import Website Content</h3>
            <p className="text-sm text-gray-600 mb-3">
              Extract current content from your website and make it editable in the admin panel.
            </p>
            <Button 
              onClick={handleImportContent} 
              disabled={isImporting}
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" />
              {isImporting ? 'Importing...' : 'Import Current Content'}
            </Button>
          </div>
          
          {/* Export Content */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Export Content</h3>
            <p className="text-sm text-gray-600 mb-3">
              Download all your content as a JSON file for backup or migration.
            </p>
            <Button onClick={handleExportContent} variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Export Content
            </Button>
          </div>
          
          {/* Reset Content */}
          <div className="border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-red-700">Reset All Content</h3>
            <p className="text-sm text-gray-600 mb-3">
              Clear all saved content and start fresh. This action cannot be undone.
            </p>
            <Button onClick={handleResetContent} variant="destructive" className="w-full">
              Reset Content
            </Button>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContentImportDialog;
