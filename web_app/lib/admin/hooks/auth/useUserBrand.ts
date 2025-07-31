import { useAppSelector } from '@/store/hooks';

export const useUserBrand = () => {
  const { user } = useAppSelector((state) => state.auth);
  
  const isAdmin = user?.email === 'admin@glamlink.net';
  const hasBrand = !!user?.brandId;
  const canCreateBrand = !isAdmin && !hasBrand && !!user?.uid;
  
  return {
    user,
    brandId: user?.brandId,
    isAdmin,
    hasBrand,
    canCreateBrand,
  };
};