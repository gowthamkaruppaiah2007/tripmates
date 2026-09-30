import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface DestinationItem {
  id: number;
  name: string;
  image: string;
  rating: number;
  travelers: number;
  price: string;
  duration: string;
  description: string;
}

export interface TravelPlan {
  id?: string;
  userId: string;
  destinationName: string;
  startDate: string;
  endDate: string;
  groupSize: number;
  budget?: string;
  notes?: string;
  createdAt?: string;
}

export interface CommunityPost {
  id?: string;
  userId?: string;
  authorName: string;
  authorLocation: string;
  authorAvatar: string;
  rating: number;
  content: string;
  tripName: string;
  createdAt?: string;
}

const DEFAULT_DESTINATIONS: DestinationItem[] = [
  {
    id: 1,
    name: 'Madurai, Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    travelers: 5240,
    price: '₹14,999',
    duration: '4 days',
    description: 'Ancient temple city home to the historic Meenakshi Amman Temple and rich Tamil culture'
  },
  {
    id: 2,
    name: 'Ooty, Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    travelers: 6180,
    price: '₹12,499',
    duration: '5 days',
    description: 'Queen of Hill Stations surrounded by misty Nilgiri tea estates and scenic toy train rides'
  },
  {
    id: 3,
    name: 'Mahabalipuram, Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    travelers: 4890,
    price: '₹9,999',
    duration: '3 days',
    description: 'UNESCO World Heritage coastal town famous for ancient shore temples and rock relief sculptures'
  },
  {
    id: 4,
    name: 'Thanjavur, Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    travelers: 3950,
    price: '₹11,999',
    duration: '4 days',
    description: 'Grand Chola dynasty capital featuring the architectural marvel Brihadeeswarar Temple'
  },
  {
    id: 5,
    name: 'Kanyakumari, Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    travelers: 7120,
    price: '₹13,499',
    duration: '4 days',
    description: 'Southernmost tip of mainland India where the Bay of Bengal, Arabian Sea, and Indian Ocean meet'
  },
  {
    id: 6,
    name: 'Rameswaram, Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    travelers: 4530,
    price: '₹10,999',
    duration: '3 days',
    description: 'Sacred island town connected by the iconic Pamban sea bridge surrounded by turquoise waters'
  }
];

export const fetchDestinations = async (): Promise<DestinationItem[]> => {
  if (!isSupabaseConfigured) return DEFAULT_DESTINATIONS;
  try {
    const { data, error } = await supabase.from('destinations').select('*');
    if (error || !data || data.length === 0) return DEFAULT_DESTINATIONS;
    return data.map((d: any) => ({
      id: d.id,
      name: d.name,
      image: d.image_url,
      rating: d.rating,
      travelers: d.travelers_count,
      price: d.price,
      duration: d.duration,
      description: d.description
    }));
  } catch {
    return DEFAULT_DESTINATIONS;
  }
};

export const fetchSavedDestinations = async (userId: string): Promise<number[]> => {
  if (!isSupabaseConfigured) {
    const stored = localStorage.getItem(`saved_destinations_${userId}`);
    return stored ? JSON.parse(stored) : [];
  }
  try {
    const { data, error } = await supabase
      .from('saved_destinations')
      .select('destination_id')
      .eq('user_id', userId);
    if (error || !data) return [];
    return data.map(d => d.destination_id);
  } catch {
    return [];
  }
};

export const toggleSaveDestination = async (userId: string, destinationId: number, currentlySaved: boolean): Promise<boolean> => {
  if (!isSupabaseConfigured) {
    const stored = localStorage.getItem(`saved_destinations_${userId}`);
    let ids: number[] = stored ? JSON.parse(stored) : [];
    if (currentlySaved) {
      ids = ids.filter(id => id !== destinationId);
    } else {
      ids.push(destinationId);
    }
    localStorage.setItem(`saved_destinations_${userId}`, JSON.stringify(ids));
    return !currentlySaved;
  }

  try {
    if (currentlySaved) {
      await supabase
        .from('saved_destinations')
        .delete()
        .eq('user_id', userId)
        .eq('destination_id', destinationId);
      return false;
    } else {
      await supabase
        .from('saved_destinations')
        .insert([{ user_id: userId, destination_id: destinationId }]);
      return true;
    }
  } catch {
    return currentlySaved;
  }
};

export const saveTravelPlan = async (plan: TravelPlan): Promise<{ success: boolean; error?: string }> => {
  if (!isSupabaseConfigured) {
    const existing = JSON.parse(localStorage.getItem(`travel_plans_${plan.userId}`) || '[]');
    existing.push({ ...plan, id: 'plan_' + Date.now() });
    localStorage.setItem(`travel_plans_${plan.userId}`, JSON.stringify(existing));
    return { success: true };
  }

  try {
    const { error } = await supabase.from('travel_plans').insert([{
      user_id: plan.userId,
      destination_name: plan.destinationName,
      start_date: plan.startDate,
      end_date: plan.endDate,
      group_size: plan.groupSize,
      budget: plan.budget,
      notes: plan.notes
    }]);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to save travel plan' };
  }
};

export const fetchTravelPlans = async (userId: string): Promise<TravelPlan[]> => {
  if (!isSupabaseConfigured) {
    return JSON.parse(localStorage.getItem(`travel_plans_${userId}`) || '[]');
  }

  try {
    const { data, error } = await supabase
      .from('travel_plans')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error || !data) return [];
    return data.map((p: any) => ({
      id: p.id,
      userId: p.user_id,
      destinationName: p.destination_name,
      startDate: p.start_date,
      endDate: p.end_date,
      groupSize: p.group_size,
      budget: p.budget,
      notes: p.notes,
      createdAt: p.created_at
    }));
  } catch {
    return [];
  }
};
