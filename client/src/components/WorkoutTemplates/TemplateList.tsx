import { motion } from "framer-motion";
import type ITemplateDay from "../../models/ITemplateDay";

interface ITemplateListProps {
  templates: ITemplateDay[];
}

export default function TemplateList(props: ITemplateListProps) {
  return (
    <div
      style={{
        display: "grid",
        gap: "16px",
      }}
    >
      {props.templates.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            padding: "16px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transition: "box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
          }}
        >
          <div>
            <div style={{ fontWeight: 600 }}>{t.name || "Unbenannt"}</div>
            <div style={{ fontSize: "14px", opacity: 0.7 }}>{t.createdAt.toLocaleString()}</div>
          </div>
          <div style={{ fontSize: "12px", opacity: 0.5 }}>#{t.id}</div>
        </motion.div>
      ))}
    </div>
  );
}
