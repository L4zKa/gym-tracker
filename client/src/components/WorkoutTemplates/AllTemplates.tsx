import { useEffect, useState } from "react";
import type ITemplateDay from "../../models/ITemplateDay";
import type TemplateDayDTO from "../../dtos/TemplateDayDTO";
import TemplateList from "./TemplateList";

export default function AllTemplates() {
  const [allPlans, setAllPlans] = useState<ITemplateDay[]>();

  const mapJSON = (apiObj: TemplateDayDTO[]): ITemplateDay[] => {
    return apiObj.map((item) => ({
      id: item.id,
      name: item.name,
      createdAt: new Date(item.created_at),
    }));
  };

  const getPlans = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/templates", {
        method: "GET",
      });

      if (!res.ok) {
        const error = await res.json();
        alert("Fehler: " + error.error);
        return;
      }

      const data = await res.json();
      const tempPlans = mapJSON(data);
      console.log(tempPlans);
      setAllPlans(tempPlans); // hier kommen deine Templates rein
    } catch (err) {
      console.error(err);
      alert("Request fehlgeschlagen");
    }
  };
  useEffect(() => {
    getPlans();
  }, []);
  return <>{allPlans != undefined && <TemplateList templates={allPlans} />}</>;
}
