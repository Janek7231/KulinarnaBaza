import { FaRegUser, FaRegCommentDots } from "react-icons/fa";
import React, { useState, useEffect } from "react";

//skopiowane cos z GPT kto wie co to

interface Recipe {
  id: number;
  imageSrc: string;
  title: string;
  author: string;
  date: string;
  views: number;
}

const Ranking = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchedRecipes: Recipe[] = [
      {
        id: 1,
        imageSrc: "url_do_obrazka",
        title: "Przepis 1",
        author: "Autor 1",
        date: "2024-05-23",
        views: 1000,
      },
      // Dodaj kolejne przepisy
    ];

    // Posortuj przepisy według liczby wyświetleń
    const sortedRecipes = fetchedRecipes.sort((a, b) => b.views - a.views);
    // Wybierz 10 przepisów z największą liczbą wyświetleń
    const topRecipes = sortedRecipes.slice(0, 10);
    setRecipes(topRecipes);
  }, []);

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <img src={recipe.imageSrc} alt={recipe.title} />
          <h2>{recipe.title}</h2>
          <p>{recipe.author}</p>
          <p>{recipe.date}</p>
          <div>
            <FaRegUser />
            <span>{recipe.views}</span>
            <FaRegCommentDots />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ranking;
