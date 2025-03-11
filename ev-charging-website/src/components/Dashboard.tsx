import React, { useEffect, useState } from 'react';
import { 
  getUserProfile, 
  logout, 
  updateUserProfile, 
  resetPassword,
  createAddress,
  getAddresses,
  deleteAddress,
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

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  address_type: 'Home' | 'Work' | 'Other';
  custom_name?: string;
  is_default: boolean;
}

interface AddressCreate {
  street: string;
  city: string;
  state: string;
  zip_code: string;
  address_type: 'Home' | 'Work' | 'Other';
  custom_name?: string;
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
  const [addressForm, setAddressForm] = useState<AddressCreate>({
    street: '',
    city: '',
    state: '',
    zip_code: '',
    address_type: 'Home',
    custom_name: ''
  });

  // Load user profile on initial load.
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        console.log('Profile response:', profile);
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

  // Helper function to fetch addresses only when needed.
  const fetchAddresses = async () => {
    try {
      const addressesResponse = await getAddresses();
      console.log('Addresses response:', addressesResponse);
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
      // Update local addresses state (alternatively, you could call fetchAddresses() here)
      setAddresses([...addresses, response.data]);
      setShowAddressModal(false);
      toast.success('Address added successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to add address');
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await deleteAddress(addressId);
      // Update the local addresses state by filtering out the deleted address.
      setAddresses(addresses.filter(addr => addr.id !== addressId));
      toast.success('Address deleted successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to delete address');
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-40 sm:p-60">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors w-full sm:w-auto"
          >
            Logout
          </button>
        </div>

        <Tabs selectedIndex={activeTab} onSelect={(index: number) => setActiveTab(index)}>
          <TabList className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-8 border-b border-gray-200">
            <Tab className="px-4 py-2 cursor-pointer text-gray-600 hover:text-blue-600 
              aria-selected:border-b-2 aria-selected:border-blue-600 aria-selected:text-blue-600 text-center">
              Profile
            </Tab>
            <Tab className="px-4 py-2 cursor-pointer text-gray-600 hover:text-blue-600 
              aria-selected:border-b-2 aria-selected:border-blue-600 aria-selected:text-blue-600 text-center">
              Security
            </Tab>
            <Tab className="px-4 py-2 cursor-pointer text-gray-600 hover:text-blue-600 
              aria-selected:border-b-2 aria-selected:border-blue-600 aria-selected:text-blue-600 text-center">
              Addresses ({addresses.length})
            </Tab>
          </TabList>

          <TabPanel>
            {/* Profile Tab */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
                <div className="relative shrink-0">
                  <img 
                    src={userData?.profile_picture || '/default-avatar.png'} 
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-100"
                    alt="Profile"
                  />
                  {!userData?.profile_picture && (
                    <div className="absolute inset-0 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xl sm:text-2xl font-bold text-gray-400">
                        {userData?.name[0]?.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {editMode ? (
                  <form onSubmit={handleProfileUpdate} className="flex-1 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone_number}
                          onChange={e => setFormData({ ...formData, phone_number: e.target.value })}
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row gap-2">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditMode(false)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex-1 w-full">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4">{userData?.name}</h2>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="font-semibold w-28">Email:</span>
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
                        <span className="font-semibold w-28">Phone:</span>
                        <span className="flex-1">
                          {userData?.phone_number ? `+${userData.phone_number}` : 'Not provided'}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold w-28">Member Since:</span>
                        <span className="flex-1">
                          {userData?.created_at ? formatDate(userData.created_at) : 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold w-28">Last Updated:</span>
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
                      className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            {/* Security Tab */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-medium text-lg mb-1">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600">
                        {userData?.two_fa_status 
                          ? 'Extra security layer is currently active'
                          : 'Add an extra layer of security to your account'}
                      </p>
                    </div>
                    <button
                      onClick={() => setShow2FAModal(true)}
                      className={`px-4 py-2 rounded-lg text-sm ${
                        userData?.two_fa_status 
                          ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {userData?.two_fa_status ? 'Disable 2FA' : 'Enable 2FA'}
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-medium text-lg mb-1">Password</h3>
                      <p className="text-sm text-gray-600">
                        Last changed: {userData?.updated_at ? formatDate(userData.updated_at) : 'N/A'}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowPasswordModal(true)}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            {/* Addresses Tab */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <h3 className="text-xl font-semibold">Saved Addresses</h3>
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
                >
                  Add New Address
                </button>
              </div>
              
              {/* Instead of auto-loading addresses, check if addresses exist.
                  If not, display a button to load addresses manually. */}
              {addresses.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {addresses.map(address => (
                    <div key={address.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="font-semibold capitalize mr-2">
                              {address.address_type}
                            </span>
                            {address.custom_name && (
                              <span className="text-gray-500 text-sm">({address.custom_name})</span>
                            )}
                          </div>
                          <p className="text-gray-600">{address.street}</p>
                          <p className="text-gray-600">
                            {address.city}, {address.state} {address.zip_code}
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
                            >
                              Set Default
                            </button>
                            <button 
                              className="text-red-600 hover:text-red-800 text-sm"
                              onClick={() => handleDeleteAddress(address.id)}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
              <input
                value={addressForm.street}
                onChange={e => setAddressForm({ ...addressForm, street: e.target.value })}
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
              <input
                value={addressForm.zip_code}
                onChange={e => setAddressForm({ ...addressForm, zip_code: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
              <select
                value={addressForm.address_type}
                onChange={e => setAddressForm({ 
                  ...addressForm, 
                  address_type: e.target.value as 'Home' | 'Work' | 'Other' 
                })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {addressForm.address_type === 'Other' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Custom Name</label>
                <input
                  value={addressForm.custom_name}
                  onChange={e => setAddressForm({ ...addressForm, custom_name: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
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
