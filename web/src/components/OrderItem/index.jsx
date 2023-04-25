import React from 'react';
import styles from './OrderItem.module.css';

export default function OrderItem({ id, date, amount, quantity}) {

  const formatId = id.split('-')

  const newDate = new Date(date)

  const day = newDate.getDate()
  const month = newDate.getUTCMonth() + 1
  const year = newDate.getFullYear()


  return (
    <div className={styles.wrapper}>
      <span className={styles.id}>ID: #{formatId[0]}</span>
      <div className={styles.body}>
        <span className={styles.amount}>Total: <strong>R$ {amount}</strong></span>
        <span className={styles.amount}>Quantidade de Produtos: <strong>{quantity}</strong></span>
        <span>Finalizado em: <strong>{`${day}/${month}/${year}`}</strong></span>
      </div>
    </div>
  )
}
