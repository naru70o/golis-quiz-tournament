import { useAppDispatch, useAppSelector } from "./hooks";

const useStoreState = ()=>{
      const questions = useAppSelector((state) => state.tournament.questions);
      const status = useAppSelector((state) => state.tournament.status);
      const points = useAppSelector((state) => state.tournament.points);
      const highscore = useAppSelector((state) => state.tournament.highscore);
      const index = useAppSelector((state) => state.tournament.index);
      const answer = useAppSelector((state) => state.tournament.answer);
      const dispatch = useAppDispatch();

      return {
          questions,
          status,
          points,
          highscore,
          index,
          answer,
          dispatch
      };
}

export default useStoreState;