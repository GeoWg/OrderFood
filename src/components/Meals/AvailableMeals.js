
import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import API_KEY from '../../apikey';

const AvailableMeals = () => {

    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
      const fetchMeals = async () => {
        const response = await fetch(API_KEY + '/meals.json');

        if(!response.ok){
          throw new Error('Something went wrong');
        }   

        const responseData = await response.json();

        const loadedMeals = [];
        for(const key in responseData){
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price
          });
        }

        setMeals(loadedMeals)
        setIsLoading(false);
      }

        fetchMeals().catch((err) => {
          setIsLoading(false);
          setHttpError(err.message);
        });

    }, [])

    if(isLoading){
      return <section className={classes.MealsLoading}>
          <p>Loading...</p>
        </section>
    }

    if(httpError){
      return (
        <section className={classes.MealsError}>
          <p>{httpError}</p>
        </section>
      );
    }

    const mealsList = meals.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        price={meal.price}
        description={meal.description}
      />
    ))
    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
}

export default AvailableMeals;
