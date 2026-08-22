import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useStudents } from "@/modules/finance/hooks/useStudents";
import { getProfileMenuGroups } from "../data/ProfileMenuData";

export const useProfilePage = () => {
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();

  const [logoutSheet, setLogoutSheet] = useState(false);
  const [childrenSheet, setChildrenSheet] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: "", message: "" });

  const {
    students: children,
    parentData,
    loading: loadingChildren,
    error: errorChildren,
    refetch: refetchChildren,
  } = useStudents();

  // Gabungkan data auth fallback dengan data parent dari API
  const parentProfile = parentData || authUser;

  const triggerModal = (title, message) =>
    setModalConfig({ isOpen: true, title, message });

  const closeModal = () =>
    setModalConfig((prev) => ({ ...prev, isOpen: false }));

  const handleLogout = () => {
    if (logout) logout();
    navigate("/auth/login", { replace: true });
  };

 const menuGroups = useMemo(
    () =>
      getProfileMenuGroups({
        childrenCount: children.length,
        loadingChildren,
        parentPhone: parentProfile?.phone_number || parentProfile?.phone,
        navigate,
        showModal: triggerModal,
        openChildrenSheet: () => setChildrenSheet(true),
      }),
    [children.length, loadingChildren, parentProfile, navigate]
  );

  return {
    parent: parentProfile,
    children,
    loadingChildren,
    errorChildren,
    refetchChildren,
    logoutSheet,
    setLogoutSheet,
    childrenSheet,
    setChildrenSheet,
    modalConfig,
    closeModal,
    handleLogout,
    menuGroups,
  };
};
export default useProfilePage;
