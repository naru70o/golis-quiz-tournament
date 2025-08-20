// Save state to LocalStorage
export const saveState = (state:unknown) => {
  try {
      if(typeof window === "undefined") return;
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.error('Error saving state:', err);
  }
};

// Load state from LocalStorage
export const loadState = () => {
  try {
    if (typeof window === "undefined") return undefined;
    const serializedState = localStorage.getItem('reduxState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error('Error loading state:', err);
    return undefined;
  }
};

export const resetLocalState = ()=>{
  if(typeof window === "undefined") return;
  localStorage.removeItem("reduxState");
}