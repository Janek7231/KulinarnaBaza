import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { modifyRecipe as modifyRecipeApi } from "../services/apiRecipes";

export function useModifyRecipe() {
  const queryClient = useQueryClient();
  const { mutate: modifyRecipe, isSuccess } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: modifyRecipeApi as MutationFunction<
      unknown,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { obj: any; recipeId: string }
    >,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      window.location.href = "/recipes";
      toast.success("Przepis został zmodyfkowany");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Coś poszło nie tak :(");
    },
  });

  return { modifyRecipe, isSuccess };
}
