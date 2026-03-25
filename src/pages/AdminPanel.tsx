import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trash2, LogOut, Save, Plus } from 'lucide-react';
import { localApiService } from '@/services/localApi';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [pricing, setPricing] = useState({
    rooms: { dormitory: 0, couples: 0, family: 0 },
    packages: { adventure: 0, romantic: 0, family: 0 }
  });
  const [gallery, setGallery] = useState<string[]>([]);
  const [message, setMessage] = useState<{text: string, type: string} | ''>('');
  const [loading, setLoading] = useState(false);
  const [newImageName, setNewImageName] = useState('');

  useEffect(() => {
    if (localApiService.isAdminLoggedIn()) {
      setIsAuthenticated(true);
      fetchDashboardData();
    }
  }, []);

  const showMessage = (msg: string, type = 'success') => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(''), 3000);
  };

  const login = async () => {
    try {
      setLoading(true);
      const data = await localApiService.adminLogin(credentials);
      setIsAuthenticated(true);
      fetchDashboardData();
      showMessage('Login successful');
    } catch (error: any) {
      showMessage(error.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localApiService.adminLogout();
    setIsAuthenticated(false);
    setCredentials({ username: '', password: '' });
  };

  const fetchDashboardData = async () => {
    try {
      const data = await localApiService.getDashboardData();
      setPricing(data.pricing);
      setGallery(data.gallery);
    } catch (error: any) {
      showMessage('Failed to fetch data', 'error');
    }
  };

  const updatePricing = async () => {
    try {
      setLoading(true);
      await localApiService.updatePricing(pricing);
      showMessage('Pricing updated successfully');
    } catch (error: any) {
      showMessage('Failed to update pricing', 'error');
    } finally {
      setLoading(false);
    }
  };

  const addImage = async () => {
    if (!newImageName.trim()) {
      showMessage('Please enter an image name', 'error');
      return;
    }
    
    try {
      setLoading(true);
      const data = await localApiService.addGalleryImage(newImageName.trim());
      setGallery(data.gallery);
      setNewImageName('');
      showMessage('Image added successfully');
    } catch (error: any) {
      showMessage('Failed to add image', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (imageName: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      setLoading(true);
      const data = await localApiService.deleteGalleryImage(imageName);
      setGallery(data.gallery);
      showMessage('Image deleted successfully');
    } catch (error: any) {
      showMessage('Failed to delete image', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {message && (
              <Alert className={message.type === 'error' ? 'border-red-500' : 'border-green-500'}>
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              />
            </div>
            <Button onClick={login} disabled={loading} className="w-full">
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Button onClick={logout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {message && (
          <Alert className={message.type === 'error' ? 'border-red-500' : 'border-green-500'}>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {/* Pricing Management */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Room Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Dormitory (₹)</Label>
                  <Input
                    type="number"
                    value={pricing.rooms.dormitory}
                    onChange={(e) => setPricing({
                      ...pricing,
                      rooms: {...pricing.rooms, dormitory: parseInt(e.target.value)}
                    })}
                  />
                </div>
                <div>
                  <Label>Couples Room (₹)</Label>
                  <Input
                    type="number"
                    value={pricing.rooms.couples}
                    onChange={(e) => setPricing({
                      ...pricing,
                      rooms: {...pricing.rooms, couples: parseInt(e.target.value)}
                    })}
                  />
                </div>
                <div>
                  <Label>Family Room (₹)</Label>
                  <Input
                    type="number"
                    value={pricing.rooms.family}
                    onChange={(e) => setPricing({
                      ...pricing,
                      rooms: {...pricing.rooms, family: parseInt(e.target.value)}
                    })}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Package Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Adventure Package (₹)</Label>
                  <Input
                    type="number"
                    value={pricing.packages.adventure}
                    onChange={(e) => setPricing({
                      ...pricing,
                      packages: {...pricing.packages, adventure: parseInt(e.target.value)}
                    })}
                  />
                </div>
                <div>
                  <Label>Romantic Package (₹)</Label>
                  <Input
                    type="number"
                    value={pricing.packages.romantic}
                    onChange={(e) => setPricing({
                      ...pricing,
                      packages: {...pricing.packages, romantic: parseInt(e.target.value)}
                    })}
                  />
                </div>
                <div>
                  <Label>Family Package (₹)</Label>
                  <Input
                    type="number"
                    value={pricing.packages.family}
                    onChange={(e) => setPricing({
                      ...pricing,
                      packages: {...pricing.packages, family: parseInt(e.target.value)}
                    })}
                  />
                </div>
              </div>
            </div>

            <Button onClick={updatePricing} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Saving...' : 'Save Pricing'}
            </Button>
          </CardContent>
        </Card>

        {/* Gallery Management */}
        <Card>
          <CardHeader>
            <CardTitle>Gallery Management ({gallery.length} images)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="imageName">Add New Image (enter filename)</Label>
                <Input
                  id="imageName"
                  placeholder="e.g., new-image.jpg"
                  value={newImageName}
                  onChange={(e) => setNewImageName(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={addImage} disabled={loading}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Image
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {gallery.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={`/gallery/${image}`}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDIwMCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04NyA0OEw5MyA1NEw5OSA0OEwxMDUgNTRMMTEzIDQ2VjgySDg3VjQ4WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                    }}
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => deleteImage(image)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 rounded-b-lg truncate">
                    {image}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;