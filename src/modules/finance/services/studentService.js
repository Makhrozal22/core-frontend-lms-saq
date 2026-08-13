import api from '../../../config/axios';

export const studentService = {
    getStudents: async () => {
        const response = await api.get('/students');
        return response.data?.data || response.data;
    },
};

export default studentService;