import React from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useState, useCallback, useEffect } from 'react';


// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];


const AvailableMeals = () => {

    // fetch data from backend
    const [meals, setMeals] = useState([]); // handle movies 
    const [isLoading, setIsLoading] = useState(false); // handle loading state
    const [error, setError] = useState(null); // handle http status - error

    const fetchMealsHandler = useCallback (async () => {

      setIsLoading(true);
      setError(null);  

      try {
        const response = await fetch('https://react-http-ab96c-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');
        
        if (!response.ok) {
          throw new Error('Something went wrong!');}

      const data = await response.json();
      console.log(data);

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({ 
          id: key,
          description: data[key].description,
          name: data[key].name,
          price: data[key].price
      });
      }

      setMeals(loadedMeals);

    
      } catch(error) {
          setIsLoading(false);
          setError(error.message);

      }

      setIsLoading(false);

    }, [])

    useEffect(() => {
      fetchMealsHandler();
    }, [fetchMealsHandler]);


    if (isLoading) {
      return <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    }

    if (error) {
      return <section className={classes.MealsError}>
      <p>{error}</p>
    </section>
    }
  




  

    // const mealsList = DUMMY_MEALS.map(meal => <li>{meal.name}</li>); - not using component

    const mealsList = meals.map(meal => <MealItem id={meal.id}  key={meal.id} name={meal.name} description={meal.description} price={meal.price}/>);

    return <section className={classes.meals}>
        <Card>
        <ul>{mealsList}</ul>
        </Card>
    </section>



};

export default AvailableMeals;