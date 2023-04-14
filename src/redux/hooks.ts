import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState} from './store';

// Use throughout your redux instead of plain `useDispatch` and `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
