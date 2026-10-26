import {expect,it} from 'vitest';
import {symbolicOrder,compose,matrixFor,mul,identity,TransformStep} from './transforms';
it('writes mixed world/body factors in the same order as the numerical product',()=>{
  const steps:TransformStep[]=[
    {id:'a',kind:'rotate',axis:'x',value:30,frame:'body'},
    {id:'b',kind:'rotate',axis:'y',value:45,frame:'world'},
    {id:'c',kind:'translate',axis:'z',value:2,frame:'body'},
    {id:'d',kind:'rotate',axis:'z',value:60,frame:'world'}
  ];
  const ordered=symbolicOrder(steps);
  expect(ordered.map(s=>s.id)).toEqual(['d','b','a','c']);
  const product=ordered.reduce((p,s)=>mul(p,matrixFor(s)),identity());
  compose(steps).forEach((row,i)=>row.forEach((v,j)=>expect(product[i][j]).toBeCloseTo(v,10)));
  expect(symbolicOrder([])).toEqual([]);
});
