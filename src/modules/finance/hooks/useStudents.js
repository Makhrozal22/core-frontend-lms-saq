import { useState, useEffect, useCallback } from 'react';
import { studentService } from '../services/studentService';

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [parentData, setParentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [studentsRes, parentRes] = await Promise.all([
        studentService.getStudents(),
        studentService.getParentProfile(),
      ]);
      
      setStudents(Array.isArray(studentsRes) ? studentsRes : []);
      setParentData(parentRes);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        'Gagal memuat data profil. Silakan coba lagi.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    students,
    parentData,
    loading,
    error,
    refetch: fetchData,
  };
};

export default useStudents;