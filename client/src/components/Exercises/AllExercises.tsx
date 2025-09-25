import { useEffect, useState } from "react";
import type { Uebung } from "../../../../types";
import { API_URL } from "../../helpers/API";
import { Field, Label, Image } from "@fluentui/react-components";
import "../../frogtheme.css";
import gymFrog from "../../../pictures/gymFrog.png";

export default function AllExercises() {
  const [allExercises, setAllExercises] = useState<Uebung[]>();

  useEffect(() => {
    getExercises();
  }, []);

  const getExercises = async () => {
    const res = await fetch(`${API_URL}/uebungen`);
    const data: Uebung[] = await res.json();
    console.log("Übungen:", data);
    setAllExercises(data);
  };
  return (
    <div>
      {allExercises &&
        allExercises.map((exercise: Uebung) => {
          return (
            <>
              <Field className="frog-card" label={exercise.name}>
                <Label>{exercise.id}</Label>
                <div>{exercise.muskelgruppe}</div>
                <Image height={100} src={gymFrog} />
                <Label>{exercise.beschreibung}</Label>
              </Field>
            </>
          );
        })}
    </div>
  );
}
