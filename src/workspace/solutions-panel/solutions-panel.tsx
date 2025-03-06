import { useSolutionStore } from "../../store.ts";

export const SolutionsPanel = () => {
  const solutions = useSolutionStore((state) => state.solutions);
  const selectedSolutionId = useSolutionStore((state) =>
    state.selectedSolutionId
  );
  const selectSolution = useSolutionStore((state) => state.selectSolution);
  const solutionIds = Object.keys(solutions);
  return (
    <div>
      {solutionIds.map((id) => (
        <div key={id} style={{ display: "flex" }}>
          <input
            id={id}
            type="radio"
            name={id}
            value={id}
            checked={selectedSolutionId === id}
            onChange={() => selectSolution(id)}
          />
          <label htmlFor={id}>{solutions?.[id]?.name}</label>
        </div>
      ))}
    </div>
  );
};
