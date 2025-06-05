
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { TrendingUp, Clock, Zap, HardDrive } from 'lucide-react';

const PerformanceDashboard = () => {
  const metrics = usePerformanceMonitor();

  const getLoadTimeStatus = (time: number) => {
    if (time < 1000) return { status: 'Ausgezeichnet', color: 'bg-green-500', variant: 'default' as const };
    if (time < 2000) return { status: 'Gut', color: 'bg-blue-500', variant: 'secondary' as const };
    if (time < 3000) return { status: 'Durchschnittlich', color: 'bg-yellow-500', variant: 'outline' as const };
    return { status: 'Schlecht', color: 'bg-red-500', variant: 'destructive' as const };
  };

  const loadTimeStatus = getLoadTimeStatus(metrics.loadTime);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Leistungs-Dashboard</h2>
        <Badge variant={loadTimeStatus.variant}>
          {loadTimeStatus.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ladezeit</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(metrics.loadTime / 1000).toFixed(2)}s
            </div>
            <Progress 
              value={Math.min((metrics.loadTime / 3000) * 100, 100)} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Seitenladegeschwindigkeit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Renderzeit</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(metrics.renderTime / 1000).toFixed(2)}s
            </div>
            <Progress 
              value={Math.min((metrics.renderTime / 2000) * 100, 100)} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Inhalts-Rendergeschwindigkeit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Speicherverbrauch</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.memoryUsage.toFixed(1)} MB
            </div>
            <Progress 
              value={Math.min((metrics.memoryUsage / 50) * 100, 100)} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              JavaScript Heap-Größe
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamtbewertung</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.loadTime > 0 ? Math.max(100 - Math.floor(metrics.loadTime / 30), 0) : 0}
            </div>
            <Progress 
              value={metrics.loadTime > 0 ? Math.max(100 - Math.floor(metrics.loadTime / 30), 0) : 0} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Leistungsbewertung
            </p>
          </CardContent>
        </Card>
      </div>

      {metrics.navigationTiming && (
        <Card>
          <CardHeader>
            <CardTitle>Detaillierte Zeitmessung</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="font-medium">DNS-Lookup</p>
                <p className="text-muted-foreground">
                  {metrics.navigationTiming.domainLookupEnd - metrics.navigationTiming.domainLookupStart}ms
                </p>
              </div>
              <div>
                <p className="font-medium">Server-Antwort</p>
                <p className="text-muted-foreground">
                  {metrics.navigationTiming.responseEnd - metrics.navigationTiming.requestStart}ms
                </p>
              </div>
              <div>
                <p className="font-medium">DOM-Verarbeitung</p>
                <p className="text-muted-foreground">
                  {metrics.navigationTiming.domComplete - metrics.navigationTiming.domContentLoadedEventStart}ms
                </p>
              </div>
              <div>
                <p className="font-medium">Ressourcen-Laden</p>
                <p className="text-muted-foreground">
                  {metrics.navigationTiming.loadEventEnd - metrics.navigationTiming.domContentLoadedEventEnd}ms
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PerformanceDashboard;
