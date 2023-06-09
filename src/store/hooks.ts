import {
  TypedUseSelectorHook,
  useSelector,
  useDispatch,
  shallowEqual
} from 'react-redux'
import { IRootState, DispatchType } from './index'

// 动态推导 IRootState 的类型
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
export const useAppDispatch: () => DispatchType = useDispatch
export const shallowAppEqual = shallowEqual
