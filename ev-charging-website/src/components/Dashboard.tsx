import React, { useEffect, useState } from 'react';
import { 
  getUserProfile, 
  logout, 
  updateUserProfile, 
  resetPassword,
  createAddress,
  getAddresses,
  deleteAddress,
  setDefaultAddress,  // new API call for setting default
  toggle2FAStatus
} from '../api';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

interface UserProfile {
  phone_number: number | null;
  email_verified: boolean;
  name: string;
  two_fa_status: boolean;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
  profile_picture: string | null;
}

// Updated Address interface according to new schema.
interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  custom_type_name?: string;
  house_building: string;
  locality_street: string;
  landmark?: string;
  city: string;
  po_ps: string;
  district: string;
  state: string;
  pin: string;
  country: string;
  is_default: boolean;
}

// Updated interface for creating an address.
interface AddressCreate {
  type: 'Home' | 'Work' | 'Other';
  custom_type_name?: string;
  house_building: string;
  locality_street: string;
  landmark?: string;
  city: string;
  po_ps: string;
  district: string;
  state: string;
  pin: string;
  country: string;
  is_default?: boolean;
}

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    current_password: '',
    new_password: ''
  });
  // Updated addressForm state to match new API schema.
  const [addressForm, setAddressForm] = useState<AddressCreate>({
    type: 'Home',
    custom_type_name: '',
    house_building: '',
    locality_street: '',
    landmark: '',
    city: '',
    po_ps: '',
    district: '',
    state: '',
    pin: '',
    country: '',
    is_default: false,
  });

  // Load user profile on initial load.
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        const user = profile.data?.user_data || profile.user_data || profile.data;
        if (user) {
          setUserData({
            ...user,
            phone_number: user.phone_number ? user.phone_number : null
          });
        } else {
          console.error('User data not found in API response:', profile);
        }
      } catch (error: any) {
        console.error('Error loading user profile:', error);
        toast.error(error.response?.data?.detail || 'Failed to load user profile');
      }
    };
    loadUserProfile();
  }, []);

  // Helper function to fetch addresses.
  const fetchAddresses = async () => {
    try {
      const addressesResponse = await getAddresses();
      setAddresses(addressesResponse.data || addressesResponse);
    } catch (error: any) {
      console.error('Error loading addresses:', error);
      toast.error(error.response?.data?.detail || 'Failed to load addresses');
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy h:mm a');
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateUserProfile({
        ...formData,
        phone_number: formData.phone_number ? parseInt(formData.phone_number) : null
      });
      setUserData({ ...userData!, ...response.data });
      setEditMode(false);
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Update failed');
    }
  };

  const handle2FAToggle = async () => {
    try {
      const response = await toggle2FAStatus({ entered_password: formData.current_password });
      setUserData({ ...userData!, two_fa_status: !userData?.two_fa_status });
      toast.success(response.data.message);
      setShow2FAModal(false);
    } catch (error: any) {
      toast.error(error.response?.data?.detail || '2FA update failed');
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createAddress(addressForm);
      // Assuming the API returns the new address object,
      // add it to the current addresses list.
      setAddresses([...addresses, response.data]);
      setShowAddressModal(false);
      toast.success('Address added successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to add address');
    }
  };

  const handleDeleteAddress = async (address: Address) => {
    try {
      await deleteAddress(address.type, address.type === 'Other' ? address.custom_type_name : undefined);
      setAddresses(addresses.filter(addr => addr.id !== address.id));
      toast.success('Address deleted successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to delete address');
    }
  };
  

  // New function to set an address as default.
  const handleSetDefaultAddress = async (address: Address) => {
    try {
      // For "Other" addresses, we send the custom name along with the type.
      await setDefaultAddress(address.type, address.type === 'Other' ? address.custom_type_name : undefined);
      // Optionally, update UI locally (or you could refresh from backend).
      const updatedAddresses = addresses.map(addr => ({
        ...addr,
        is_default: addr.id === address.id,
      }));
      setAddresses(updatedAddresses);
      toast.success('Default address set successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to set default address');
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword({
        email: userData?.email || '',
        new_password: formData.new_password,
        otp_code: ''
      });
      setShowPasswordModal(false);
      toast.success('Password changed successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Password change failed');
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <p className="text-gray-600">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 sm:p-60">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif">
            Welcome Back, {userData?.name.split(' ')[0]}!
          </h1>
          <button
            onClick={logout}
            className="bg-gradient-to-br from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-pink-100"
          >
            Logout
          </button>
        </div>

        <Tabs selectedIndex={activeTab} onSelect={(index: number) => setActiveTab(index)}>
          <TabList className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-8">
            <Tab className="px-6 py-3 cursor-pointer text-gray-600 hover:text-indigo-600 
              aria-selected:bg-white aria-selected:shadow-xl aria-selected:text-indigo-600 
              rounded-xl transition-all duration-300 font-medium flex items-center justify-center">
              <span className="mr-2">👤</span> Profile
            </Tab>
            <Tab className="px-6 py-3 cursor-pointer text-gray-600 hover:text-indigo-600 
              aria-selected:bg-white aria-selected:shadow-xl aria-selected:text-indigo-600 
              rounded-xl transition-all duration-300 font-medium flex items-center justify-center">
              <span className="mr-2">🔒</span> Security
            </Tab>
            <Tab className="px-6 py-3 cursor-pointer text-gray-600 hover:text-indigo-600 
              aria-selected:bg-white aria-selected:shadow-xl aria-selected:text-indigo-600 
              rounded-xl transition-all duration-300 font-medium flex items-center justify-center">
              <span className="mr-2">🏠</span> Addresses ({addresses.length})
            </Tab>
          </TabList>

          {/* Profile Tab */}
          <TabPanel>
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-8 mb-6">
                <div className="relative shrink-0">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-indigo-100 p-1">
                    <img 
                      src={userData?.profile_picture || '/default-avatar.png'} 
                      className="w-full h-full rounded-full object-cover"
                      alt="Profile"
                    />
                    {!userData?.profile_picture && (
                      <div className="absolute inset-0 bg-indigo-50 rounded-full flex items-center justify-center">
                        <span className="text-3xl font-bold text-indigo-300">
                          {userData?.name[0]?.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {editMode ? (
                  <form onSubmit={handleProfileUpdate} className="flex-1 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone_number}
                          onChange={e => setFormData({ ...formData, phone_number: e.target.value })}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                        />
                      </div>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row gap-2">
                      <button
                        type="submit"
                        className="bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-indigo-100"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditMode(false)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex-1 w-full">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">{userData?.name}</h2>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <span className="font-semibold w-28 text-indigo-600">Email:</span>
                        <span className="flex-1">{userData?.email}</span>
                        {userData?.email_verified ? (
                          <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded-full ml-2">
                            Verified
                          </span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-700 text-sm px-2 py-1 rounded-full ml-2">
                            Unverified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold w-28 text-indigo-600">Phone:</span>
                        <span className="flex-1">
                          {userData?.phone_number ? `+${userData.phone_number}` : 'Not provided'}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold w-28 text-indigo-600">Member Since:</span>
                        <span className="flex-1">
                          {userData?.created_at ? formatDate(userData.created_at) : 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold w-28 text-indigo-600">Last Updated:</span>
                        <span className="flex-1">
                          {userData?.updated_at ? formatDate(userData.updated_at) : 'N/A'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setFormData({
                          name: userData?.name || '',
                          email: userData?.email || '',
                          phone_number: userData?.phone_number?.toString() || '',
                          current_password: '',
                          new_password: ''
                        });
                        setEditMode(true);
                      }}
                      className="mt-6 bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-indigo-100"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </TabPanel>

          {/* Security Tab */}
          <TabPanel>
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
              <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-indigo-800">Two-Factor Authentication</h3>
                    <p className="text-sm text-indigo-600">
                      {userData?.two_fa_status 
                        ? '🛡️ Your account has enhanced security'
                        : '🔓 Add an extra layer of protection'}
                    </p>
                  </div>
                  <button
                    onClick={() => setShow2FAModal(true)}
                    className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
                      userData?.two_fa_status 
                        ? 'bg-rose-100 text-rose-800 hover:bg-rose-200' 
                        : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                    }`}
                  >
                    {userData?.two_fa_status ? 'Disable 2FA' : 'Enable 2FA'}
                  </button>
                </div>
              </div>

              <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-indigo-800">Password</h3>
                    <p className="text-sm text-indigo-600">
                      Last changed: {userData?.updated_at ? formatDate(userData.updated_at) : 'N/A'}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 px-6 py-2 rounded-xl text-sm font-medium transition-all"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </TabPanel>

          {/* Addresses Tab */}
          <TabPanel>
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                <h3 className="text-2xl font-semibold text-gray-800">📍 Saved Addresses</h3>
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-indigo-100"
                >
                  + Add New Address
                </button>
              </div>
              
              {addresses.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {addresses.map(address => (
                    <div key={address.id} className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-3">
                            <span className={`inline-block w-6 h-6 rounded-full mr-2 
                              ${address.type === 'Home' ? 'bg-pink-500' : 
                                address.type === 'Work' ? 'bg-blue-500' : 'bg-purple-500'}`}
                            />
                            <span className="font-semibold text-gray-800">
                              {address.custom_type_name || address.type}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-1">
                            {address.house_building}, {address.locality_street}
                          </p>
                          <p className="text-gray-600">
                            {address.city}, {address.state} {address.pin}, {address.country}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {address.is_default && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                          <div className="flex gap-2">
                            <button 
                              className="text-blue-600 hover:text-blue-800 text-sm"
                              onClick={() => handleSetDefaultAddress(address)}
                            >
                              Set Default
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800 text-sm"
                              onClick={() => handleDeleteAddress(address)}
                            >
                              Delete
                            </button>

                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <p>No addresses loaded.</p>
                  <button
                    onClick={fetchAddresses}
                    className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Load Addresses
                  </button>
                </div>
              )}
            </div>
          </TabPanel>
        </Tabs>

        {/* Modals */}
        <Modal
          isOpen={show2FAModal}
          onRequestClose={() => setShow2FAModal(false)}
          className="bg-white rounded-xl p-6 max-w-md mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm"
        >
          <h3 className="text-xl font-semibold mb-4">Confirm Password</h3>
          <input
            type="password"
            placeholder="Enter your current password"
            value={formData.current_password}
            onChange={e => setFormData({ ...formData, current_password: e.target.value })}
            className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShow2FAModal(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handle2FAToggle}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Confirm
            </button>
          </div>
        </Modal>

        <Modal
          isOpen={showAddressModal}
          onRequestClose={() => setShowAddressModal(false)}
          className="bg-white rounded-xl p-6 max-w-md mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm"
        >
          <h3 className="text-xl font-semibold mb-4">New Address</h3>
          <form onSubmit={handleAddressSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">House / Building</label>
              <input
                value={addressForm.house_building}
                onChange={e => setAddressForm({ ...addressForm, house_building: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Locality / Street</label>
              <input
                value={addressForm.locality_street}
                onChange={e => setAddressForm({ ...addressForm, locality_street: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  value={addressForm.city}
                  onChange={e => setAddressForm({ ...addressForm, city: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  value={addressForm.state}
                  onChange={e => setAddressForm({ ...addressForm, state: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                <input
                  value={addressForm.pin}
                  onChange={e => setAddressForm({ ...addressForm, pin: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  value={addressForm.country}
                  onChange={e => setAddressForm({ ...addressForm, country: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Post Office / Police Station</label>
                <input
                  value={addressForm.po_ps}
                  onChange={e => setAddressForm({ ...addressForm, po_ps: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                <input
                  value={addressForm.district}
                  onChange={e => setAddressForm({ ...addressForm, district: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
              <select
                value={addressForm.type}
                onChange={e => setAddressForm({ 
                  ...addressForm, 
                  type: e.target.value as 'Home' | 'Work' | 'Other' 
                })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {addressForm.type === 'Other' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Custom Name</label>
                <input
                  value={addressForm.custom_type_name}
                  onChange={e => setAddressForm({ ...addressForm, custom_type_name: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Landmark (Optional)</label>
              <input
                value={addressForm.landmark}
                onChange={e => setAddressForm({ ...addressForm, landmark: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setShowAddressModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save Address
              </button>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={showPasswordModal}
          onRequestClose={() => setShowPasswordModal(false)}
          className="bg-white rounded-xl p-6 max-w-md mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm"
        >
          <h3 className="text-xl font-semibold mb-4">Change Password</h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                value={formData.new_password}
                onChange={e => setFormData({ ...formData, new_password: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Change Password
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
