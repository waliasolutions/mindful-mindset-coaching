
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useCoreWebVitals } from '@/hooks/useCoreWebVitals';
import { TrendingUp, Clock, Zap, Activity, BarChart2 } from 'lucide-react';

const PerformanceDashboard = () => {
  const { vitals, vitalsRatings, thresholds } = useCoreWebVitals();

  const getStatusBadge = (rating: 'good' | 'needs-improvement' | 'poor' | undefined) => {
    switch (rating) {
      case 'good':
        return { status: 'Ausgezeichnet', variant: 'default' as const };
      case 'needs-improvement':
        return { status: 'Durchschnittlich', variant: 'outline' as const };
      case 'poor':
        return { status: 'Schlecht', variant: 'destructive' as const };
      default:
        return { status: 'Laden...', variant: 'secondary' as const };
    }
  };

  const lcpStatus = getStatusBadge(vitalsRatings.lcp);
  const clsStatus = getStatusBadge(vitalsRatings.cls);
  const fidStatus = getStatusBadge(vitalsRatings.fid);
  const fcpStatus = getStatusBadge(vitalsRatings.fcp);
  const ttfbStatus = getStatusBadge(vitalsRatings.ttfb);

  // Calculate overall score based on Core Web Vitals
  const calculateOverallScore = () => {
    let score = 100;
    const ratings = Object.values(vitalsRatings);
    ratings.forEach(rating => {
      if (rating === 'needs-improvement') score -= 15;
      if (rating === 'poor') score -= 30;
    });
    return Math.max(0, score);
  };

  const overallScore = calculateOverallScore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Core Web Vitals Dashboard</h2>
        <Badge variant={overallScore >= 80 ? 'default' : overallScore >= 50 ? 'outline' : 'destructive'}>
          Score: {overallScore}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* LCP - Largest Contentful Paint */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">LCP (Largest Contentful Paint)</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vitals.lcp ? `${(vitals.lcp / 1000).toFixed(2)}s` : 'Laden...'}
            </div>
            <Badge variant={lcpStatus.variant} className="mt-2">
              {lcpStatus.status}
            </Badge>
            <Progress 
              value={vitals.lcp ? Math.min((vitals.lcp / thresholds.lcp.poor) * 100, 100) : 0} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Ziel: &lt; {thresholds.lcp.good / 1000}s
            </p>
          </CardContent>
        </Card>

        {/* FCP - First Contentful Paint */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FCP (First Contentful Paint)</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vitals.fcp ? `${(vitals.fcp / 1000).toFixed(2)}s` : 'Laden...'}
            </div>
            <Badge variant={fcpStatus.variant} className="mt-2">
              {fcpStatus.status}
            </Badge>
            <Progress 
              value={vitals.fcp ? Math.min((vitals.fcp / thresholds.fcp.poor) * 100, 100) : 0} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Ziel: &lt; {thresholds.fcp.good / 1000}s
            </p>
          </CardContent>
        </Card>

        {/* CLS - Cumulative Layout Shift */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CLS (Cumulative Layout Shift)</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vitals.cls.toFixed(3)}
            </div>
            <Badge variant={clsStatus.variant} className="mt-2">
              {clsStatus.status}
            </Badge>
            <Progress 
              value={Math.min((vitals.cls / thresholds.cls.poor) * 100, 100)} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Ziel: &lt; {thresholds.cls.good}
            </p>
          </CardContent>
        </Card>

        {/* FID - First Input Delay */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FID (First Input Delay)</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vitals.fid ? `${vitals.fid.toFixed(0)}ms` : 'Warten auf Input...'}
            </div>
            <Badge variant={fidStatus.variant} className="mt-2">
              {fidStatus.status}
            </Badge>
            <Progress 
              value={vitals.fid ? Math.min((vitals.fid / thresholds.fid.poor) * 100, 100) : 0} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Ziel: &lt; {thresholds.fid.good}ms
            </p>
          </CardContent>
        </Card>

        {/* TTFB - Time to First Byte */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TTFB (Time to First Byte)</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vitals.ttfb ? `${vitals.ttfb.toFixed(0)}ms` : 'Laden...'}
            </div>
            <Badge variant={ttfbStatus.variant} className="mt-2">
              {ttfbStatus.status}
            </Badge>
            <Progress 
              value={vitals.ttfb ? Math.min((vitals.ttfb / thresholds.ttfb.poor) * 100, 100) : 0} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Ziel: &lt; {thresholds.ttfb.good}ms
            </p>
          </CardContent>
        </Card>

        {/* Overall Score */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamtbewertung</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overallScore}
            </div>
            <Badge variant={overallScore >= 80 ? 'default' : overallScore >= 50 ? 'outline' : 'destructive'} className="mt-2">
              {overallScore >= 80 ? 'Ausgezeichnet' : overallScore >= 50 ? 'Durchschnittlich' : 'Verbesserungsbedarf'}
            </Badge>
            <Progress 
              value={overallScore} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Basierend auf Core Web Vitals
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
