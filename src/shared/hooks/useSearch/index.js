import { useContext } from 'react';
import {CtxSearch} from '../../contexts/search';

export const useSearch = () => useContext(CtxSearch);
