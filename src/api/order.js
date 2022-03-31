import { useMutation, useQuery } from 'react-query';
import axiosInstance from './axiosInstance';

export const useOptions = (optionType) =>
  useQuery(
    ['options', optionType],
    async () => (await axiosInstance.get(`/${optionType}`)).data,
    { initialData: [] }
  );

export const useCreateOrder = () =>
  useMutation(async () => (await axiosInstance.post('/order')).data);
