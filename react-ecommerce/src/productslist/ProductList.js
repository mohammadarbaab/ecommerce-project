import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  incrementAsync,
  selectCount,
} from './counterSlice';
import styles from './Counter.module.css';

export function ProductList() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>

    </div>
  );
}
