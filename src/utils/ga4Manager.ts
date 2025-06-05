
interface GA4Config {
  trackingId: string;
  enabled: boolean;
}

class GA4Manager {
  private static instance: GA4Manager;
  private currentConfig: GA4Config | null = null;
  private scriptsLoaded = false;

  private constructor() {}

  static getInstance(): GA4Manager {
    if (!GA4Manager.instance) {
      GA4Manager.instance = new GA4Manager();
    }
    return GA4Manager.instance;
  }

  async initialize(config: GA4Config): Promise<boolean> {
    console.log('GA4Manager: Initializing with config', config);
    
    // Clean up existing scripts first
    this.cleanup();
    
    if (!config.enabled || !config.trackingId) {
      console.log('GA4Manager: GA4 disabled or no tracking ID');
      return true;
    }

    try {
      await this.loadGoogleAnalytics(config.trackingId);
      this.currentConfig = config;
      this.scriptsLoaded = true;
      console.log(`GA4Manager: Successfully initialized with ID: ${config.trackingId}`);
      return true;
    } catch (error) {
      console.error('GA4Manager: Failed to initialize:', error);
      return false;
    }
  }

  private async loadGoogleAnalytics(trackingId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Create and load the GA script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
      script.id = 'ga-script';
      
      script.onload = () => {
        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
          window.dataLayer.push(args);
        }
        
        gtag('js', new Date());
        gtag('config', trackingId);
        
        // Make gtag globally available
        (window as any).gtag = gtag;
        
        resolve();
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load Google Analytics script'));
      };
      
      document.head.appendChild(script);
    });
  }

  cleanup(): void {
    // Remove existing GA scripts
    const existingScript = document.getElementById('ga-script');
    const existingConfig = document.getElementById('ga-config');
    
    if (existingScript) {
      existingScript.remove();
    }
    if (existingConfig) {
      existingConfig.remove();
    }
    
    // Clear gtag function
    if ((window as any).gtag) {
      delete (window as any).gtag;
    }
    
    this.scriptsLoaded = false;
    this.currentConfig = null;
    
    console.log('GA4Manager: Cleaned up existing scripts');
  }

  getCurrentConfig(): GA4Config | null {
    return this.currentConfig;
  }

  isLoaded(): boolean {
    return this.scriptsLoaded;
  }

  async testConnection(trackingId: string): Promise<boolean> {
    try {
      // Basic validation of tracking ID format
      if (!/^G-[A-Z0-9]+$/.test(trackingId)) {
        return false;
      }
      
      // For now, just validate format. In production, you could ping GA API
      return true;
    } catch (error) {
      console.error('GA4Manager: Connection test failed:', error);
      return false;
    }
  }
}

export const ga4Manager = GA4Manager.getInstance();
