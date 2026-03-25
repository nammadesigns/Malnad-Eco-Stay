// Frontend-only data service using localStorage
const STORAGE_KEYS = {
  PRICING: 'malnad_pricing',
  GALLERY: 'malnad_gallery',
  ADMIN_TOKEN: 'malnad_admin_token',
  BOOKINGS: 'malnad_bookings'
};

export interface Booking {
  id: string;
  name: string;
  members: number;
  package: string;
  date: string;
  total: number;
  advance: number;
  balance: number;
  paid: boolean;
  status: 'confirmed' | 'rejected' | 'pending';
  createdAt: string;
}

// Default data
const DEFAULT_PRICING = {
  rooms: {
    dormitory: 800,
    couples: 1500,
    family: 2500
  },
  packages: {
    adventure: 2500,
    romantic: 3500,
    family: 4500
  }
};

const DEFAULT_GALLERY = [
  'WhatsApp Image 2026-03-20 at 12.31.22 PM.jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.24 PM (1).jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.24 PM.jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.26 PM (1).jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.26 PM (2).jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.26 PM.jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.27 PM.jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.28 PM (1).jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.28 PM.jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.29 PM (1).jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.30 PM.jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.31 PM (1).jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.31 PM.jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.32 PM (1).jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.32 PM.jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.34 PM.jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.36 PM.jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.38 PM.jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.39 PM (1).jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.39 PM.jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.40 PM (1).jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.40 PM.jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.41 PM (1).jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.41 PM (2).jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.41 PM.jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.42 PM.jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.43 PM (1).jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.43 PM.jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.44 PM (1).jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.44 PM.jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.51 PM.jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.55 PM (1).jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.55 PM.jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.56 PM (1).jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.56 PM.jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.57 PM (1).jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.57 PM.jpeg',
  'WhatsApp Image 2026-03-20 at 12.31.58 PM.jpeg'
];

// Initialize data if not exists
const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.PRICING)) {
    localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(DEFAULT_PRICING));
  }
  if (!localStorage.getItem(STORAGE_KEYS.GALLERY)) {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(DEFAULT_GALLERY));
  }
};

// Frontend-only API service
export const localApiService = {
  // Initialize data on first load
  init() {
    initializeData();
  },

  // Get pricing data
  async getPricing() {
    try {
      const pricing = localStorage.getItem(STORAGE_KEYS.PRICING);
      return pricing ? JSON.parse(pricing) : DEFAULT_PRICING;
    } catch (error) {
      console.error('Error getting pricing:', error);
      return DEFAULT_PRICING;
    }
  },

  // Get gallery images
  async getGallery() {
    try {
      const gallery = localStorage.getItem(STORAGE_KEYS.GALLERY);
      return gallery ? JSON.parse(gallery) : DEFAULT_GALLERY;
    } catch (error) {
      console.error('Error getting gallery:', error);
      return DEFAULT_GALLERY;
    }
  },

  // Admin login (simple check)
  async adminLogin(credentials) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
          const token = 'local_admin_token_' + Date.now();
          localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, token);
          resolve({ token, message: 'Login successful' });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500); // Simulate network delay
    });
  },

  // Check if admin is logged in
  isAdminLoggedIn() {
    return !!localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
  },

  // Admin logout
  adminLogout() {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
  },

  // Update pricing (admin only)
  async updatePricing(pricing) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.isAdminLoggedIn()) {
          reject(new Error('Not authenticated'));
          return;
        }
        
        try {
          localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(pricing));
          resolve({ message: 'Pricing updated successfully', pricing });
        } catch (error) {
          reject(new Error('Failed to update pricing'));
        }
      }, 300);
    });
  },

  // Add gallery image (admin only)
  async addGalleryImage(imageName) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.isAdminLoggedIn()) {
          reject(new Error('Not authenticated'));
          return;
        }
        
        try {
          const gallery = JSON.parse(localStorage.getItem(STORAGE_KEYS.GALLERY) || '[]');
          const updatedGallery = [...gallery, imageName];
          localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(updatedGallery));
          resolve({ message: 'Image added successfully', gallery: updatedGallery });
        } catch (error) {
          reject(new Error('Failed to add image'));
        }
      }, 300);
    });
  },

  // Delete gallery image (admin only)
  async deleteGalleryImage(imageName) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.isAdminLoggedIn()) {
          reject(new Error('Not authenticated'));
          return;
        }
        
        try {
          const gallery = JSON.parse(localStorage.getItem(STORAGE_KEYS.GALLERY) || '[]');
          const updatedGallery = gallery.filter(img => img !== imageName);
          localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(updatedGallery));
          resolve({ message: 'Image deleted successfully', gallery: updatedGallery });
        } catch (error) {
          reject(new Error('Failed to delete image'));
        }
      }, 300);
    });
  },

  // Get admin dashboard data
  async getDashboardData() {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        if (!this.isAdminLoggedIn()) {
          reject(new Error('Not authenticated'));
          return;
        }
        try {
          const pricing = await this.getPricing();
          const gallery = await this.getGallery();
          resolve({ pricing, gallery });
        } catch (error) {
          reject(new Error('Failed to fetch dashboard data'));
        }
      }, 300);
    });
  },

  getBookings(): Booking[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS) || '[]');
    } catch { return []; }
  },

  addBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Booking {
    const bookings = this.getBookings();
    const newBooking: Booking = { ...booking, id: Date.now().toString(), createdAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([...bookings, newBooking]));
    return newBooking;
  },

  updateBookingStatus(id: string, status: Booking['status']): void {
    const bookings = this.getBookings().map(b => b.id === id ? { ...b, status } : b);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  },

  deleteBooking(id: string): void {
    const bookings = this.getBookings().filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }
};

// Initialize data on module load
localApiService.init();