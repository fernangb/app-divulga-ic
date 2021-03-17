export default function getFormattedCurrency(valor: number): string {
  const valorFormatado = valor * 100;

  let tmp = `${valorFormatado}`;
  tmp = tmp.replace(/([0-9]{2})$/g, ',$1');
  if (tmp.length > 6) tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');

  const dinheiro = 'R$ ';

  return dinheiro.concat(tmp);
}
