import { useState } from "react";
import type { Recipe } from "../types/recipies";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

type RecipeModalProps = {
  recipe: Recipe | null;
  onClose: () => void;
};

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full overflow-hidden"
        style={{
          maxWidth: "520px",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 pb-4"
          style={{ borderBottom: "1px solid #f0f0f0", flexShrink: 0 }}
        >
          {title && (
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#1a1a1a",
                margin: 0,
              }}
            >
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            style={{
              background: "#f5f5f5",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              cursor: "pointer",
              fontSize: "16px",
              color: "#666",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Scrollable content */}
        <div style={{ overflowY: "auto", padding: "20px 24px 24px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  const [activeTab, setActiveTab] = useState<"ingredients" | "steps">(
    "ingredients",
  );

  const totalTime = (recipe?.prepTimeMin ?? 0) + (recipe?.cookTimeMin ?? 0);

  return (
    <Modal isOpen={!!recipe} onClose={onClose} title={recipe?.title}>
      {/* Stats row */}
      <div className="flex gap-2 mb-5">
        {[
          { label: "Servings", value: recipe?.servings, icon: "🍽️" },
          recipe?.prepTimeMin
            ? { label: "Prep", value: `${recipe.prepTimeMin}m`, icon: "⏱️" }
            : null,
          recipe?.cookTimeMin
            ? { label: "Cook", value: `${recipe.cookTimeMin}m`, icon: "🔥" }
            : null,
          totalTime > 0
            ? { label: "Total", value: `${totalTime}m`, icon: "⏰" }
            : null,
        ]
          .filter(Boolean)
          .map((stat) => (
            <div
              key={stat!.label}
              style={{
                textAlign: "center",
                background: "#1a1a1a",
                borderRadius: "12px",
                padding: "12px 8px",
                flex: 1,
              }}
            >
              <div style={{ fontSize: "18px", marginBottom: "4px" }}>
                {stat!.icon}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#ffffff",
                }}
              >
                {stat!.value}
              </div>
              <div
                style={{
                  color: "#999",
                  fontSize: "10px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginTop: "2px",
                }}
              >
                {stat!.label}
              </div>
            </div>
          ))}
      </div>

      {/* Description */}
      {recipe?.description && (
        <p
          style={{
            color: "#666",
            fontSize: "14px",
            marginBottom: "20px",
            lineHeight: 1.6,
            borderLeft: "3px solid #a0855a",
            paddingLeft: "12px",
          }}
        >
          {recipe.description}
        </p>
      )}

      {/* Tabs */}
      <div className="flex gap-2" style={{ marginBottom: "16px" }}>
        {(["ingredients", "steps"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: "10px",
              border:
                activeTab === tab ? "2px solid #1a1a1a" : "2px solid #e0e0e0",
              borderRadius: "10px",
              background: activeTab === tab ? "#1a1a1a" : "transparent",
              cursor: "pointer",
              fontSize: "12px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: activeTab === tab ? "#fff" : "#aaa",
              fontWeight: "600",
              transition: "all 0.2s",
            }}
          >
            {tab} (
            {tab === "ingredients"
              ? (recipe?.ingredients.length ?? 0)
              : (recipe?.steps.length ?? 0)}
            )
          </button>
        ))}
      </div>

      {/* Ingredients */}
      {activeTab === "ingredients" && (
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {recipe?.ingredients.map((ing) => (
            <li
              key={ing.id}
              className="flex justify-between items-center"
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #f0f0f0",
                fontSize: "14px",
              }}
            >
              <span style={{ color: "#1a1a1a" }}>{ing.name}</span>
              <span
                style={{
                  color: "#a0855a",
                  fontWeight: "700",
                  background: "#fdf6ee",
                  padding: "2px 10px",
                  borderRadius: "20px",
                  fontSize: "13px",
                }}
              >
                {ing.amount}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Steps */}
      {activeTab === "steps" && (
        <ol
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {recipe?.steps
            .sort((a, b) => a.order - b.order)
            .map((step) => (
              <li
                key={step.id}
                className="flex gap-3"
                style={{
                  background: "#fafafa",
                  borderRadius: "12px",
                  padding: "14px",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "#a0855a",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "700",
                    flexShrink: 0,
                  }}
                >
                  {step.order}
                </div>
                <div>
                  <p
                    style={{
                      margin: "0 0 4px",
                      fontWeight: "600",
                      fontSize: "14px",
                      color: "#1a1a1a",
                    }}
                  >
                    {step.title}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "13px",
                      color: "#666",
                      lineHeight: 1.6,
                    }}
                  >
                    {step.instructions}
                  </p>
                </div>
              </li>
            ))}
        </ol>
      )}
    </Modal>
  );
}
