
-- Enable RLS on website_backups table
ALTER TABLE website_backups ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view all backups (for admin functionality)
CREATE POLICY "Allow authenticated users to view backups" ON website_backups
    FOR SELECT 
    TO authenticated 
    USING (true);

-- Allow authenticated users to create backups
CREATE POLICY "Allow authenticated users to create backups" ON website_backups
    FOR INSERT 
    TO authenticated 
    WITH CHECK (true);

-- Allow authenticated users to delete backups
CREATE POLICY "Allow authenticated users to delete backups" ON website_backups
    FOR DELETE 
    TO authenticated 
    USING (true);

-- Allow authenticated users to update backups (if needed for restoration metadata)
CREATE POLICY "Allow authenticated users to update backups" ON website_backups
    FOR UPDATE 
    TO authenticated 
    USING (true);
