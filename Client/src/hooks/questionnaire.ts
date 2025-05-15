import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axios-instance";

export const queryKeys = {
  questionnaires: "questionnaires",
  questionnaireStats: "questionnaireStats",
  questionnaire: "questionnaire",
};

export function useGetQuestionnaire(id: string) {
  return useQuery({
    queryKey: [queryKeys.questionnaire, id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/questionnaire/${id}`);
      return res?.data;
    },
    enabled: !!id,
    retry: 3,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}

export function useGetQuestionnaires() {
  return useQuery({
    queryKey: [queryKeys.questionnaires],
    queryFn: async () => {
      const res = await axiosInstance.get(`/questionnaire`);
      return res?.data;
    },
    retry: 3,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}

export function useGetQuestionnaireStats() {
  return useQuery({
    queryKey: [queryKeys.questionnaireStats],
    queryFn: async () => {
      const res = await axiosInstance.get(`/questionnaire/stats`);
      return res?.data;
    },
    retry: 3,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}

export const usePostQuestionnaire = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return axiosInstance.post(`/questionnaire`, data);
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
      toast({
        variant: "destructive",
        title: "An error occured.",
        description: error.response.data.message,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.questionnaires] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.questionnaireStats] });
    },
  });

  return mutation;
};

export const useUpdateQuestionnaire = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return axiosInstance.patch(`/questionnaire/${data?.id}`, data);
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
      toast({
        variant: "destructive",
        title: "An error occured.",
        description: error.response.data.message,
      });
    },
    onSuccess: async (response, variables) => {
      console.log(response);
      queryClient.invalidateQueries({ queryKey: [queryKeys.questionnaire, variables?.id] });
      toast({
        variant: "success",
        title: "Successful",
        description: response?.data?.message,
      });
    },
  });

  return mutation;
};

export const useDeleteQuestionnaire = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: (data: any) => {
      console.log(data);
      return axiosInstance.delete(`/questionnaire/${data?.id}`);
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
      toast({
        variant: "destructive",
        title: "An error occured.",
        description: error.response.data.message,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.questionnaires] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.questionnaireStats] });

      toast({
        variant: "success",
        title: "Successful",
        description: "Questionnaire as been deleted",
      });
    },
  });

  return mutation;
};
