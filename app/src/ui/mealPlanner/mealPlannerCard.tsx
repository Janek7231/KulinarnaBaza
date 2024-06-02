import { useGetRecipe } from "../../hooks/useGetRecipe";
import Spinner from "../Spinner";
import RecipeCard from "../recipes/RecipeCard";

interface RecipeComponent {
  userId: string | null;
  meal: any;
  data: string;
}

const MealPlannerCard = ({ userId, meal, data }: RecipeComponent) => {
  const { data: recipeData, isLoading } = useGetRecipe(meal.id_przepisu);
  const formattedDate = new Date(data)
  formattedDate.setDate(formattedDate.getDate() + 1)
  const dateToSend = formattedDate.getFullYear() + "-" + (formattedDate.getMonth() + 1) + "-" + formattedDate.getDate()
  function handleClick() {
    console.log(data)
    fetch(`http://localhost:5000/api/mealplanner/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_przepisu: meal.id_przepisu,
        date: dateToSend,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
  
  if (isLoading) {
    <div className="h-screen w-full flex justify-center items-center">
      <Spinner />
    </div>
  }

  return (
    <div className="border-2 border-[rgb(255,48,0)] rounded-lg">
      <div className="filter hover:saturate-150">
        <RecipeCard
          imageSrc={`http://localhost:5000/api/recipes/image/${recipeData?.przepis[0].id_przepisu}`}
          title={recipeData?.przepis[0].tytul}
          time={recipeData?.przepis[0].czas_przygotowania || 0}
          link={recipeData?.przepis[0].link}
          views={recipeData?.przepis[0].wyswietlenia || 0}
          price={recipeData?.przepis[0].cena || 0}
        />
      </div>
      <div className="px-4 flex flex-row justify-between items-center">
        <p className="text-lg">{data.substring(0, 10)}</p>
        <button onClick={handleClick} key={recipeData?.przepis[0].id_przepisu} className="bg-main my-4 text-bgWhite rounded-full px-5 py-2 hover:bg-mainHover transition-colors duration-300">Usuń</button>
      </div>
    </div>
  );  
};

export default MealPlannerCard;