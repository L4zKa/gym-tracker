// === Übungen ===
export interface Uebung {
  id: number;
  name: string;
  beschreibung?: string;
  muskelgruppe?: string;
}

// === Pläne ===
export interface Plan {
  id: number;
  name: string;
  beschreibung?: string;
}

// n:m Zuordnung (Plan <-> Übung)
export interface PlanUebung {
  plan_id: number;
  uebung_id: number;
  saetze?: number; // empfohlene Sätze
  wiederholungen?: number; // empfohlene Wiederholungen
}

// === Trainingstage ===
export interface Trainingstag {
  id: number;
  datum: string; // ISO-String (yyyy-mm-dd)
  plan_id?: number; // optional, weil man auch ohne Plan trainieren kann
}

// === Übungen in Trainingstagen ===
export interface TrainingstagUebung {
  id: number;
  trainingstag_id: number;
  uebung_id: number;
  saetze: number;
  wiederholungen: number;
  gewicht: number;
}
