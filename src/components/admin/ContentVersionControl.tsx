
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, RotateCcw, Eye, Save } from 'lucide-react';
import { toast } from 'sonner';

interface ContentVersion {
  id: string;
  timestamp: string;
  changes: string;
  author: string;
  content: any;
}

interface ContentVersionControlProps {
  sectionId: string;
  currentContent: any;
  onRestore: (content: any) => void;
}

const ContentVersionControl = ({ sectionId, currentContent, onRestore }: ContentVersionControlProps) => {
  const [versions, setVersions] = useState<ContentVersion[]>([]);
  const [previewVersion, setPreviewVersion] = useState<string | null>(null);

  useEffect(() => {
    loadVersionHistory();
  }, [sectionId]);

  const loadVersionHistory = () => {
    const versionKey = `versions_${sectionId}`;
    const savedVersions = localStorage.getItem(versionKey);
    if (savedVersions) {
      try {
        setVersions(JSON.parse(savedVersions));
      } catch (error) {
        console.error('Error loading version history:', error);
      }
    }
  };

  const saveVersion = (changes: string) => {
    const newVersion: ContentVersion = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      changes,
      author: 'Admin',
      content: { ...currentContent }
    };

    const updatedVersions = [newVersion, ...versions.slice(0, 9)]; // Keep last 10 versions
    const versionKey = `versions_${sectionId}`;
    
    localStorage.setItem(versionKey, JSON.stringify(updatedVersions));
    setVersions(updatedVersions);
    
    toast.success('Version saved successfully');
  };

  const restoreVersion = (version: ContentVersion) => {
    onRestore(version.content);
    toast.success('Content restored from version');
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Version History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button 
            onClick={() => saveVersion('Manual save')}
            className="w-full"
            variant="outline"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Current Version
          </Button>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {versions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No version history available</p>
            ) : (
              versions.map((version) => (
                <div key={version.id} className="p-3 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {formatDate(version.timestamp)}
                      </Badge>
                      <span className="text-sm text-gray-600">{version.author}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{version.changes}</p>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setPreviewVersion(previewVersion === version.id ? null : version.id)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      {previewVersion === version.id ? 'Hide' : 'Preview'}
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => restoreVersion(version)}
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Restore
                    </Button>
                  </div>

                  {previewVersion === version.id && (
                    <div className="mt-3 p-3 bg-white rounded border">
                      <pre className="text-xs overflow-auto max-h-32">
                        {JSON.stringify(version.content, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentVersionControl;
