
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Edit, Trash2, ChevronDown, ChevronUp, Grip, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import SectionEditor from './SectionEditor';

// Section types that will be editable
interface Section {
  id: string;
  name: string;
  component: string;
  visible: boolean;
  order: number;
}

const defaultSections: Section[] = [
  { id: 'hero', name: 'Hero', component: 'Hero', visible: true, order: 0 },
  { id: 'services', name: 'Services', component: 'Services', visible: true, order: 1 },
  { id: 'about', name: 'About', component: 'About', visible: true, order: 2 },
  { id: 'pricing', name: 'Pricing', component: 'PricingWithQuote', visible: true, order: 3 },
  { id: 'contact', name: 'Contact', component: 'Contact', visible: true, order: 4 },
];

const AdminSections = () => {
  const [sections, setSections] = useState<Section[]>(
    JSON.parse(localStorage.getItem('sectionOrder') || JSON.stringify(defaultSections))
  );
  const [editingSection, setEditingSection] = useState<Section | null>(null);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update order properties
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }));
    
    setSections(updatedItems);
    localStorage.setItem('sectionOrder', JSON.stringify(updatedItems));
    toast.success('Section order updated');
  };

  const toggleVisibility = (id: string) => {
    const updatedSections = sections.map(section => 
      section.id === id ? { ...section, visible: !section.visible } : section
    );
    setSections(updatedSections);
    localStorage.setItem('sectionOrder', JSON.stringify(updatedSections));
    
    const section = sections.find(s => s.id === id);
    toast.success(`${section?.name} section ${section?.visible ? 'hidden' : 'visible'}`);
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const sectionIndex = sections.findIndex(s => s.id === id);
    if (
      (direction === 'up' && sectionIndex === 0) || 
      (direction === 'down' && sectionIndex === sections.length - 1)
    ) {
      return;
    }
    
    const newSections = [...sections];
    const targetIndex = direction === 'up' ? sectionIndex - 1 : sectionIndex + 1;
    
    // Swap positions
    [newSections[sectionIndex], newSections[targetIndex]] = 
      [newSections[targetIndex], newSections[sectionIndex]];
    
    // Update order properties
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      order: index,
    }));
    
    setSections(updatedSections);
    localStorage.setItem('sectionOrder', JSON.stringify(updatedSections));
    toast.success('Section moved');
  };

  const handleEditSection = (section: Section) => {
    setEditingSection(section);
  };

  const handleCloseEditor = () => {
    setEditingSection(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-forest">Website Sections</h1>
        <Button variant="default" onClick={() => {
          localStorage.removeItem('sectionOrder');
          setSections(defaultSections);
          toast.success('Section order reset to default');
        }}>
          Reset Order
        </Button>
      </div>
      
      <p className="text-gray-600">
        Drag and drop sections to reorder them on the page. Toggle visibility or edit content for each section.
      </p>
      
      <Card>
        <CardContent className="p-6">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {sections
                    .sort((a, b) => a.order - b.order)
                    .map((section, index) => (
                      <Draggable key={section.id} draggableId={section.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`bg-white border rounded-lg p-4 flex items-center justify-between ${
                              !section.visible ? 'opacity-60' : ''
                            }`}
                          >
                            <div className="flex items-center">
                              <div
                                {...provided.dragHandleProps}
                                className="mr-3 text-gray-400 hover:text-gray-600 cursor-grab"
                              >
                                <Grip className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="font-medium">{section.name}</h3>
                                <p className="text-sm text-gray-500">{section.component}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => moveSection(section.id, 'up')}
                                disabled={index === 0}
                              >
                                <ChevronUp className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => moveSection(section.id, 'down')}
                                disabled={index === sections.length - 1}
                              >
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleVisibility(section.id)}
                              >
                                {section.visible ? (
                                  <Eye className="h-4 w-4" />
                                ) : (
                                  <EyeOff className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditSection(section)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </CardContent>
      </Card>

      {editingSection && (
        <SectionEditor 
          section={editingSection} 
          onClose={handleCloseEditor} 
        />
      )}
    </div>
  );
};

export default AdminSections;
