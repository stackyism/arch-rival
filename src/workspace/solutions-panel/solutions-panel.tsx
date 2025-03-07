import { useSolutionStore } from "../../store.ts";

export const SolutionsPanel = () => {
  const solutions = useSolutionStore((state) => state.solutions);
  const selectedSolutionId = useSolutionStore((state) =>
    state.selectedSolutionId
  );
  const selectSolution = useSolutionStore((state) => state.selectSolution);
  const solutionIds = Object.keys(solutions);
  return (
    <>
      {solutionIds.map((id) => (
        <div key={id}>
          <input
            id={id}
            type="radio"
            name={id}
            value={id}
            checked={selectedSolutionId === id}
            onChange={() => selectSolution(id)}
          />
          <label htmlFor={id}>
            <small>{solutions?.[id]?.name}</small>
          </label>
        </div>
      ))}
    </>
  );
};
