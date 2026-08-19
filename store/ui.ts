import { create } from "zustand";

interface UiState {
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  closeAll: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isCartOpen: false,
  isSearchOpen: false,
  isMobileMenuOpen: false,
  openCart: () => set({ isCartOpen: true, isSearchOpen: false, isMobileMenuOpen: false }),
  closeCart: () => set({ isCartOpen: false }),
  openSearch: () => set({ isSearchOpen: true, isCartOpen: false, isMobileMenuOpen: false }),
  closeSearch: () => set({ isSearchOpen: false }),
  openMobileMenu: () => set({ isMobileMenuOpen: true, isCartOpen: false, isSearchOpen: false }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  closeAll: () => set({ isCartOpen: false, isSearchOpen: false, isMobileMenuOpen: false }),
}));