//kode loading

import { useState, useEffect } from 'react';
import axios from 'axios';

export const useSppDashboardData = () => {
    // Cek apakah di localStorage sudah ada data sebelumnya 
    const cachedStudents = localStorage.getItem('cache_students');
    const cachedInvoices = localStorage.getItem('cache_invoices');

    const [students, setStudents] = useState(cachedStudents ? JSON.parse(cachedStudents) : []);
    const [invoicesByStudent, setInvoicesByStudent] = useState(cachedInvoices ? JSON.parse(cachedInvoices) : {});

    // Hanya tampilkan loading jika belum ada data sama sekali di cache
    const [loading, setLoading] = useState(!cachedStudents);
    const [error, setError] = useState(null);

    const fetchData = async (isBackground = false) => {
        try {
            if (!isBackground && students.length === 0) setLoading(true);

            // panggil API Laravel Sesuaikan endpoint Anda
            const [resStudents, resInvoices] = await Promise.all([
                axios.get('/api/students'),
                axios.get('/api/invoices')
            ]);

            const studentData = resStudents.data.data || resStudents.data;
            const invoiceData = resInvoices.data.data || resInvoices.data;

            setStudents(studentData);
            setInvoicesByStudent(invoiceData);

            // Simpan ke cache lokal
            localStorage.setItem('cache_students', JSON.stringify(studentData));
            localStorage.setItem('cache_invoices', JSON.stringify(invoiceData));
        } catch (err) {
            console.error('Gagal memuat data API:', err);
            if (students.length === 0) {
                setError('Gagal memuat data dari server.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchData(true);
    }, []);

    return { students, invoicesByStudent, loading, error, refetch: () => fetchData(false) };
};