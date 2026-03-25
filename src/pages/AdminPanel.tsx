import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trash2, LogOut, Save, Plus, Home, Check, X, CalendarDays, Users, IndianRupee, TrendingUp } from 'lucide-react';
import { localApiService, Booking } from '@/services/localApi';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const cld = new Cloudinary({ cloud: { cloudName: 'dkusa47qe' } });

const EMPTY_BOOKING = { name: '', members: 1, package: '', date: '', total: 0, advance: 0, balance: 0, paid: false, status: 'pending' as const };

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [pricing, setPricing] = useState({ rooms: { dormitory: 0, couples: 0, family: 0 }, packages: { adventure: 0, romantic: 0, family: 0 } });
  const [gallery, setGallery] = useState<string[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [message, setMessage] = useState<{ text: string; type: string } | ''>('');
  const [loading, setLoading] = useState(false);
  const [newImageName, setNewImageName] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showAddBooking, setShowAddBooking] = useState(false);
  const [newBooking, setNewBooking] = useState(EMPTY_BOOKING);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFields, setEditFields] = useState<{ total: number; advance: number; paid: boolean }>({ total: 0, advance: 0, paid: false });
  const navigate = useNavigate();

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
      await localApiService.adminLogin(credentials);
      setIsAuthenticated(true);
      fetchDashboardData();
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
      setBookings(localApiService.getBookings());
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
    if (!newImageName.trim()) { showMessage('Please enter an image name', 'error'); return; }
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

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    let added = 0;
    let currentGallery = [...gallery];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'malnad_gallery');
      try {
        const res = await fetch('https://api.cloudinary.com/v1_1/dkusa47qe/image/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.public_id) {
          currentGallery = [...currentGallery, data.public_id];
          added++;
        }
      } catch (e) {
        console.error('Upload failed for', file.name);
      }
    }
    localStorage.setItem('malnad_gallery', JSON.stringify(currentGallery));
    setGallery(currentGallery);
    setUploading(false);
    showMessage(`${added} image(s) uploaded successfully`);
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

  const handleAddBooking = () => {
    if (!newBooking.name || !newBooking.date || !newBooking.package) {
      showMessage('Please fill name, package and date', 'error');
      return;
    }
    const balance = newBooking.total - newBooking.advance;
    localApiService.addBooking({ ...newBooking, balance });
    setBookings(localApiService.getBookings());
    setNewBooking(EMPTY_BOOKING);
    setShowAddBooking(false);
    showMessage('Booking added successfully');
  };

  const handleStatus = (id: string, status: Booking['status']) => {
    localApiService.updateBookingStatus(id, status);
    setBookings(localApiService.getBookings());
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this booking?')) return;
    localApiService.deleteBooking(id);
    setBookings(localApiService.getBookings());
  };

  const startEdit = (b: Booking) => {
    setEditingId(b.id);
    setEditFields({ total: b.total, advance: b.advance, paid: b.paid });
  };

  const saveEdit = (id: string) => {
    const balance = editFields.total - editFields.advance;
    const bookings = localApiService.getBookings().map(b =>
      b.id === id ? { ...b, ...editFields, balance } : b
    );
    localStorage.setItem('malnad_bookings', JSON.stringify(bookings));
    setBookings(localApiService.getBookings());
    setEditingId(null);
    showMessage('Booking updated successfully');
  };

  // Stats
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthlyConfirmed = confirmedBookings.filter(b => b.date.startsWith(thisMonth)).length;
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.total, 0);

  // Monthly chart data (last 6 months)
  const chartData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    const key = d.toISOString().slice(0, 7);
    return {
      month: d.toLocaleString('default', { month: 'short' }),
      bookings: confirmedBookings.filter(b => b.date.startsWith(key)).length
    };
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader><CardTitle>Admin Login</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {message && (
              <Alert className={(message as any).type === 'error' ? 'border-red-500' : 'border-green-500'}>
                <AlertDescription>{(message as any).text}</AlertDescription>
              </Alert>
            )}
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && login()} />
            </div>
            <Button onClick={login} disabled={loading} className="w-full">{loading ? 'Logging in...' : 'Login'}</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/')} variant="outline"><Home className="h-4 w-4 mr-2" />Homepage</Button>
            <Button onClick={logout} variant="outline"><LogOut className="h-4 w-4 mr-2" />Logout</Button>
          </div>
        </div>

        {message && (
          <Alert className={(message as any).type === 'error' ? 'border-red-500' : 'border-green-500'}>
            <AlertDescription>{(message as any).text}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Bookings', value: confirmedBookings.length, icon: <CalendarDays className="h-5 w-5 text-blue-500" /> },
            { label: 'This Month', value: monthlyConfirmed, icon: <TrendingUp className="h-5 w-5 text-green-500" /> },
            { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: <IndianRupee className="h-5 w-5 text-yellow-500" /> },
            { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, icon: <Users className="h-5 w-5 text-orange-500" /> },
          ].map(s => (
            <Card key={s.label}>
              <CardContent className="pt-4 flex items-center gap-3">
                {s.icon}
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Monthly Chart */}
        <Card>
          <CardHeader><CardTitle>Monthly Confirmed Bookings</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="bookings" fill="#2d6a4f" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bookings Management */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Bookings</CardTitle>
              <Button onClick={() => setShowAddBooking(!showAddBooking)} size="sm">
                <Plus className="h-4 w-4 mr-2" />Add Booking
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">

            {/* Add Booking Form */}
            {showAddBooking && (
              <div className="border rounded-xl p-4 bg-gray-50 space-y-4">
                <h3 className="font-semibold">New Booking</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div><Label>Guest Name</Label><Input value={newBooking.name} onChange={e => setNewBooking({ ...newBooking, name: e.target.value })} placeholder="Full name" /></div>
                  <div><Label>Members</Label><Input type="number" min={1} value={newBooking.members} onChange={e => {
                      const members = parseInt(e.target.value) || 1;
                      const priceMap: Record<string, number> = {
                        'Adventure Package': pricing.packages.adventure,
                        'Romantic Package': pricing.packages.romantic,
                        'Family Package': pricing.packages.family,
                      };
                      const total = (priceMap[newBooking.package] || 0) * members;
                      setNewBooking({ ...newBooking, members, total, balance: total - newBooking.advance });
                    }} /></div>
                  <div><Label>Package</Label>
                    <select className="w-full border rounded-md px-3 py-2 text-sm" value={newBooking.package} onChange={e => {
                      const pkg = e.target.value;
                      const priceMap: Record<string, number> = {
                        'Adventure Package': pricing.packages.adventure,
                        'Romantic Package': pricing.packages.romantic,
                        'Family Package': pricing.packages.family,
                      };
                      const total = (priceMap[pkg] || 0) * newBooking.members;
                      setNewBooking({ ...newBooking, package: pkg, total, balance: total - newBooking.advance });
                    }}>
                      <option value="">Select package</option>
                      <option value="Adventure Package">Adventure Package (₹{pricing.packages.adventure}/person)</option>
                      <option value="Romantic Package">Romantic Package (₹{pricing.packages.romantic}/person)</option>
                      <option value="Family Package">Family Package (₹{pricing.packages.family}/person)</option>
                    </select>
                  </div>
                  <div><Label>Date</Label><Input type="date" value={newBooking.date} onChange={e => setNewBooking({ ...newBooking, date: e.target.value })} /></div>
                  <div><Label>Total (₹)</Label><Input type="number" value={newBooking.total} onChange={e => { const total = parseInt(e.target.value) || 0; setNewBooking({ ...newBooking, total, balance: total - newBooking.advance }); }} /></div>
                  <div><Label>Advance (₹)</Label><Input type="number" value={newBooking.advance} onChange={e => { const advance = parseInt(e.target.value) || 0; setNewBooking({ ...newBooking, advance, balance: newBooking.total - advance }); }} /></div>
                  <div className="flex items-center gap-2 pt-5">
                    <input type="checkbox" id="paid" checked={newBooking.paid} onChange={e => setNewBooking({ ...newBooking, paid: e.target.checked })} className="w-4 h-4" />
                    <Label htmlFor="paid">Fully Paid</Label>
                  </div>
                  <div><Label>Balance (₹)</Label><Input value={newBooking.total - newBooking.advance} readOnly className="bg-gray-100" /></div>
                  <div><Label>Status</Label>
                    <select className="w-full border rounded-md px-3 py-2 text-sm" value={newBooking.status} onChange={e => setNewBooking({ ...newBooking, status: e.target.value as Booking['status'] })}>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddBooking}><Check className="h-4 w-4 mr-2" />Save Booking</Button>
                  <Button variant="outline" onClick={() => setShowAddBooking(false)}>Cancel</Button>
                </div>
              </div>
            )}

            {/* Bookings Table */}
            {bookings.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">No bookings yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-2 pr-3">Name</th>
                      <th className="pb-2 pr-3">Package</th>
                      <th className="pb-2 pr-3">Date</th>
                      <th className="pb-2 pr-3">Members</th>
                      <th className="pb-2 pr-3">Total</th>
                      <th className="pb-2 pr-3">Advance</th>
                      <th className="pb-2 pr-3">Balance</th>
                      <th className="pb-2 pr-3">Paid</th>
                      <th className="pb-2 pr-3">Status</th>
                      <th className="pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 pr-3 font-medium">{b.name}</td>
                        <td className="py-2 pr-3">{b.package}</td>
                        <td className="py-2 pr-3">{b.date}</td>
                        <td className="py-2 pr-3">{b.members}</td>
                        {editingId === b.id ? (
                          <>
                            <td className="py-2 pr-3"><Input type="number" className="h-7 w-24" value={editFields.total} onChange={e => setEditFields({ ...editFields, total: parseInt(e.target.value) || 0 })} /></td>
                            <td className="py-2 pr-3"><Input type="number" className="h-7 w-24" value={editFields.advance} onChange={e => setEditFields({ ...editFields, advance: parseInt(e.target.value) || 0 })} /></td>
                            <td className="py-2 pr-3">₹{(editFields.total - editFields.advance).toLocaleString()}</td>
                            <td className="py-2 pr-3">
                              <input type="checkbox" checked={editFields.paid} onChange={e => setEditFields({ ...editFields, paid: e.target.checked })} className="w-4 h-4" />
                            </td>
                            <td className="py-2 pr-3"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : b.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{b.status}</span></td>
                            <td className="py-2">
                              <div className="flex gap-1">
                                <Button size="sm" className="h-7 px-2 bg-green-600 hover:bg-green-700" onClick={() => saveEdit(b.id)}><Check className="h-3 w-3" /></Button>
                                <Button size="sm" variant="outline" className="h-7 px-2" onClick={() => setEditingId(null)}><X className="h-3 w-3" /></Button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="py-2 pr-3">₹{b.total.toLocaleString()}</td>
                            <td className="py-2 pr-3">₹{b.advance.toLocaleString()}</td>
                            <td className="py-2 pr-3">₹{(b.total - b.advance).toLocaleString()}</td>
                            <td className="py-2 pr-3">{b.paid ? <span className="text-green-600 font-semibold">Yes</span> : <span className="text-red-500">No</span>}</td>
                            <td className="py-2 pr-3"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : b.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{b.status}</span></td>
                            <td className="py-2">
                              <div className="flex gap-1">
                                <Button size="sm" variant="outline" className="h-7 px-2 text-blue-600 border-blue-300 hover:bg-blue-50" onClick={() => startEdit(b)}><Save className="h-3 w-3" /></Button>
                                {b.status !== 'confirmed' && <Button size="sm" variant="outline" className="h-7 px-2 text-green-600 border-green-300 hover:bg-green-50" onClick={() => handleStatus(b.id, 'confirmed')}><Check className="h-3 w-3" /></Button>}
                                {b.status !== 'rejected' && <Button size="sm" variant="outline" className="h-7 px-2 text-red-600 border-red-300 hover:bg-red-50" onClick={() => handleStatus(b.id, 'rejected')}><X className="h-3 w-3" /></Button>}
                                <Button size="sm" variant="outline" className="h-7 px-2 text-gray-500 hover:bg-gray-100" onClick={() => handleDelete(b.id)}><Trash2 className="h-3 w-3" /></Button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pricing Management */}
        <Card>
          <CardHeader><CardTitle>Pricing Management</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Room Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><Label>Dormitory (₹)</Label><Input type="number" value={pricing.rooms.dormitory} onChange={(e) => setPricing({ ...pricing, rooms: { ...pricing.rooms, dormitory: parseInt(e.target.value) } })} /></div>
                <div><Label>Couples Room (₹)</Label><Input type="number" value={pricing.rooms.couples} onChange={(e) => setPricing({ ...pricing, rooms: { ...pricing.rooms, couples: parseInt(e.target.value) } })} /></div>
                <div><Label>Family Room (₹)</Label><Input type="number" value={pricing.rooms.family} onChange={(e) => setPricing({ ...pricing, rooms: { ...pricing.rooms, family: parseInt(e.target.value) } })} /></div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Package Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><Label>Adventure Package (₹)</Label><Input type="number" value={pricing.packages.adventure} onChange={(e) => setPricing({ ...pricing, packages: { ...pricing.packages, adventure: parseInt(e.target.value) } })} /></div>
                <div><Label>Romantic Package (₹)</Label><Input type="number" value={pricing.packages.romantic} onChange={(e) => setPricing({ ...pricing, packages: { ...pricing.packages, romantic: parseInt(e.target.value) } })} /></div>
                <div><Label>Family Package (₹)</Label><Input type="number" value={pricing.packages.family} onChange={(e) => setPricing({ ...pricing, packages: { ...pricing.packages, family: parseInt(e.target.value) } })} /></div>
              </div>
            </div>
            <Button onClick={updatePricing} disabled={loading}><Save className="h-4 w-4 mr-2" />{loading ? 'Saving...' : 'Save Pricing'}</Button>
          </CardContent>
        </Card>

        {/* Gallery Management */}
        <Card>
          <CardHeader><CardTitle>Gallery Management ({gallery.length} images)</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {/* Drag & Drop Upload */}
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                dragOver ? 'border-forest bg-forest/5' : 'border-gray-300 hover:border-forest/50'
              }`}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <input id="fileInput" type="file" accept="image/*" multiple className="hidden" onChange={e => handleFiles(e.target.files)} />
              <p className="text-muted-foreground text-sm">{uploading ? 'Uploading to Cloudinary...' : 'Drag & drop images here or click to choose files'}</p>
              <p className="text-xs text-muted-foreground mt-1">Supports JPG, PNG, WEBP</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {gallery.map((image, index) => (
                <div key={index} className="relative group">
                  {(() => {
                    const isCloudinary = image.includes('/')  || !image.includes('.');
                    const imgSrc = isCloudinary
                      ? cld.image(image).format('auto').quality('auto').resize(auto().gravity(autoGravity()).width(300).height(200))
                      : null;
                    return isCloudinary && imgSrc
                      ? <AdvancedImage cldImg={imgSrc} className="w-full h-32 object-cover rounded-lg" />
                      : <img src={localStorage.getItem(`malnad_img_${image}`) || `/gallery/${image}`} alt={`Gallery ${index + 1}`} className="w-full h-32 object-cover rounded-lg"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDIwMCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04NyA0OEw5MyA1NEw5OSA0OEwxMDUgNTRMMTEzIDQ2VjgySDg3VjQ4WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K'; }} />
                  })()}
                  <Button size="sm" variant="destructive" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => deleteImage(image)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 rounded-b-lg truncate">{image}</div>
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
