import api from '../../../config/axios';

export const studentService = {

    // Ambil daftar siswa
    getStudents: async () => {
        const response = await api.get('/students');
        return response.data?.data || response.data;
    },

    // Ambil data orang tua dari get.student/parent
    getParentProfile: async () => {
        const response = await api.get('/students/parent');
        return response.data?.data || response.data;
    },

};

export default studentService;